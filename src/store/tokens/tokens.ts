import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../namespace';
import {Token} from "../../types/token/token";
import {fetchTokensAction} from "../api-actions/tokens-actions/tokens-actions";

type TokensState = {
    tokens: Token[];
    isLoaded: boolean;
}

const initialState: TokensState = {
    tokens: [],
    isLoaded: false,
};

export const tokens = createSlice({
    name: NameSpace.Tokens,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTokensAction.pending, (state) => {
                state.isLoaded = false;
            })
            .addCase(fetchTokensAction.fulfilled, (state, value) => {
                state.isLoaded = true;
                state.tokens = value.payload;
            })
            .addCase(fetchTokensAction.rejected, (state) => {
                state.isLoaded = false;
            });
    }
});
