import { ColdBrew } from '../service/Core';
import { Constraints, GetMediaError, GetDeviceList, ChangeDeviceType } from './Device';

export class GetUserDevices extends ColdBrew {
  private static readonly constraints: Constraints = {
    audio: true,
    video: true,
  };

  get currentVideoTrack(): MediaStreamTrack {
    const myStream = ColdBrew.MyStream;
    return myStream.getVideoTracks()[0];
  }

  static async getDeviceStream(deviceId?: string): Promise<GetMediaError> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(
        !deviceId ? GetUserDevices.constraints : { audio: true, video: { deviceId: { exact: deviceId } } }
      );
      if (stream) {
        ColdBrew.MyStream = stream;
        return {
          isError: false,
          stream: stream,
        };
      }
      return {
        isError: true,
        errorData: {
          name: 'get media failed',
        },
      };
    } catch (e) {
      if (e instanceof DOMException) {
        return {
          isError: true,
          errorData: {
            name: e.name,
            message: e.message,
          },
        };
      }
      return {
        isError: true,
        errorData: {
          name: 'exception failed',
        },
      };
    }
  }

  // 모든 장치 리스트 조회
  async getAllDeviceLists(): Promise<MediaDeviceInfo[] | GetDeviceList> {
    try {
      const list = await navigator.mediaDevices.enumerateDevices();
      if (list) {
        return {
          isError: false,
          list: list,
        };
      }
      return {
        isError: true,
        errorData: {
          name: 'Get List failed',
        },
      };
    } catch (e) {
      return {
        isError: true,
        errorData: {
          name: 'Get List failed',
        },
      };
    }
  }

  // 카메라 / 마이크 장치 리스트 조회
  static async getSelectDeviceList(deviceType: ChangeDeviceType): Promise<MediaDeviceInfo[] | undefined> {
    const list = await navigator.mediaDevices.enumerateDevices();

    if (deviceType === 'video') {
      try {
        const cameraList = list.filter(videoList => videoList.kind === 'videoinput');
        return cameraList;
      } catch {
        console.error('%c [ColdBrew] failed select get device list', 'color: red');
      }
    }
    // audio
    try {
      const audioList = list.filter(videoList => videoList.kind === 'audioinput');
      return audioList;
    } catch {
      console.error('%c [ColdBrew] failed select get device list', 'color: red');
    }
  }

  static async attachLocalVideo(videoEl: HTMLVideoElement, stream: MediaStream) {
    try {
      videoEl.srcObject = stream;
    } catch {
      console.error('%c [ColdBrew] type check video Element or stream', 'color: red');
    }
  }

  // device on/off
  static changeDeviceStatus(deviceType: ChangeDeviceType, status: boolean) {
    console.log('status', deviceType, status);
    const myStream = ColdBrew.MyStream;
    if (deviceType === 'video') {
      try {
        myStream.getVideoTracks().map((videoTrack: MediaStreamTrack) => (videoTrack.enabled = status));
      } catch {
        console.error('%c [ColdBrew] failed mute Mic', 'color: red');
      }
      return;
    }
    // mic
    if (deviceType === 'mic') {
      try {
        myStream.getAudioTracks().map((audioTrack: MediaStreamTrack) => (audioTrack.enabled = status));
      } catch {
        console.error('%c [ColdBrew] failed mute Mic', 'color: red');
      }
    }
  }
}
