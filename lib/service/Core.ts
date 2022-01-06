export class ColdBrew {
  protected constructor() {}

  private static MY_STREAM: MediaStream;
  private static ROOM_NAME: string;

  // static init(): ColdBrew {
  //   return new ColdBrew();
  // }

  static get MyStream(): MediaStream {
    return ColdBrew.MY_STREAM;
  }
  static set MyStream(stream: MediaStream) {
    ColdBrew.MY_STREAM = stream;
  }

  static get RoomName(): string {
    return ColdBrew.ROOM_NAME;
  }
  static set RoomName(roomName: string) {
    ColdBrew.ROOM_NAME = roomName;
  }
}
