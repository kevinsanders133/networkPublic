import React, { useState, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import './ChatInfo.sass';
import photosIcon from '../../../assets/svg/chat_info/photo.svg';
import filesIcon from '../../../assets/svg/chat_info/file.svg';
import linksIcon from '../../../assets/svg/chat_info/link.svg';
import ChatInfoItem from '../ChatInfoItem';
import { setFilesBar } from '../../../redux/slices/filesBarSlice';
import { chatAPI } from '../../../services/ChatService';
import { publicationAPI } from '../../../services/PublicationService';

const chatInfoProfile = {
    background: "#e8e8e8",
    height: "20px",
    borderRadius: "10px"
}

const PrivateChatInfo: React.FC = (() => {
    const dispatch = useAppDispatch();
    const privateChatInfo = useRef<HTMLDivElement>(null);
    const userInfo = useAppSelector(state => state.userInfo.value);
    const chatInfo = useAppSelector(state => state.chatInfo.value);

    const { data: chat } = chatAPI.useFetchByIdQuery({chatId: chatInfo?.id as string, userId: userInfo?.id as string});
    const { data: numberOfFiles } = chatAPI.useFetchNumberOfFilesQuery({ chatId: chatInfo?.id as string });

    useEffect(() => {
        if (chatInfo?.type === 'private') {
            // privateChatInfo.current.className = 'chat-info';
        }
    }, [chatInfo?.type]);

    const showFilesBar = (type: string) => {
        dispatch(setFilesBar({type, isShown: true}));
    }

    return (
        <div className="chat-info" ref={privateChatInfo}>
            <div className="chat-info__header">
                <div className="chat-info__header-container">
                    <div className="chat-info__header-name">
                        User info
                    </div>
                </div>
            </div>
            <div className="chat-info__main">
                <div className="chat-info__profile">
                    <div className="chat-info__profile-container">
                        {
                            chatInfo
                            ?
                            <>
                            <div className="chat-info__avatar-container">
                                <img 
                                    src={
                                        chat?.type === 'group' || chat?.type === 'private' && chat?.initiator_id == userInfo?.id
                                        ?
                                        `http://localhost:5001${chat?.avatar[0]}`
                                        :
                                        `http://localhost:5001${chat?.avatar[1]}`
                                    }
                                    alt="" 
                                    className="chat-info__avatar"
                                />
                            </div>
                            <div className="chat-info__profile-info">
                                <div className="chat-info__name">
                                    {
                                        chat?.type === 'group' || chat?.type === 'private' && chat?.initiator_id == userInfo?.id
                                        ?
                                        chat?.title[0]
                                        :
                                        chat?.title[1]
                                    }
                                </div>
                                <div className="chat-info__online">
                                    last seen recently
                                </div>
                            </div>
                            </>
                            :
                            <>
                            <div
                                className="chat-info__avatar-container"
                                style={{
                                    background: "#e8e8e8",
                                    borderRadius: "50%",
                                    pointerEvents: "none"
                                }}
                            ></div>
                            <div className="chat-info__profile-info">
                                <div
                                    className="chat-info__name"
                                    style={{...chatInfoProfile, width: "100px"}}
                                ></div>
                                <div
                                    className="chat-info__online"
                                    style={{...chatInfoProfile, width: "150px"}}
                                ></div>
                            </div>
                            </>
                        }
                    </div>
                </div>
                <ul className="chat-info__files">
                    {
                        numberOfFiles?.images !== 0 &&
                        <ChatInfoItem
                            barName={'Images'}
                            icon={photosIcon}
                            numberOfFiles={numberOfFiles?.images as number}
                            showFilesBar={showFilesBar}
                        />
                    }
                    {
                        numberOfFiles?.videos !== 0 &&
                        <ChatInfoItem
                            barName={'Videos'}
                            icon={filesIcon}
                            numberOfFiles={numberOfFiles?.videos as number}
                            showFilesBar={showFilesBar}
                        />
                    }
                    {
                        numberOfFiles?.files !== 0 &&
                        <ChatInfoItem
                            barName={'Files'}
                            icon={linksIcon}
                            numberOfFiles={numberOfFiles?.files as number}
                            showFilesBar={showFilesBar}
                        />
                    }
                </ul>
                <div className="chat-info__settings"></div>
            </div>
        </div>
    );
});

export default PrivateChatInfo;