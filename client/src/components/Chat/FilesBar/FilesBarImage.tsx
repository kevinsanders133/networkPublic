import React from 'react';
import IFile from '../../../models/IFile';
import IShortFileInfo from '../../../models/IShortFileInfo';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

interface FilesBarImageProps {
    file: IShortFileInfo;
}

const FilesBarImage: React.FC<FilesBarImageProps> = ({ file }) => {
    const dispatch = useAppDispatch();
    const chatId = useAppSelector(state => state.chatInfo.value?.id);

    return (
        <img src={`http://localhost:5001${file.path}`} className="files-bar__image" />
    );
}

export default FilesBarImage;