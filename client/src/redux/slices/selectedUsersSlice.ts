import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ISelectedUsers from '../../models/ISelectedUsers';

interface ICreateChatDialogSlice {
    value: ISelectedUsers;
}

const initialState: ICreateChatDialogSlice = {
    value: {}
};

export const selectedUsersSlice = createSlice({
    name: 'selectedUsersSlice',
    initialState,
    reducers: {
        setSelectedUsers: (state, action: PayloadAction<ISelectedUsers>) => {
            state.value = action.payload;
        },
        removeSelectedUser: (state, action: PayloadAction<string>) => {
            delete state.value[action.payload];
        }
    }
});

export const { setSelectedUsers, removeSelectedUser } = selectedUsersSlice.actions;

export default selectedUsersSlice.reducer;