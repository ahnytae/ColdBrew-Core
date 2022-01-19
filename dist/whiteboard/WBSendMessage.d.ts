import { SignalingController } from "../signaling/SignalingController";
declare class WBSendMessage extends SignalingController {
    static SendDataMessage<T>(topic: string, data: T): void;
}
export default WBSendMessage;
