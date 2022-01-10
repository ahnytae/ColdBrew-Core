import { ChangeDeviceType } from "../index";
import { ColdBrew } from "../service/Core";
export declare class SignalingController extends ColdBrew {
    private static WS;
    private static myPeerConnection;
    private static readonly STUN_URL;
    private constructor();
    private static init;
    static joinRoom(roomName: string, userName: string): Promise<void>;
    private static onLeaveRoom;
    static SignalEvent(name: string, callbackFn: any): void;
    static attachRemoteVideo(remoteVideoEl: HTMLVideoElement): void;
    static connectSocket(roomName: string): void;
    static changeCamera(type: ChangeDeviceType): void;
    static getRoomInfo(): void;
    static getMeInfo(): void;
}
