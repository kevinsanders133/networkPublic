import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IFilesBar {
    type: string | null;
    isShown: boolean;
}

interface IFilesBarState {
    value: IFilesBar
}

const initialState: IFilesBarState = {
    value: { type: null, isShown: false }
};

export const filesBarSlice = createSlice({
    name: 'filesBar',
    initialState,
    reducers: {
        setFilesBar: (state, action: PayloadAction<IFilesBar>) => {
            state.value = action.payload;
        }
    }
});

export const { setFilesBar } = filesBarSlice.actions;

export default filesBarSlice.reducer;