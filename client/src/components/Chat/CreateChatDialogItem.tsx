import React from 'react';
import IUserInfo from '../../models/IUserInfo';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setSelectedUsers } from '../../redux/slices/selectedUsersSlice';

interface CreateChatDialogItemProps {
    user: IUserInfo;
}

const CreateChatDialogItem: React.FC<CreateChatDialogItemProps> = ({ user }) => {
    const dispatch = useAppDispatch();
    const selectedUsers = useAppSelector(state => state.selectedUsers.value);

    const toggleSelect = () => {
        const temp = JSON.parse(JSON.stringify(selectedUsers));
        if (temp.hasOwnProperty(user.id)) {
            delete temp[user.id];
        } else {
            temp[user.id] = user.nickname;
        }
        dispatch(setSelectedUsers(temp));
    }

    return (
        <div className="create-chat-dialog__item">
            <div
                className="create-chat-dialog__avatar"
                style={{
                    backgroundImage: `url(http://localhost:5001${user.avatar})`
                }}
            ></div>
            <div className="create-chat-dialog__nickname">
                {user.nickname}
            </div>
            <div
                className="create-chat-dialog__select"
                onClick={toggleSelect}
                style={{
                    background: selectedUsers[user.id] ? "#03d7fc" : "#fff"
                }}
            ></div>
        </div>
    );
};

export default CreateChatDialogItem;