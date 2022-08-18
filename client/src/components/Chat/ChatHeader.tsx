import React, { memo } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { chatAPI } from '../../services/ChatService';

const ChatHeader: React.FC = memo(() => {
    const userInfo = useAppSelector(state => state.userInfo.value);
    const chatInfo = useAppSelector(state => state.chatInfo.value);
    const { data: chat } = chatAPI.useFetchByIdQuery({chatId: chatInfo?.id as string, userId: userInfo?.id as string});

    return (
        <div className="chat__upper-bar">
            {
                chat?.type === 'group' || chat?.type === 'private' && chat?.initiator_id == userInfo?.id
                ?
                chat?.title[0]
                :
                chat?.title[1]
            }
        </div>
    );
})

export default ChatHeader;