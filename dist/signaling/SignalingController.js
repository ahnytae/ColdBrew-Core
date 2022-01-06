"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignalingController = void 0;
const socket_io_client_1 = require("socket.io-client");
const Core_1 = require("../service/Core");
class SignalingController extends Core_1.ColdBrew {
    //
    static WS;
    static myPeerConnection;
    static STUN_URL = {
        iceServers: [
            {
                urls: [
                    'stun:stun.l.google.com:19302',
                    'stun:stun1.l.google.com:19302',
                    'stun:stun2.l.google.com:19302',
                    'stun:stun3.l.google.com:19302',
                    'stun:stun4.l.google.com:19302',
                ],
            },
        ],
    };
    constructor() {
        super();
        SignalingController.WS = (0, socket_io_client_1.io)('https://coldbrew-backend.herokuapp.com');
        console.log('%c HELLO ColdBrew', 'color: hotpink; font-size:40px; background:black');
        console.log('%c [ColdBrew] connected socket', 'color: skyblue', SignalingController.WS);
    }
    static async init() {
        return new SignalingController();
    }
    static async joinRoom(roomName, userName) {
        super.RoomName = roomName;
        await this.init();
        SignalingController.WS.emit('join-room', roomName, userName);
        this.connectSocket(roomName);
        this.onLeaveRoom();
    }
    static async onLeaveRoom() {
        SignalingController.WS.on('leave', (status) => {
            console.log('leave!!', status);
            status;
        });
        SignalingController.WS.on('leave-user', (status) => {
            console.log('user left!!', status);
            status;
        });
    }
    static async leaveRoomHandler(videoEl) {
        SignalingController.WS.emit('leave-room');
        const stream = Core_1.ColdBrew.MyStream;
        stream.getVideoTracks().map((track) => {
            track.stop();
            videoEl.srcObject = null;
        });
    }
    // replace addStream to getTracks()
    static attachRemoteVideo(remoteVideoEl) {
        SignalingController.myPeerConnection = new RTCPeerConnection(SignalingController.STUN_URL);
        SignalingController.myPeerConnection.addEventListener('icecandidate', (ice) => {
            console.log('%c sent icecandidate', '%color: red', ice);
            const roomName = super.RoomName;
            SignalingController.WS.emit('ice', ice.candidate, roomName);
        });
        SignalingController.myPeerConnection.addEventListener('track', (peerTrack) => {
            console.log('got remote peer stream', peerTrack.streams[0]);
            remoteVideoEl.srcObject = peerTrack.streams[0];
        });
        const stream = Core_1.ColdBrew.MyStream;
        stream.getTracks().map((track) => SignalingController.myPeerConnection.addTrack(track, stream));
    }
    static connectSocket(roomName) {
        // this.makePeerConnection(remoteVideoEl);
        /** socket area **/
        // role: offer
        SignalingController.WS.on('Room-Info', (room, user) => {
            console.log('%c [ColdBrew] Join Room|User', room, user);
        });
        SignalingController.WS.on('success-join', async (room, user) => {
            console.log('%c [ColdBrew] success join', 'color: #f3602b', `roomname: ${room}, username: ${user}`);
            // create offer + sdp
            const offer = await SignalingController.myPeerConnection.createOffer();
            SignalingController.myPeerConnection.setLocalDescription(offer);
            // send offer
            const roomName = Core_1.ColdBrew.RoomName;
            SignalingController.WS.emit('offer', offer, roomName);
            console.log('%c [ColdBrew] sent offer', 'color: #e64607bc', offer);
            SignalingController.WS.on('answer', async (answer) => {
                console.log('%c [ColdBrew] received answer', 'color: #e64607bc', answer);
                await SignalingController.myPeerConnection.setRemoteDescription(answer);
            });
        });
        // role: answer
        SignalingController.WS.on('offer', async (offer) => {
            console.log('%c [ColdBrew] received offer', offer, 'color: #05c088');
            await SignalingController.myPeerConnection.setRemoteDescription(offer);
            const answer = await SignalingController.myPeerConnection.createAnswer();
            SignalingController.myPeerConnection.setLocalDescription(answer);
            SignalingController.WS.emit('answer', answer, roomName);
            console.log('%c [ColdBrew] sent answer', 'color: #e64607bc', answer);
        });
        SignalingController.WS.on('icecandidate', (ice) => {
            console.log('%c [ColdBrew] received icecandidate', 'color: #d3d61e', ice);
            SignalingController.myPeerConnection.addIceCandidate(ice);
        });
    }
    // change sync change camera
    static changeCamera(type) {
        if (SignalingController.myPeerConnection) {
            const stream = super.MyStream;
            if (type === 'video') {
                const videoTrack = stream.getVideoTracks()[0];
                const cameraSender = SignalingController.myPeerConnection.getSenders().find(sender => sender.track?.kind === 'video');
                console.log('%c [ColdBrew] changed camera', 'color: orangered');
                cameraSender?.replaceTrack(videoTrack);
                return;
            }
            // audio
            const audioTrack = stream.getAudioTracks()[0];
            const audioSender = SignalingController.myPeerConnection.getSenders().find(sender => sender.track?.kind === 'audio');
            console.log('%c [ColdBrew] changed mic', 'color: orangered');
            audioSender?.replaceTrack(audioTrack);
            return;
        }
        console.error('Stream not found');
    }
}
exports.SignalingController = SignalingController;
