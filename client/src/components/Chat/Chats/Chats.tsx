import React, { useRef, memo } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import { useAppDispatch } from '../../../redux/hooks';
import { setCreateChatDialog } from '../../../redux/slices/createChatDialogSlice';
import ChatItem from '../ChatItem/ChatItem';
import { chatAPI } from '../../../services/ChatService';
import './Chats.sass';

const Chats: React.FC = memo(() => {
    const dispatch = useAppDispatch();
    const userId = useAppSelector(state => state.userInfo.value?.id);
    const container = useRef<HTMLDivElement>(null);

    const {data: chats, isLoading, error} = chatAPI.useFetchByUserIdQuery({userId: userId as string, limit: 10});

    const showCreateChatDilaog = () => {
        dispatch(setCreateChatDialog(true));
    }

    return (
        <div className='chats' ref={container}>
            <div className="chats__header">
                <div className="chats__create" onClick={showCreateChatDilaog}>
                    <svg aria-label="New message" className="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M12.202 3.203H5.25a3 3 0 00-3 3V18.75a3 3 0 003 3h12.547a3 3 0 003-3v-6.952" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><path d="M10.002 17.226H6.774v-3.228L18.607 2.165a1.417 1.417 0 012.004 0l1.224 1.225a1.417 1.417 0 010 2.004z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="16.848" x2="20.076" y1="3.924" y2="7.153"></line></svg>
                </div>
                <div className="chats__search-container">
                    <input type="search" placeholder='Search' className='chats__search' />
                </div>
            </div>
            <div className="chats__main">
                {
                    isLoading
                    ?
                    "Loading..."
                    :
                    (
                        chats && chats.length > 0
                        ?
                        chats.map((e) => {
                            return (
                                <ChatItem
                                    id={e.id}
                                    type={e.type}
                                    avatar={e.avatar}
                                    title={e.title}
                                    initiator_id={e.initiator_id}
                                    key={e.id}
                                />
                            )
                        })
                        :
                        <>
                        <ChatItem id={""} type={""} avatar={[]} title={[]} initiator_id={""} key={1} />
                        <ChatItem id={""} type={""} avatar={[]} title={[]} initiator_id={""} key={2} />
                        <ChatItem id={""} type={""} avatar={[]} title={[]} initiator_id={""} key={3} />
                        </>
                    )
                }
            </div>
        </div>
    );
})

export default Chats;