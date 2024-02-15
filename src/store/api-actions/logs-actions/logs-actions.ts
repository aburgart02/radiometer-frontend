import {createAsyncThunk} from "@reduxjs/toolkit";
import {Log} from "../../../types/log/log";
import {AppDispatch, State} from "../../../types/state/state";
import {AxiosInstance} from "axios";
import {ApiRoutes} from "../../../api/api-routes";

export const fetchLogsAction = createAsyncThunk<Log[], undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'logs/fetchLogs',
    async (_arg, {extra: api}) => {
        const {data} = await api.get<Log[]>(ApiRoutes.Logs);
        return data;
    },
);