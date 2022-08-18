import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setCreateChatDialog } from '../../redux/slices/createChatDialogSlice';
import { chatAPI } from '../../services/ChatService';
import axios from 'axios';
import io from 'socket.io-client';
import ISocket from '../../models/ISocket';
import IMessage from '../../models/IMessage';
import IChatMessageData from '../../models/IChatMessageData';
import ChatMessages from './ChatMessages';
import ChatHeader from './ChatHeader';
import ChatControlBar from './ChatControlBar';
import { setMessages, pushMessage } from '../../redux/slices/messagesSlice';
import IShortFileInfo from '../../models/IShortFileInfo';

const ChatMain: React.FC = () => {
    const dispatch = useAppDispatch();
    const userInfo = useAppSelector(state => state.userInfo.value);
    const chatInfo = useAppSelector(state => state.chatInfo.value);

    const { data: chats } = chatAPI.useFetchByUserIdQuery({userId: userInfo?.id as string, limit: 10});
    const [socketRef, setSocketRef] = useState<ISocket>();

    useEffect(() => {
        if (chatInfo?.id !== null) {

            const socket: ISocket = io(
                'http://localhost:5000',
                { transports: ['websocket', 'polling'] }
            ) as unknown as ISocket;

            setSocketRef(socket);

            socket.on('connect', async () => {
                socket.emit('adduser', userInfo?.id, chatInfo?.id, userInfo?.nickname);
            });
            socket.on('updatechat', (data: IChatMessageData) => {
                insertMessage(data.senderId, data);
            });

            getChatHistory();

            return () => {
                socket.disconnect();
            };
        }
    }, [chatInfo]);

    const getChatHistory = async () => {
        const historyRes = await axios.get(`http://localhost:5000/chats/${chatInfo?.id}/history`);
        const history: IMessage[] = historyRes.data;
        dispatch(setMessages(history));
    }

    const sendMessageIO = (senderId: string, senderNickname: string, type: string, data: string | IShortFileInfo) => {
        socketRef?.emit('sendmessage', {senderId, senderNickname, type, data});
    }

    const insertMessage = (senderId: string, data: IChatMessageData) => {
        dispatch(pushMessage({
            user_id: senderId,
            data: data.data,
            type: data.type
        } as IMessage)); 
    }

    const showCreateChatDialog = () => {
        dispatch(setCreateChatDialog(true));
    }

    return (
        <div className='chat'>
        {
            chats?.length === 0
            ?
            <div className="chat-page-empty">
                <div className="chat-page-empty__create-chat" onClick={showCreateChatDialog}>
                    Create new chat
                </div>
            </div>
            :
            chatInfo
            ?
            <>
            <ChatHeader />
            <ChatMessages />
            <ChatControlBar sendMessageIO={sendMessageIO} />
            </>
            :
            <div className="chat-page-empty">
                <div className="chat-page-empty__message">
                    Select a chat to start messaging
                </div>
            </div>
        }
        </div>
    );
}

export default ChatMain;