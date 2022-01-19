"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SignalingController_1 = require("../signaling/SignalingController");
class WBSendMessage extends SignalingController_1.SignalingController {
    //
    static SendDataMessage(topic, data) {
        SignalingController_1.SignalingController.WS.emit(topic, data);
    }
}
exports.default = WBSendMessage;
