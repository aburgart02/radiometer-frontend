import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../namespace';
import {Log} from "../../types/log/log";
import {fetchLogsAction} from "../api-actions/logs-actions/logs-actions";

type LogsState = {
    logs: Log[];
    isLoaded: boolean;
}

const initialState: LogsState = {
    logs: [],
    isLoaded: false,
};

export const logs = createSlice({
    name: NameSpace.Logs,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogsAction.pending, (state) => {
                state.isLoaded = false;
            })
            .addCase(fetchLogsAction.fulfilled, (state, value) => {
                state.isLoaded = true;
                state.logs = value.payload;
            })
            .addCase(fetchLogsAction.rejected, (state) => {
                state.isLoaded = false;
            });
    }
});
