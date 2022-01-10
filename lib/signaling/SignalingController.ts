import { io, Socket } from "socket.io-client";
import { ChangeDeviceType } from "../index";
import { ColdBrew } from "../service/Core";
import { RoomInfo } from "./Signaling";

export class SignalingController extends ColdBrew {
  //
  private static WS: Socket;
  private static myPeerConnection: RTCPeerConnection;
  private static readonly STUN_URL = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }, { urls: "stun:global.stun.twilio.com:3478?transport=udp" }],
  };

  private constructor() {
    super();
    SignalingController.WS = io("https://coldbrew-backend.herokuapp.com");
    console.log("%c HELLO ColdBrew", "color: hotpink; font-size:40px; background:black");
    console.log("%c [ColdBrew] connected socket", "color: skyblue", SignalingController.WS);
  }

  private static async init(): Promise<SignalingController> {
    return new SignalingController();
  }

  static async joinRoom(roomName: string, userName: string) {
    super.RoomName = roomName;
    await this.init();
    SignalingController.WS.emit("join-room", roomName, userName);
    this.connectSocket(roomName);
    // this.onLeaveRoom();
  }

  private static onLeaveRoom() {
    console.log("left User");
    const stream = ColdBrew.MyStream;
    stream.getVideoTracks().map((track: MediaStreamTrack) => {
      track.stop();
    });
  }

  // socket event
  static SignalEvent(name: string, callbackFn: any) {
    if (typeof name !== "string" || typeof callbackFn !== "function") {
      console.error("need to type check");
      return;
    }

    SignalingController.WS.emit(name);

    SignalingController.WS.on(name, () => {
      if (name === "leave") {
        this.onLeaveRoom(); // track 멈춰주기
      }
      callbackFn(); // fe에서 실행 될 콜백함수
    });
  }

  // replace addStream to getTracks()
  static attachRemoteVideo(remoteVideoEl: HTMLVideoElement) {
    SignalingController.myPeerConnection = new RTCPeerConnection(SignalingController.STUN_URL);

    SignalingController.myPeerConnection.addEventListener("icecandidate", (ice: RTCPeerConnectionIceEvent) => {
      console.log("%c sent icecandidate", "%color: red", ice);
      const roomName = super.RoomName;
      SignalingController.WS.emit("ice", ice.candidate, roomName);
    });
    SignalingController.myPeerConnection.addEventListener("track", (peerTrack: RTCTrackEvent) => {
      console.log("got remote peer stream", peerTrack.streams[0]);
      remoteVideoEl.srcObject = peerTrack.streams[0];
    });

    const stream = ColdBrew.MyStream;
    stream.getTracks().map((track: MediaStreamTrack) => SignalingController.myPeerConnection.addTrack(track, stream));
  }

  static connectSocket(roomName: string) {
    //

    /** socket area **/
    // role: offer
    SignalingController.WS.on("success-join", async () => {
      console.log("%c [ColdBrew] success join", "color: #f3602b");

      // create offer + sdp
      const offer = await SignalingController.myPeerConnection.createOffer();
      SignalingController.myPeerConnection.setLocalDescription(offer);

      // send offer
      const roomName = ColdBrew.RoomName;
      SignalingController.WS.emit("offer", offer, roomName);
      console.log("%c [ColdBrew] sent offer", "color: #e64607bc", offer);

      SignalingController.WS.on("answer", async (answer: any) => {
        console.log("%c [ColdBrew] received answer", "color: #e64607bc", answer);
        await SignalingController.myPeerConnection.setRemoteDescription(answer);
      });
    });

    // role: answer
    SignalingController.WS.on("offer", async (offer: any) => {
      console.log("%c [ColdBrew] received offer", offer, "color: #05c088");

      await SignalingController.myPeerConnection.setRemoteDescription(offer);
      const answer = await SignalingController.myPeerConnection.createAnswer();
      SignalingController.myPeerConnection.setLocalDescription(answer);
      SignalingController.WS.emit("answer", answer, roomName);
      console.log("%c [ColdBrew] sent answer", "color: #e64607bc", answer);
    });

    SignalingController.WS.on("icecandidate", (ice: any) => {
      console.log("%c [ColdBrew] received icecandidate", "color: #d3d61e", ice);
      SignalingController.myPeerConnection.addIceCandidate(ice);
    });
  }

  // change sync change camera
  static changeCamera(type: ChangeDeviceType) {
    if (SignalingController.myPeerConnection) {
      const stream = super.MyStream;
      if (type === "video") {
        const videoTrack = stream.getVideoTracks()[0];
        const cameraSender = SignalingController.myPeerConnection.getSenders().find((sender) => sender.track?.kind === "video");
        console.log("%c [ColdBrew] changed camera", "color: orangered");
        cameraSender?.replaceTrack(videoTrack);
        return;
      }
      // audio
      const audioTrack = stream.getAudioTracks()[0];
      const audioSender = SignalingController.myPeerConnection.getSenders().find((sender) => sender.track?.kind === "audio");
      console.log("%c [ColdBrew] changed mic", "color: orangered");
      audioSender?.replaceTrack(audioTrack);
      return;
    }
    console.error("Stream not found");
  }

  static getRoomInfo() {
    SignalingController.WS.on("Room-Info", (roomInfo: RoomInfo) => {
      console.log("%c [ColdBrew] get Room Info..", roomInfo);
      return roomInfo;
    });
  }

  static getMeInfo() {
    SignalingController.WS.on("Me-Info", (userName: string) => {
      console.log("%c [ColdBrew] get Me Info..", userName);
      return userName;
    });
  }
}
