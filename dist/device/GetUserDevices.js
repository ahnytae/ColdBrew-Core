"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserDevices = void 0;
const Core_1 = require("../service/Core");
class GetUserDevices extends Core_1.ColdBrew {
    static constraints = {
        audio: true,
        video: true,
    };
    get currentVideoTrack() {
        const myStream = Core_1.ColdBrew.MyStream;
        return myStream.getVideoTracks()[0];
    }
    static async getDeviceStream(deviceId) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia(!deviceId ? GetUserDevices.constraints : { audio: true, video: { deviceId: { exact: deviceId } } });
            if (stream) {
                Core_1.ColdBrew.MyStream = stream;
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
        }
        catch (e) {
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
    async getAllDeviceLists() {
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
        }
        catch (e) {
            return {
                isError: true,
                errorData: {
                    name: 'Get List failed',
                },
            };
        }
    }
    // 카메라 / 마이크 장치 리스트 조회
    static async getSelectDeviceList(deviceType) {
        const list = await navigator.mediaDevices.enumerateDevices();
        if (deviceType === 'video') {
            try {
                const cameraList = list.filter(videoList => videoList.kind === 'videoinput');
                return cameraList;
            }
            catch {
                console.error('%c [ColdBrew] failed select get device list', 'color: red');
            }
        }
        // audio
        try {
            const audioList = list.filter(videoList => videoList.kind === 'audioinput');
            return audioList;
        }
        catch {
            console.error('%c [ColdBrew] failed select get device list', 'color: red');
        }
    }
    static async attachLocalVideo(videoEl, stream) {
        try {
            videoEl.srcObject = stream;
        }
        catch {
            console.error('%c [ColdBrew] type check video Element or stream', 'color: red');
        }
    }
    // device on/off
    static changeDeviceStatus(deviceType, status) {
        console.log('status', deviceType, status);
        const myStream = Core_1.ColdBrew.MyStream;
        if (deviceType === 'video') {
            try {
                myStream.getVideoTracks().map((videoTrack) => (videoTrack.enabled = status));
            }
            catch {
                console.error('%c [ColdBrew] failed mute Mic', 'color: red');
            }
            return;
        }
        // mic
        if (deviceType === 'mic') {
            try {
                myStream.getAudioTracks().map((audioTrack) => (audioTrack.enabled = status));
            }
            catch {
                console.error('%c [ColdBrew] failed mute Mic', 'color: red');
            }
        }
    }
}
exports.GetUserDevices = GetUserDevices;
