import React from 'react';
import IPublication from '../../../models/IPublication';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setProfilePublicationDialog } from '../../../redux/slices/profilePublicationDialogSlice';
import { publicationAPI } from '../../../services/PublicationService';
import ContentSlider from '../ContentSlider';
import ManagementPanel from '../ManagementPanel';
import './PublicationDialog.scss';

interface PublicationDialogProps {
    publicationId: string;
}

const PublicationDialog: React.FC<PublicationDialogProps> = ({ publicationId }) => {

    const dispatch = useAppDispatch();
    const userId = useAppSelector(state => state.userInfo.value?.id);
    const { data: publication } = publicationAPI.useFetchByIdQuery({ publicationId, userId: userId as string });

    const closeDialog = () => {
        dispatch(setProfilePublicationDialog({ isDisplayed: false, publicationId: undefined, creatorId: undefined }));
    }

    return (
        <>  
        {
        publication
        ?
        <div className="profile-publication-dialog-container">
            <div className="profile-publication-dialog">
                <ContentSlider publication={publication as IPublication} />
                <ManagementPanel publication={publication as IPublication} />
                <div className="profile-publication-dialog__close" onClick={closeDialog}>
                    <svg aria-label="Close" className="profile-publication-dialog__close-image" color="#ffffff" fill="#ffffff" height="25" role="img" viewBox="0 0 48 48" width="25"><title>Close</title><path clipRule="evenodd" d="M41.8 9.8L27.5 24l14.2 14.2c.6.6.6 1.5 0 2.1l-1.4 1.4c-.6.6-1.5.6-2.1 0L24 27.5 9.8 41.8c-.6.6-1.5.6-2.1 0l-1.4-1.4c-.6-.6-.6-1.5 0-2.1L20.5 24 6.2 9.8c-.6-.6-.6-1.5 0-2.1l1.4-1.4c.6-.6 1.5-.6 2.1 0L24 20.5 38.3 6.2c.6-.6 1.5-.6 2.1 0l1.4 1.4c.6.6.6 1.6 0 2.2z" fillRule="evenodd"></path></svg>
                </div>
            </div>
        </div>
        :
        "Loading..."
        }
        </>
    );
};

export default PublicationDialog;