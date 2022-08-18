import React from 'react';
import Publication from '../../components/News/Publication';
import PublicationDialog from '../../components/Profile/PublicationDialog/PublicationDialog';
import { useAppSelector } from '../../redux/hooks';
import { publicationAPI } from '../../services/PublicationService';
import './News.sass';

const News: React.FC = () => {

    const userId = useAppSelector(state => state.userInfo.value?.id);
    const { publicationId, isDisplayed } = useAppSelector(state => state.profilePublicationDialog);

    const {
        data: publications,
        isLoading,
        error
    } = publicationAPI.useFetchFollowedPublicationsQuery({ userId: userId as string });

    return (
        <div className="news">
            {
                isDisplayed && publicationId &&
                <PublicationDialog publicationId={publicationId}  />
            }
            {
                publications?.map(p => {
                    return (
                        <Publication key={p.id} publication={p} />
                    )
                })
            }
        </div>
    );
}

export default News;