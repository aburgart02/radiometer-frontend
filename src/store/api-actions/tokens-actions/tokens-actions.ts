import {createAsyncThunk} from "@reduxjs/toolkit";
import {Token} from "../../../types/token/token";
import {AppDispatch, State} from "../../../types/state/state";
import {AxiosInstance} from "axios";
import {ApiRoutes} from "../../../api/api-routes";

export const fetchTokensAction = createAsyncThunk<Token[], undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'tokens/fetchTokens',
    async (_arg, {extra: api}) => {
        const {data} = await api.get<Token[]>(ApiRoutes.Tokens);
        return data;
    },
);

export const postTokenAction = createAsyncThunk<void, Omit<Token, 'Id' | 'Token' | 'EmissionDate' | 'Revoked'>, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'tokens/postToken',
    async (token, {dispatch, extra: api}) => {
        await api.post<Token>(ApiRoutes.AddToken, token);
        dispatch(fetchTokensAction());
    },
);

export const updateTokenAction = createAsyncThunk<void, Token, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'tokens/updateToken',
    async (token, {dispatch, extra: api}) => {
        await api.put<Token>(ApiRoutes.UpdateToken, token);
        dispatch(fetchTokensAction());
    },
);

export const deleteTokenAction = createAsyncThunk<void, number, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'tokens/deleteToken',
    async (tokenId, {dispatch, extra: api}) => {
        await api.post<Token>(ApiRoutes.DeleteToken, {Id: tokenId});
        dispatch(fetchTokensAction());
    },
);