import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IUserInfo from '../../models/IUserInfo';

interface IUserInfoState {
    value: IUserInfo | null;
}

const initialState: IUserInfoState = {
    value: null
};

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<IUserInfo>) => {
            state.value = action.payload;
        }
    }
});

export const { setUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;