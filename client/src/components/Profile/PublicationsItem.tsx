import React from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { setProfilePublicationDialog } from '../../redux/slices/profilePublicationDialogSlice';

interface PublicationsItemProps {
    pathForTheFirstAsset?: string;
    index?: number;
}

const PublicationsItem: React.FC<PublicationsItemProps> = ({ pathForTheFirstAsset, index }) => {

    const dispatch = useAppDispatch();

    const showDialog = () => {
        dispatch(setProfilePublicationDialog({ isDisplayed: true, index }));
    }

    return (
        <div
            className="profile__main-image"
            style={
                pathForTheFirstAsset
                ? {backgroundImage: `url(http://localhost:5001/users/${pathForTheFirstAsset})`}
                : {animationName: "loadingPublications"}}
            onClick={showDialog}
        ></div>
    );
};

export default PublicationsItem;