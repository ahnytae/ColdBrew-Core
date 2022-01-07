import { io, Socket } from "socket.io-client";
import { ChangeDeviceType } from "../index";
import { ColdBrew } from "../service/Core";

export class SignalingController extends ColdBrew {
  //
  private static WS: Socket;
  private static myPeerConnection: RTCPeerConnection;
  private static readonly STUN_URL = {
    iceServers: [
      {
        urls: "stun:relay.webwormhole.io:3478",
      },
    ],
  };

  private constructor() {
    super();
    SignalingController.WS = io("https://coldbrew-backend.herokuapp.com");
    console.log("%c HELLO ColdBrew", "color: hotpink; font-size:40px; background:black");
    console.log("%c [ColdBrew] connected socket", "color: skyblue", SignalingController.WS);
  }

  static async init(): Promise<SignalingController> {
    return new SignalingController();
  }

  static async joinRoom(roomName: string, userName: string) {
    super.RoomName = roomName;
    await this.init();
    SignalingController.WS.emit("join-room", roomName, userName);
    this.connectSocket(roomName);
    this.onLeaveRoom();
  }

  static async onLeaveRoom() {
    SignalingController.WS.on("leave", (status: string) => {
      console.log("leave!!", status);
      status;
    });

    SignalingController.WS.on("leave-user", (status: any) => {
      console.log("user left!!", status);
      status;
    });
  }

  static async leaveRoomHandler(videoEl: HTMLVideoElement) {
    SignalingController.WS.emit("leave-room");
    const stream = ColdBrew.MyStream;
    stream.getVideoTracks().map((track: MediaStreamTrack) => {
      track.stop();
      videoEl.srcObject = null;
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
    // this.makePeerConnection(remoteVideoEl);

    /** socket area **/
    // role: offer
    SignalingController.WS.on("Room-Info", (room: string, user: string) => {
      console.log("%c [ColdBrew] Join Room|User", room, user);
    });

    SignalingController.WS.on("success-join", async (room: string, user: string) => {
      console.log("%c [ColdBrew] success join", "color: #f3602b", `roomname: ${room}, username: ${user}`);

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
}
