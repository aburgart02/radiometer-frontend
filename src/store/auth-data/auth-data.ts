import {createSlice} from '@reduxjs/toolkit';
import {loginAction} from '../api-actions/api-actions';
import {NameSpace} from '../namespace';
import {AuthorizationStatus} from "../../const/authorization-status";

type AuthData = {
    authorizationStatus: AuthorizationStatus;
    token: string;
    role: string;
}

const initialState: AuthData = {
    authorizationStatus: AuthorizationStatus.Unknown,
    token: '',
    role: '',
};

export const authData = createSlice({
    name: NameSpace.Account,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginAction.fulfilled, (state, value) => {
                state.authorizationStatus = AuthorizationStatus.Auth;
            })
            .addCase(loginAction.rejected, (state) => {
                state.authorizationStatus = AuthorizationStatus.NoAuth;
            })
    }
});
