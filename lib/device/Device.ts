type NormalConstraints = {
  video: boolean;
  audio: boolean;
};

type SelectDeviceIdConstraints = {
  video: { deviceId: { exact: string } };
  audio: boolean;
};
type Constraints = NormalConstraints | SelectDeviceIdConstraints;

type ChangeDeviceType = 'video' | 'mic';

type GetMediaError = {
  isError: boolean;
  errorData?: {
    name: string;
    message?: string;
  };
  stream?: MediaStream;
};

type GetDeviceList = {
  isError: boolean;
  errorData?: {
    name: string;
    message?: string;
  };
  list?: MediaDeviceInfo[];
};

export { Constraints, ChangeDeviceType, GetMediaError, GetDeviceList };
