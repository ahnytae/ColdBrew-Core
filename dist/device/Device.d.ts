declare type NormalConstraints = {
    video: boolean;
    audio: boolean;
};
declare type SelectDeviceIdConstraints = {
    video: {
        deviceId: {
            exact: string;
        };
    };
    audio: boolean;
};
declare type Constraints = NormalConstraints | SelectDeviceIdConstraints;
declare type ChangeDeviceType = 'video' | 'mic';
declare type GetMediaError = {
    isError: boolean;
    errorData?: {
        name: string;
        message?: string;
    };
    stream?: MediaStream;
};
declare type GetDeviceList = {
    isError: boolean;
    errorData?: {
        name: string;
        message?: string;
    };
    list?: MediaDeviceInfo[];
};
export { Constraints, ChangeDeviceType, GetMediaError, GetDeviceList };
