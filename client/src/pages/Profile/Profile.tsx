import React from 'react';
import AvatarDialog from '../../components/Profile/AvatarDialog/AvatarDialog';
import CreatePublicationDialog from '../../components/Profile/CreatePublicationDialog/CreatePublicationDialog';
import ProfileHeader from '../../components/Profile/ProfileHeader';
import PublicationDialogContainer from '../../components/Profile/PublicationDialogContainer/PublicationDialogContainer';
import PublicationsContainer from '../../components/Profile/PublicationsContainer';
import { useAppDispatch } from '../../redux/hooks';
import { useAppSelector } from '../../redux/hooks';
import { setCreatePublicationDialog } from '../../redux/slices/createPublicationDialogSlice';
import { useParams } from 'react-router-dom';
import './Profile.sass';

const Profile: React.FC = () => {

    const dispatch = useAppDispatch();

    const { creatorId } = useParams();
    const userId = useAppSelector(state => state.userInfo.value?.id);

    const avatarDialog = useAppSelector(state => state.avatarDialog.value);
    const publicationDialog = useAppSelector(state => state.profilePublicationDialog.isDisplayed);
    const createPublicationDialog = useAppSelector(state => state.createPublicationDialog.value);

    const showCreatePublicationDialog = () => {
        dispatch(setCreatePublicationDialog(true));
    };
    
    return (
        <div className="profile">
            {avatarDialog && <AvatarDialog />}
            {publicationDialog && <PublicationDialogContainer />}
            {createPublicationDialog && <CreatePublicationDialog />}
            <ProfileHeader />
            <button
                className="profile__create-publication-button"
                onClick={showCreatePublicationDialog}
                style={{visibility: creatorId === userId ? "visible" : "hidden"}}
            >+</button>
            <PublicationsContainer />
        </div>
    );
};

export default Profile;