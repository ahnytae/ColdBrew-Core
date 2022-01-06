"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColdBrew = void 0;
class ColdBrew {
    constructor() { }
    static MY_STREAM;
    static ROOM_NAME;
    // static init(): ColdBrew {
    //   return new ColdBrew();
    // }
    static get MyStream() {
        return ColdBrew.MY_STREAM;
    }
    static set MyStream(stream) {
        ColdBrew.MY_STREAM = stream;
    }
    static get RoomName() {
        return ColdBrew.ROOM_NAME;
    }
    static set RoomName(roomName) {
        ColdBrew.ROOM_NAME = roomName;
    }
}
exports.ColdBrew = ColdBrew;
