import IShortFileInfo from "./IShortFileInfo";

type MessageType = 'text' | 'image' | 'video' | 'file';

export default interface IChatMessageData {
    senderId: string;
    senderName: string;
    type: MessageType;
    data: IShortFileInfo | string;
}