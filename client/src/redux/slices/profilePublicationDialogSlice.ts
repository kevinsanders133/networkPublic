import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IProfilePublicationDialogState {
    isDisplayed?: boolean;
    index?: number;
    publicationId?: string;
    creatorId?: string;
}

const initialState: IProfilePublicationDialogState = {
    isDisplayed: false
};

export const profilePublicationDialogSlice = createSlice({
    name: 'profilePublicationDialog',
    initialState,
    reducers: {
        setProfilePublicationDialog: (state, action: PayloadAction<IProfilePublicationDialogState>) => {
            if (action.payload.index !== undefined) {
                state.index = action.payload.index;
            }
            if (action.payload.isDisplayed !== undefined) {
                state.isDisplayed = action.payload.isDisplayed;
            }
            if (action.payload.publicationId !== undefined) {
                state.publicationId = action.payload.publicationId;
            }
        },
    }
});

export const { setProfilePublicationDialog } = profilePublicationDialogSlice.actions;

export default profilePublicationDialogSlice.reducer;