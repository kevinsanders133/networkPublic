import React, { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setCreateChatDialog } from '../../../redux/slices/createChatDialogSlice';
import { setSelectedUsers } from '../../../redux/slices/selectedUsersSlice';
import { chatAPI } from '../../../services/ChatService';
import { userAPI } from '../../../services/UserService';
import CreateChatDialogItem from '../CreateChatDialogItem';
import SelectedUser from '../SelectedUser';
import axios from 'axios';
import './CreateChatDialog.scss';

const CreateChatDialog: React.FC = () => {
    const dispatch = useAppDispatch();
    const userId = useAppSelector(state => state.userInfo.value?.id);
    const selectedUsers = useAppSelector(state => state.selectedUsers.value);
    const [phrase, setPhrase] = useState<string>('');
    const titleInput = useRef<HTMLInputElement>(null);
    const { data: followedUsers } = userAPI.useFetchFollowedUsersBySourceIdQuery({phrase, sourceId: userId as string});
    const [createChat, {}] = chatAPI.useCreateChatMutation();

    const closeDialog = () => {
        dispatch(setSelectedUsers({}));
        dispatch(setCreateChatDialog(false));
    }

    const _createChat = async () => {
        if (Object.keys(selectedUsers).length === 1) {
            const existsRes = await axios.get(
                `http://localhost:5000/chats/private?userId_1=${userId}&userId2=${Object.keys(selectedUsers)[0]}`
            );
            const exists: boolean = existsRes.data;
            if (exists) {
                closeDialog();
                // dispatch(setChatInfo({id: }));
                console.log("chat exists");
            } else {
                await createChat({
                    usersIds: Object.keys(selectedUsers),
                    initiatorId: userId as string,
                    title: ''
                });
            }
        } else {
            if (titleInput?.current) {
                if (titleInput.current.value !== '') {
                    const title = titleInput.current.value;
                    await createChat({
                        usersIds: Object.keys(selectedUsers),
                        initiatorId: userId as string,
                        title: title
                    });
                } else {
                    titleInput.current.classList.add('title-input-error');
                    setTimeout(() => {
                        if (titleInput?.current) {
                            titleInput.current.classList.remove('title-input-error');
                        }
                    }, 4000);
                }
            }
        }
    }

    const filterUsers = (e: React.FormEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement;
        const value = input.value;
        setPhrase(value);
    }

    return (
        <div className="create-chat-dialog-container">
            <div className="create-chat-dialog">
                <div className="create-chat-dialog__header">
                   <h3 className="create-chat-dialog__title">Create new chat</h3>
                   <button
                        className="create-chat-dialog__create"
                        onClick={_createChat}
                        disabled={Object.keys(selectedUsers).length > 0 ? false : true}
                        style={{
                            background: Object.keys(selectedUsers).length === 0 ? "#c6c6c6" : "#300beb"
                        }}
                    >Create</button>
                </div>
                <div className="create-chat-dialog__search">
                    <input type="text" placeholder="Search..." onChange={filterUsers} />
                    <input
                        type="text"
                        className="create-chat-dialog__search-title-input"
                        placeholder="Enter chat's title..."
                        ref={titleInput}
                        style={{
                            display: Object.keys(selectedUsers).length > 1 ? "flex" : "none"
                        }}
                        required={true}
                    />
                    <div
                        className="create-chat-dialog__selected-users"
                        style={{
                            display: Object.keys(selectedUsers).length ? "flex" : "none"
                        }}
                    >
                        {
                            Object.keys(selectedUsers).map(id => {
                                return <SelectedUser id={id} nickname={selectedUsers[id]} key={id} />
                            })
                        }
                    </div>
                </div>
                <ul className="create-chat-dialog__main">
                    {
                        followedUsers?.map(user => {
                            return (
                                <CreateChatDialogItem
                                    user={user}
                                    key={user.id}
                                />
                            )
                        })
                    }
                </ul>
            </div>
            <div className="create-chat-dialog__close" onClick={closeDialog}>
                <svg aria-label="Close" className="create-chat-dialog__close-image" color="#ffffff" fill="#ffffff" height="25" role="img" viewBox="0 0 48 48" width="25"><title>Close</title><path clipRule="evenodd" d="M41.8 9.8L27.5 24l14.2 14.2c.6.6.6 1.5 0 2.1l-1.4 1.4c-.6.6-1.5.6-2.1 0L24 27.5 9.8 41.8c-.6.6-1.5.6-2.1 0l-1.4-1.4c-.6-.6-.6-1.5 0-2.1L20.5 24 6.2 9.8c-.6-.6-.6-1.5 0-2.1l1.4-1.4c.6-.6 1.5-.6 2.1 0L24 20.5 38.3 6.2c.6-.6 1.5-.6 2.1 0l1.4 1.4c.6.6.6 1.6 0 2.2z" fillRule="evenodd"></path></svg>
            </div>
        </div>
    );
}

export default CreateChatDialog;