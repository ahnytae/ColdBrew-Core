import { SignalingController } from "../signaling/SignalingController";

class WBSendMessage extends SignalingController {
  //
  static SendDataMessage<T>(topic: string, data: T) {
    SignalingController.WS.emit(topic, data);
  }
}

export default WBSendMessage;
