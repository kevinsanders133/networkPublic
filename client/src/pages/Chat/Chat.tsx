import React, { useEffect } from 'react';
import PrivateChatInfo from '../../components/Chat/ChatInfo/ChatInfo';
import FilesBar from '../../components/Chat/FilesBar/FilesBar';
import Chats from '../../components/Chat/Chats/Chats';
import CreateChatDialog from '../../components/Chat/CreateChatDialog/CreateChatDialog';
import ChatMain from '../../components/Chat/ChatMain';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setChatInfo } from '../../redux/slices/chatInfoSlice';
import './Chat.sass';

const Chat: React.FC = () => {

    const dispatch = useAppDispatch();
    const createChatDialog = useAppSelector(state => state.createChatDialog.value);

    useEffect(() => () => {dispatch(setChatInfo(null))}, []);

    return (
        <div className="chat-page-container">
            <Chats />
            <ChatMain />
            <div className="chat-aside">
                <PrivateChatInfo />
                <FilesBar />
            </div>
            { createChatDialog && <CreateChatDialog /> }
        </div>
    );
}

export default Chat;