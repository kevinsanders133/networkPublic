import React, { useState } from 'react';
import FollowButton from '../../components/Followers/FollowButton';
import { useAppSelector } from '../../redux/hooks';
import { userAPI } from '../../services/UserService';
import { Link } from 'react-router-dom';
import './Followers.scss';

const Friends: React.FC = () => {

    const userId = useAppSelector(state => state.userInfo.value?.id);
    const [phrase, setPhrase] = useState<string>('');
    const { data: users } = userAPI.useFetchByPhraseQuery({ phrase, limit: 10 });

    const search = (e: React.FormEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement;
        const value = input.value;
        setPhrase(value);
    }

    return (
        <div className="followers">
            <div className="followers__header">
                <input type="text" placeholder="Search" onInput={search} className="followers__input" />
            </div>
            <div className="followers__main">
                <ul className="followers__list">
                {
                    users?.map(user => {
                        if (user.id !== userId) {
                            return (
                            <li className="followers__item" key={user.id}>
                                <Link to={`/profile/${user.id}`} className="followers__item-link" />
                                <div
                                    className="followers__item-avatar"
                                    style={{backgroundImage: `url(http://localhost:5001${user.avatar})`}}
                                ></div>
                                <div className="followers__item-nickname">{user.nickname}</div>
                                <FollowButton targetId={user.id} />
                            </li>
                            )   
                        }
                    })
                }
                </ul>
            </div>
        </div>
    );
};

export default Friends;