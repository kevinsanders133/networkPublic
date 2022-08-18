import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import { userAPI } from '../../services/UserService';
import { publicationAPI } from '../../services/PublicationService';
import axios from 'axios';

interface FollowButtonProps {
    targetId: string;
}

const FollowButton: React.FC<FollowButtonProps> = ({ targetId }) => {

    const userId = useAppSelector(state => state.userInfo.value?.id);

    const { data: userInfo, refetch: refetchFollowers } = userAPI.useFetchUserByIdQuery({userId: userId as string});
    const { refetch: refetchPublications } = publicationAPI.useFetchFollowedPublicationsQuery({ userId: userId as string });
    const { refetch: refetchFollowedUsers } = userAPI.useFetchFollowedUsersBySourceIdQuery({phrase: '', sourceId: userId as string});

    const action = !userInfo?.friends?.hasOwnProperty(targetId) ? 'follow' : 'unfollow';

    const actionFunc = async () => {
        try {
            await axios.post(`http://localhost:5005/${action}`, {
                source_id: userId,
                target_id: targetId
            });
            refetchFollowers();
            refetchPublications();
            refetchFollowedUsers();
        } catch(e) {
            console.log(e);
        }
    }

    return (
        <div
            className={`followers__item-${action}-button`}
            onClick={actionFunc}
        >
        {action}
        </div>
    );
};

export default FollowButton;