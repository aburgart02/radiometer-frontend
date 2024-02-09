import {createSlice} from '@reduxjs/toolkit';
import {checkAuthAction, loginAction} from '../api-actions/api-actions';
import {NameSpace} from '../namespace';
import {AuthorizationStatus} from "../../const/authorization-status";
import {dropToken} from "../../api/token";

type AuthDataState = {
    authorizationStatus: AuthorizationStatus;
    userId: number | undefined;
    login: string | undefined;
    role: string | undefined;
}

const initialState: AuthDataState = {
    authorizationStatus: AuthorizationStatus.Unknown,
    userId: undefined,
    login: undefined,
    role: undefined,
};

export const authData = createSlice({
    name: NameSpace.AuthData,
    initialState,
    reducers: {
        logout: (state) => {
            dropToken();
            state.authorizationStatus = AuthorizationStatus.NoAuth;
            state.userId = undefined;
            state.login = undefined;
            state.role = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkAuthAction.fulfilled, (state) => {
                state.authorizationStatus = AuthorizationStatus.Auth;
            })
            .addCase(checkAuthAction.rejected, (state) => {
                state.authorizationStatus = AuthorizationStatus.NoAuth;
            })
            .addCase(loginAction.fulfilled, (state, value) => {
                state.authorizationStatus = AuthorizationStatus.Auth;
                state.userId = value.payload.userId;
                state.login = value.payload.login;
                state.role = value.payload.role;
            })
            .addCase(loginAction.rejected, (state) => {
                state.authorizationStatus = AuthorizationStatus.NoAuth;
            })
    }
});

export const {logout} = authData.actions;