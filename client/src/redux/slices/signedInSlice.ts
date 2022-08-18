import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ISignedInState {
    value: boolean
}

const initialState: ISignedInState = {
    value: false
}

export const signedInfoSlice = createSlice({
    name: 'signedIn',
    initialState,
    reducers: {
        setSignedIn: (state, action: PayloadAction<boolean>) => {
            state.value = action.payload;
        }
    }
});

export const { setSignedIn } = signedInfoSlice.actions;

export default signedInfoSlice.reducer;