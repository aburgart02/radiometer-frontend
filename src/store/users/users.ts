import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../namespace';
import {User} from "../../types/user/user";
import {fetchUsersAction} from "../api-actions/users-action/users-actions";

type UsersState = {
    users: User[];
    isLoaded: boolean;
}

const initialState: UsersState = {
    users: [],
    isLoaded: false,
};

export const users = createSlice({
    name: NameSpace.Users,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsersAction.pending, (state) => {
                state.isLoaded = false;
            })
            .addCase(fetchUsersAction.fulfilled, (state, value) => {
                state.isLoaded = true;
                state.users = value.payload;
            })
            .addCase(fetchUsersAction.rejected, (state) => {
                state.isLoaded = false;
            });
    }
});
