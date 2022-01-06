export declare class ColdBrew {
    protected constructor();
    private static MY_STREAM;
    private static ROOM_NAME;
    static get MyStream(): MediaStream;
    static set MyStream(stream: MediaStream);
    static get RoomName(): string;
    static set RoomName(roomName: string);
}
