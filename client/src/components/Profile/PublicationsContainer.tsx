import React, { memo, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { publicationAPI } from '../../services/PublicationService';
import PublicationsItem from './PublicationsItem';

const PublicationsContainer: React.FC = memo(() => {

    const { creatorId } = useParams();

    const params = {
        userId: creatorId as string,
        limit: 10
    };

    const {
        data: publications,
        error,
        isLoading } = publicationAPI.useFetchByUserIdQuery(params);

    return (
        <div className="profile__main">
            {isLoading && 
            <>
                <PublicationsItem key={1} />
                <PublicationsItem key={2} />
                <PublicationsItem key={3} />
            </>
            }
            {error && <h1>Произошла ошибка при загрузке</h1>}
            {publications &&  
                publications.map((publication, index) => {
                    return <PublicationsItem
                            key={publication.id}
                            pathForTheFirstAsset={publications[index].paths[0]}
                            index={index} />
                })
            }
        </div>
    );
});

export default PublicationsContainer;