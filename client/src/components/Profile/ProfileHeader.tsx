import React, { memo } from 'react';
import { useParams } from 'react-router-dom';
import { userAPI } from '../../services/UserService';
import { useAppDispatch } from '../../redux/hooks';
import { useAppSelector } from '../../redux/hooks';
import { setAvatarDialog } from '../../redux/slices/avatarDialogSlice';

const ProfileHeader: React.FC = memo(() => {

    const dispatch = useAppDispatch();

    const { creatorId } = useParams();

    const userId = useAppSelector(state => state.userInfo.value?.id);

    const { data: user } = userAPI.useFetchUserByIdQuery({userId: creatorId as string});

    const showAvatarDialog = () => {
        dispatch(setAvatarDialog(true));
    };

    return (
        <div className="profile__header">
            <div className="profile__header-container">
                <div className="profile__header-avatar-container">
                    <img 
                        src={`http://localhost:5001${user?.avatar}`}
                        alt=""
                        className="profile__header-avatar"
                        onClick={userId === creatorId ? showAvatarDialog : () => { return }}
                        style={{cursor: userId === creatorId ? "pointer" : "auto"}}
                    />
                </div>
                <div className="profile__header-main">
                    <div className="profile__header-main-top">
                        <div className="profile__header-name">
                            {user?.nickname}
                        </div>
                    </div>
                    <div className="profile__header-main-bottom">
                        Hello, whats up dooooog!!!!!
                        Hello, whats up dooooog!!!!!
                        Hello, whats up dooooog!!!!!
                        Hello, whats up dooooog!!!!!
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ProfileHeader;