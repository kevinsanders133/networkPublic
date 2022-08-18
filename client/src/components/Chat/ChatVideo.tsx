import React, { memo } from 'react';
import IShortFileInfo from '../../models/IShortFileInfo';

interface ChatVideoProps {
    side: string;
    fileInfo: IShortFileInfo;
}

const ChatVideo: React.FC<ChatVideoProps> = memo(({ side, fileInfo }) => {
    const setVolumeTo50Percent = (e: React.SyntheticEvent) => {
        const video = e.target as HTMLVideoElement;
        video.volume = 0.3;
    }

    return (
        <div className={`chat__${side}-message no-padding`}>
            <video className="chat__video" onLoadStart={setVolumeTo50Percent} controls>
                <source src={`http://localhost:5001${fileInfo.path}`} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    )
})

export default ChatVideo;