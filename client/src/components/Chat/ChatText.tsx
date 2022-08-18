import React, { memo } from 'react';

interface ChatTextProps {
    side: string;
    text: string;
}

const ChatText: React.FC<ChatTextProps> = memo(({ side, text }) => {
    return (
        <div className={`chat__${side}-message`}>
            {text}
        </div>
    );
})

export default ChatText;