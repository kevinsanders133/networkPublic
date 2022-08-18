import React, { memo } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { removeSelectedUser } from '../../redux/slices/selectedUsersSlice';

interface ISelectedUserProps {
    id: string;
    nickname: string;
}

const SelectedUser: React.FC<ISelectedUserProps> = memo(({ id, nickname }) => {

    const dispatch = useAppDispatch();

    const remove = () => {
        dispatch(removeSelectedUser(id));
    }

    return (
        <div className="create-chat-dialog__selected-users-item">
            <div className="create-chat-dialog__selected-users-item-nickname">{nickname}</div>
            <div className="create-chat-dialog__selected-users-item-close" onClick={remove}>
                <svg color="#0095f6" fill="#0095f6" height="12" role="img" viewBox="0 0 24 24" width="12"><polyline fill="none" points="20.643 3.357 12 12 3.353 20.647" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></polyline><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" x1="20.649" x2="3.354" y1="20.649" y2="3.354"></line></svg>
            </div>
        </div>
    );
})

export default SelectedUser;