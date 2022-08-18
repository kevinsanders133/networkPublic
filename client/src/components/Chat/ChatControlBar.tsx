import axios from 'axios';
import React, { memo, useRef } from 'react';
import IFile from '../../models/IFile';
import IShortFileInfo from '../../models/IShortFileInfo';
import { useAppSelector } from '../../redux/hooks';

interface ChatControlBarProps {
    sendMessageIO: (senderId: string, senderNickname: string, type: string, data: string | IShortFileInfo) => void;
}

const ChatControlBar: React.FC<ChatControlBarProps> = memo(({ sendMessageIO }) => {
    const messageInput = useRef<HTMLInputElement>(null);
    const fileInput = useRef<HTMLInputElement>(null);

    const userInfo = useAppSelector(state => state.userInfo.value);
    const chatInfo = useAppSelector(state => state.chatInfo.value);

    const sendMessage = async () => {
        // Saving and sending a text message
        const message = messageInput.current?.value;
        if (message !== '') {
            const res = await axios.post('http://localhost:5000/saveTextMessage', {message, chatId: chatInfo?.id, senderId: userInfo?.id});
            if (res.status === 200) {
                sendMessageIO(userInfo?.id as string, userInfo?.nickname as string, 'text', message as string);
            }
        }

        // Saving and sending file messages
        const files = fileInput.current?.files;
        if (files?.length) {
            const formData = new FormData();
            for (var i = 0; i < files.length; i++) {
                formData.append("file", files[i]);
            }
            const config = {
                onUploadProgress: (progressEvent: any) => {
                    // var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    // progressBarFill.style["width"] = percentCompleted + "%";
                    // progressBarText.textContent = percentCompleted + "%";
                },
                headers: { "content-type" : "multipart/form-data" }
            }
            try {
                // Storing files from message on Files microservice
                const saveFilesFromMessageRes = await axios.post(
                    `http://localhost:5001/saveFilesFromMessage?chatId=${chatInfo?.id}`, formData, config
                );
                if (saveFilesFromMessageRes.status === 200) {
                    const uploadedFiles: IFile[] = saveFilesFromMessageRes.data;
                    for (let i = 0; i < uploadedFiles.length; i++) {
                        const splitedName = uploadedFiles[i].originalname.split('.');
                        const extension = splitedName[splitedName.length - 1];
                        let type = 'file';
                        if (['jpg', 'jpeg', 'png', 'svg', 'gif'].includes(extension)) {
                            type = 'image';
                        } else if (extension === 'mp4') {
                            type = 'video';
                        }
                        // Saving info about file messages to DB
                        await axios.post(
                            'http://localhost:5000/saveFileMessage',
                            {
                                chatId: chatInfo?.id,
                                senderId: userInfo?.id,
                                type,
                                file: uploadedFiles[i]
                            }
                        );
                        // Sending message
                        sendMessageIO(userInfo?.id as string, userInfo?.nickname as string, type, {
                            path: `/chats/${chatInfo?.id}/files/${uploadedFiles[i].filename}`,
                            size: uploadedFiles[i].size
                        } as IShortFileInfo);
                    }
                }
            }
            catch(e) {
                console.log(e);
            }
        }
        // const progressBarFill = document.querySelector(".progress-bar-fill");
        // const progressBarText = document.querySelector(".progress-bar-text");
    }

    return (
        <div className="chat__controlbar">
            <div className="chat__controlbar-container">
                <div className="chat__controlbar-attachment">
                    <div className="chat__controlbar-attachment-icon"></div>
                    <input
                        type="file"
                        className="chat__controlbar-attachment-input"
                        ref={fileInput}
                        multiple
                    />
                </div>
                <input 
                    ref={messageInput}
                    type="text" 
                    placeholder="Write a message..."
                    className="chat__controlbar-input" 
                />
                <div className="chat__controlbar-smiles">
                    <div className="chat__controlbar-smiles-icon"></div>
                </div>
                <div className="chat__controlbar-send" onClick={sendMessage}>
                    <div 
                        className="chat__controlbar-send-icon"
                        style={{
                            backgroundImage: `${process.env.PUBLIC_URL}/assets/svg/chat__control_bar/send.svg`
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
})

export default ChatControlBar;