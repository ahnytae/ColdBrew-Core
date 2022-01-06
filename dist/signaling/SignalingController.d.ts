import { ChangeDeviceType } from '../index';
import { ColdBrew } from '../service/Core';
export declare class SignalingController extends ColdBrew {
    private static WS;
    private static myPeerConnection;
    private static readonly STUN_URL;
    private constructor();
    static init(): Promise<SignalingController>;
    static joinRoom(roomName: string, userName: string): Promise<void>;
    static onLeaveRoom(): Promise<void>;
    static leaveRoomHandler(videoEl: HTMLVideoElement): Promise<void>;
    static attachRemoteVideo(remoteVideoEl: HTMLVideoElement): void;
    static connectSocket(roomName: string): void;
    static changeCamera(type: ChangeDeviceType): void;
}
