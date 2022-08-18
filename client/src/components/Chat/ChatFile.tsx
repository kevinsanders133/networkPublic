import React, { memo } from 'react';
import IShortFileInfo from '../../models/IShortFileInfo';

interface ChatFileProps {
    side: string;
    fileInfo: IShortFileInfo;
}

const ChatFile: React.FC<ChatFileProps> = memo(({ side, fileInfo }) => {

    const fileName = fileInfo.path.split('/')[fileInfo.path.split('/').length - 1].split('-').slice(1).join('-');

    return (
        <div className={`chat__${side}-message`}>
            {/* <div className="chat__file"> */}
                <div className="chat__file-image-container">
                    <div className="chat__file-image"></div>
                </div>
                <div className="chat__file-info">
                    <div className="chat__file-name">
                        {fileName}
                    </div>
                    <div className="chat__file-size">
                        {fileInfo.size}KB
                    </div>
                </div>
            {/* </div> */}
        </div>
    )
})

export default ChatFile;