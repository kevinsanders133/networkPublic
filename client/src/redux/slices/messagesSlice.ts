import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IMessage from '../../models/IMessage';

interface IMessagesState {
    messages: IMessage[];
}

const initialState: IMessagesState = {
    messages: []
};

export const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setMessages: (state, action: PayloadAction<IMessage[]>) => {
            state.messages = action.payload;
        },
        pushMessage: (state, action: PayloadAction<IMessage>) => {
            state.messages.push(action.payload);
        },
    }
});

export const { setMessages, pushMessage } = messagesSlice.actions;

export default messagesSlice.reducer;