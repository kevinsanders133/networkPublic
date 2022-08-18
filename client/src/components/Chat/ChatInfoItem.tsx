import React from 'react';
import { useAppSelector } from '../../redux/hooks';

interface ChatInfoItemProps {
    barName: string;
    icon: string;
    numberOfFiles: number;
    showFilesBar: (type: string) => void;
}

const ChatInfoItem: React.FC<ChatInfoItemProps> = ({ barName, icon, numberOfFiles, showFilesBar }) => {
    const chatInfo = useAppSelector(state => state.chatInfo.value);

    return (
        chatInfo
        &&
        <li className="chat-info__files-item" onClick={() => showFilesBar(barName)}>
            <div
                className="chat-info__files-item-icon"
                style={{backgroundImage: `url(${icon}`}}
            ></div>
            <div className="chat-info__files-item-name">
                {numberOfFiles} {barName}
            </div>
        </li>
    );
}

export default ChatInfoItem;