import userInfoSlice from './userInfoSlice';
import chatInfoSlice from './chatInfoSlice';
import signedInSlice from './signedInSlice';
import avatarDialogSlice from './avatarDialogSlice';
import profilePublicationDialogSlice from './profilePublicationDialogSlice';
import createPublicationDialogSlice from './createPublicationDialogSlice';
import createChatDialogSlice from './createChatDialogSlice';
import selectedUsersSlice from './selectedUsersSlice';
import messagesSlice from './messagesSlice';
import filesBarSlice from './filesBarSlice';

export const slices = {
    userInfo: userInfoSlice,
    chatInfo: chatInfoSlice,
    signedIn: signedInSlice,
    avatarDialog: avatarDialogSlice,
    profilePublicationDialog: profilePublicationDialogSlice,
    createPublicationDialog: createPublicationDialogSlice,
    createChatDialog: createChatDialogSlice,
    selectedUsers: selectedUsersSlice,
    messages: messagesSlice,
    filesBar: filesBarSlice,
}