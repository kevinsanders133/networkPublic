import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/hooks';
import { useAppSelector } from '../../../redux/hooks';
import { setProfilePublicationDialog } from '../../../redux/slices/profilePublicationDialogSlice';
import { publicationAPI } from '../../../services/PublicationService';
import PublicationDialog from '../PublicationDialog/PublicationDialog';

const PublicationDialogContainer: React.FC = () => {

    const dispatch = useAppDispatch();

    const { creatorId } = useParams();

    const index = useAppSelector(state => state.profilePublicationDialog.index);

    const params = {
        userId: creatorId as string,
        limit: 10
    };

    const { data: publications } = publicationAPI.useFetchByUserIdQuery(params);

    const slideToLeft = () => {
        if (publications && index !== undefined && index > 0) {
            dispatch(setProfilePublicationDialog({ index: index - 1 }));
        }
    }

    const slideToRight = () => {
        if (publications && index !== undefined && publications.length - index > 1) {
            dispatch(setProfilePublicationDialog({ index: index + 1 }));
        }
    }

    return (
        <>
            <div
                className="profile-publication__left"
                onClick={slideToLeft}
                style={{visibility: index !== undefined && index > 0 ? "visible" : "hidden"}}
            >
                <svg aria-label="Next" className="profile-publication__left-arrow" color="#000000" fill="#000000" height="16" role="img" viewBox="0 0 24 24" width="16"><path d="M21 17.502a.997.997 0 01-.707-.293L12 8.913l-8.293 8.296a1 1 0 11-1.414-1.414l9-9.004a1.03 1.03 0 011.414 0l9 9.004A1 1 0 0121 17.502z"></path></svg>
            </div>
            {
                publications && index !== undefined &&
                <PublicationDialog publicationId={publications[index].id} />
            }
            <div
                className="profile-publication__right"
                onClick={slideToRight}
                style={{
                    visibility:
                    publications && index !== undefined && publications.length - index > 1
                    ? "visible"
                    : "hidden"
                }}
            >
                <svg aria-label="Next" className="profile-publication__right-arrow" color="#000000" fill="#000000" height="16" role="img" viewBox="0 0 24 24" width="16"><path d="M21 17.502a.997.997 0 01-.707-.293L12 8.913l-8.293 8.296a1 1 0 11-1.414-1.414l9-9.004a1.03 1.03 0 011.414 0l9 9.004A1 1 0 0121 17.502z"></path></svg>
            </div>
        </>
    );
};

export default PublicationDialogContainer;