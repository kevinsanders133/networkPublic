import React, { memo, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setChatInfo } from '../../../redux/slices/chatInfoSlice';
import './ChatItem.sass';
import IChat from '../../../models/IChat';
import { chatAPI } from '../../../services/ChatService';
import axios from 'axios';

const emptyChatItem = {
  background: "#e8e8e8",
  height: "20px",
  borderRadius: "10px"
}

const ChatItem: React.FC<IChat> = memo(({ id, type, avatar, title, initiator_id }) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.userInfo.value?.id);
  const [lastMessage, setLastMessage] = useState<string>('');
  const messages = useAppSelector(state => state.messages.messages);

  useEffect(() => {
    fetchLastMessage();
  }, []);

  useEffect(() => {
    if (messages.length !== 0) {
      const message = messages[messages.length - 1];
      let result = message.data as string;
      switch(message.type) {
        case 'image':
            result = 'image';
            break;
        case 'video':
            result = 'video';
            break;
        case 'file':
            result = 'file';
      }
      setLastMessage(result);
    }
  }, [messages]);

  const fetchLastMessage = async () => {
    const res = await axios.get(`http://localhost:5000/chats/${id}/lastMessage`); 
    setLastMessage(res.data);
  }

  const _setChatInfo = () => {
    dispatch(setChatInfo({id, type}));
  }

  return (
    <div
      className='chat-item'
      onClick={_setChatInfo}
      // style={{pointerEvents: "none"}}
    >
      <div className="chat-item__avatar-container">
        {
          Boolean(id)
          ?
          <img 
            src={
              type === 'group' || type === 'private' && userId === initiator_id
              ?
              `http://localhost:5001${avatar[0]}`
              :
              `http://localhost:5001${avatar[1]}`
            }
            alt=""
            className="chat-item__avatar"
          />
          :
          <div
            className="chat-item__avatar"
            style={{
              background: "#e8e8e8"
            }}
          ></div>
        }
      </div>
      <div className="chat-item__main">
        {
          Boolean(id)
          ?
          <>
          <div className="chat-item__main-top">
            <div className="chat-item__name">
              {
                (type === 'group' || type === 'private' && userId === initiator_id)
                ?
                title[0]
                :
                title[1]
              }
            </div>
            <div className="chat-item__is-seen"></div>
            <div className="chat-item__date">
              Fri
            </div>
          </div>
          <div className="chat-item__main-bottom">
            {lastMessage}
          </div>
          </>
          :
          <>
          <div
            className="chat-item__main-top"
            style={{...emptyChatItem, width: "200px"}}
          ></div>
          <div
            className="chat-item__main-bottom"
            style={{...emptyChatItem, width: "100px"}}
          ></div>
          </>
        }
      </div>
    </div>
  );
})

export default ChatItem;