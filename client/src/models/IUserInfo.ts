interface IFriendId {
    [friendId: string]: string;
}

export default interface IUserInfo {
    id: string;
    nickname: string;
    email: string;
    avatar: string;
    friends: IFriendId;
}