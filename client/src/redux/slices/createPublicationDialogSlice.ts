import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ICreatePublicationDialogState {
    value: boolean
}

const initialState: ICreatePublicationDialogState = {
    value: false
};

export const createPublicationDialogSlice = createSlice({
    name: 'createPublicationDialog',
    initialState,
    reducers: {
        setCreatePublicationDialog: (state, action: PayloadAction<boolean>) => {
            state.value = action.payload;
        }
    }
});

export const { setCreatePublicationDialog } = createPublicationDialogSlice.actions;

export default createPublicationDialogSlice.reducer;