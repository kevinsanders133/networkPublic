import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setFilesBar } from '../../../redux/slices/filesBarSlice';
import FilesBarFile from './FilesBarFile';
import FilesBarImage from './FilesBarImage';
import FilesBarVideo from './FilesBarVideo';
import './FilesBar.sass';

const FilesBar: React.FC = (() => {
    const dispatch = useAppDispatch();
    const chatInfo = useAppSelector(state => state.chatInfo.value);
    const filesBarInfo = useAppSelector(state => state.filesBar.value);
    const filesBar = useRef<HTMLDivElement>(null);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        if (chatInfo?.id && filesBarInfo?.type) {
            fetchFiles(chatInfo?.id, filesBarInfo?.type);
        } else {
            if (files.length !== 0) {
                setFiles([]);
            }
        }
    }, [filesBarInfo?.type]);

    const fetchFiles = async (chatId: string, fileType: string) => {
        const filesRes = await axios.get(`http://localhost:5001/chats/${chatId}/files/byType/${fileType}`);
        const newFiles = filesRes.data;
        setFiles(newFiles);
    }

    useEffect(() => {
        if (filesBarInfo.isShown) {
            filesBar.current?.classList.remove('files-hide');
            filesBar.current?.classList.add('files-show');
        } else {
            if (chatInfo?.id !== undefined) {
                filesBar.current?.classList.remove('files-show');
                filesBar.current?.classList.add('files-hide');
            }
        }
    }, [filesBarInfo.isShown]);

    const closeFilesBar = () => {
        dispatch(setFilesBar({type: null, isShown: false}));
    }

    return (
        <div ref={filesBar} className="files-bar">
            <div className="chat-info__header">
                <div className="chat-info__header-container">
                    <div className="chat-info__header-name">
                        {filesBarInfo.type}
                    </div>
                    <div className="chat-info__close" onClick={() => closeFilesBar()}></div>
                </div>
            </div>
            <div className="files-bar__main">
                {
                    files.length === 0
                    ?
                    'Loading...'
                    :
                    files
                    ?
                    files.map((file, index) => {
                        switch(filesBarInfo.type) {
                            case 'Images':
                                return <FilesBarImage key={index} file={file} />
                            case 'Videos':
                                return <FilesBarVideo key={index} file={file} />
                            case 'Files':
                                return <FilesBarFile key={index} file={file} />
                        }
                    })
                    :
                    'No files'
                }              
            </div>
        </div>
    );
});

export default FilesBar;