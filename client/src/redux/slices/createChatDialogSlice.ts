import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ICreateChatDialogSlice {
    value: boolean
}

const initialState: ICreateChatDialogSlice = {
    value: false
};

export const createChatDialogSlice = createSlice({
    name: 'createChatDialogSlice',
    initialState,
    reducers: {
        setCreateChatDialog: (state, action: PayloadAction<boolean>) => {
            state.value = action.payload;
        }
    }
});

export const { setCreateChatDialog } = createChatDialogSlice.actions;

export default createChatDialogSlice.reducer;