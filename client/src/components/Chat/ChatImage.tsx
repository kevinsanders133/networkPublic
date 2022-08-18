import React, { memo } from 'react';
import IShortFileInfo from '../../models/IShortFileInfo';

interface ChatImageProps {
    side: string;
    fileInfo: IShortFileInfo;
}

const ChatImage: React.FC<ChatImageProps> = memo(({ side, fileInfo }) => {
    return (
        <div className={`chat__${side}-message no-padding`}>
            <img
                src={`http://localhost:5001${fileInfo.path}`}
                className="chat__image"
                alt=""
            />
        </div>
    )
})

export default ChatImage;