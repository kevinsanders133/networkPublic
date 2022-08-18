import React, { useEffect, useRef } from 'react';
import IShortFileInfo from '../../models/IShortFileInfo';
import ChatText from './ChatText';
import ChatImage from './ChatImage';
import ChatVideo from './ChatVideo';
import ChatFile from './ChatFile';
import { useAppSelector } from '../../redux/hooks';

const ChatMessages: React.FC = () => {
    const main = useRef<HTMLDivElement>(null);
    const bottom = useRef<HTMLDivElement>(null);
    const userInfo = useAppSelector(state => state.userInfo.value);
    const messages = useAppSelector(state => state.messages.messages);

    useEffect(() => {
        if (messages.length !== 0) {
            setTimeout(() => {
                scrollToBottom();
            }, 100)
        }
    }, [messages]);

    const scrollToBottom = () => {
        bottom.current?.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div className="chat__main" ref={main}>
            {
                messages.map((message, index) =>{
                    let side = 'left';
                    if (message.user_id === userInfo?.id) {
                        side = 'right';
                    }
                    switch(message.type) {
                        case 'text':
                            return <ChatText key={index} side={side} text={message.data as string} />;
                        case 'image':
                            return <ChatImage key={index} side={side} fileInfo={message.data as IShortFileInfo} />;  
                        case 'video':
                            return <ChatVideo key={index} side={side} fileInfo={message.data as IShortFileInfo} />;
                        case 'file':
                            return <ChatFile key={index} side={side} fileInfo={message.data as IShortFileInfo} />;
                    }
                })
            }
            <div ref={bottom} />
        </div>
    )
}

export default ChatMessages;