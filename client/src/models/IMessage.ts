import IShortFileInfo from "./IShortFileInfo";

export default interface IMessage {
    user_id: string;
    data: string | IShortFileInfo;
    type: string;
}