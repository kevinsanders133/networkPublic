import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IAvatarDialogState {
    value: boolean
}

const initialState: IAvatarDialogState = {
    value: false
};

export const avatarDialogSlice = createSlice({
    name: 'avatarDialog',
    initialState,
    reducers: {
        setAvatarDialog: (state, action: PayloadAction<boolean>) => {
            state.value = action.payload;
        }
    }
});

export const { setAvatarDialog } = avatarDialogSlice.actions;

export default avatarDialogSlice.reducer;