import { ColdBrew } from '../service/Core';
import { GetMediaError, GetDeviceList, ChangeDeviceType } from './Device';
export declare class GetUserDevices extends ColdBrew {
    private static readonly constraints;
    get currentVideoTrack(): MediaStreamTrack;
    static getDeviceStream(deviceId?: string): Promise<GetMediaError>;
    getAllDeviceLists(): Promise<MediaDeviceInfo[] | GetDeviceList>;
    static getSelectDeviceList(deviceType: ChangeDeviceType): Promise<MediaDeviceInfo[] | undefined>;
    static attachLocalVideo(videoEl: HTMLVideoElement, stream: MediaStream): Promise<void>;
    static changeDeviceStatus(deviceType: ChangeDeviceType, status: boolean): void;
}
