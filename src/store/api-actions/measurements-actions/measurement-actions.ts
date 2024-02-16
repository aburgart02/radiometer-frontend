import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppDispatch, State} from "../../../types/state/state";
import {AxiosInstance} from "axios";
import {ApiRoutes} from "../../../api/api-routes";
import {Measurement} from "../../../types/measurement/measurement";

export const fetchMeasurementsAction = createAsyncThunk<Measurement[], undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'measurements/fetchMeasurements',
    async (_arg, {extra: api}) => {
        const {data} = await api.get<Measurement[]>(ApiRoutes.Measurements);
        return data;
    },
);