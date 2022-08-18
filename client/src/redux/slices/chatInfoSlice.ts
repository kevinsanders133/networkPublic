import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IChatInfo {
    id: string | null;
    type: string | null;
}

interface IChatInfoState {
    value: IChatInfo | null
}

const initialState: IChatInfoState = {
    value: null
};

export const chatInfoSlice = createSlice({
    name: 'chatInfo',
    initialState,
    reducers: {
        setChatInfo: (state, action: PayloadAction<IChatInfo | null>) => {
            state.value = action.payload;
        }
    }
});

export const { setChatInfo } = chatInfoSlice.actions;

export default chatInfoSlice.reducer;