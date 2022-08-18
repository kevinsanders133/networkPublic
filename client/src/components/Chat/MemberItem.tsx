import React, { useEffect, useContext } from 'react';
import { useAppSelector } from '../../redux/hooks';

interface IMemberItem {
    id: number;
    name: string;
}

const MemberItem: React.FC<IMemberItem> = ({ id, name }) => {
    const chatInfo = useAppSelector(state => state.chatInfo.value);

    // useEffect(() => {
    //     privateChatInfo?.current?.classList.add('private-info');
    // }, []);

    // const showMember = () => {
    //     privateChatInfo?.current?.classList.remove('private-hide');
    //     privateChatInfo?.current?.classList.add('private-show');
    // }

    return (
        // <div className='member-item' onClick={showMember}>
        <div className='member-item'>
            <div className="member-item__avatar-container">
            <img 
                src={require('../../assets/svg/image_print.jfif')}
                alt="" 
                className="member-item__avatar" 
            />
            </div>
            <div className="member-item__main">
            <div className="member-item__main-top">
                <div className="member-item__name">
                {name}
                </div>
            </div>
            <div className="member-item__main-bottom">
                Last seen 28 minutes ago
            </div>
            </div>
        </div>
    );
}

export default MemberItem;