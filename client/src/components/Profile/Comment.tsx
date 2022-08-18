import React from 'react';
import { userAPI } from '../../services/UserService';
import IComment from '../../models/IComment';

interface CommentProps {
    payload: IComment;
}

const Comment: React.FC<CommentProps> = ({ payload }) => {

    const { data: user } = userAPI.useFetchUserByIdQuery({userId: payload.user_id});

    return (
        <div className="profile-publication-dialog__management-panel-comment">
            <div
            className="profile-publication-dialog__management-panel-comment-avatar"
            style={{backgroundImage: `url(http://localhost:5001/users/${user?.avatar})`}}
            ></div>
            <div className="profile-publication-dialog__management-panel-comment-main">
                <div className="profile-publication-dialog__management-panel-comment-top">
                    <b>{user?.nickname}</b>
                </div>
                <div className="profile-publication-dialog__management-panel-comment-bottom">
                    {payload.message}
                </div>
            </div>
        </div>
    );
};

export default Comment;