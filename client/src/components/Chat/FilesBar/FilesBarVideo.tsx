import React from 'react';
import IShortFileInfo from '../../../models/IShortFileInfo';

interface FilesBarVideoProps {
    file: IShortFileInfo;
}

const FilesBarVideo: React.FC<FilesBarVideoProps> = ({ file }) => {
    const setVolumeToPercent = (e: React.SyntheticEvent) => {
        const video = e.target as HTMLVideoElement;
        video.volume = 0.3;
    }

    return (
        <video className="files-bar__video" preload="metadata" onLoadStart={setVolumeToPercent}>
            <source src={`http://localhost:5001${file.path}`} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    );
}

export default FilesBarVideo;