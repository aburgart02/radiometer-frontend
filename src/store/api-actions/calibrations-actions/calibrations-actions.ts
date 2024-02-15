import {createAsyncThunk} from "@reduxjs/toolkit";
import {Calibration} from "../../../types/calibration/calibration";
import {AppDispatch, State} from "../../../types/state/state";
import {AxiosInstance} from "axios";
import {ApiRoutes} from "../../../api/api-routes";

export const fetchCalibrationsAction = createAsyncThunk<Calibration[], undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'calibrations/fetchCalibrations',
    async (_arg, {extra: api}) => {
        const {data} = await api.get<Calibration[]>(ApiRoutes.Calibrations);
        return data;
    },
);