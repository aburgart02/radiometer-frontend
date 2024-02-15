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

export const postCalibrationAction = createAsyncThunk<void, Omit<Calibration, 'Id' | 'Date'>, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'calibrations/postCalibration',
    async (calibration, {dispatch, extra: api}) => {
        const formData = new FormData();
        formData.append('file', calibration.Data);
        formData.append('name', calibration.Name)
        formData.append('description', calibration.Description ? calibration.Description : '');
        formData.append('deviceId', calibration.DeviceId.toString());
        formData.append('date', new Date().toISOString())
        await api.post<object>(ApiRoutes.AddCalibration, formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
            }});
        dispatch(fetchCalibrationsAction());
    },
);