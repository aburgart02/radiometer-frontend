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

export const postMeasurementAction = createAsyncThunk<void, Omit<Measurement, 'Id'>, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'measurements/postMeasurement',
    async (measurement, {dispatch, extra: api}) => {
        const formData = new FormData();
        formData.append('file', measurement.Data);
        formData.append('description', measurement.Description ? measurement.Description : '');
        formData.append('userId', measurement.UserId.toString());
        formData.append('patientId', measurement.PatientId.toString());
        formData.append('deviceId', measurement.DeviceId.toString());
        formData.append('time', measurement.Time)
        await api.post<object>(ApiRoutes.AddMeasurement, formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
            }});
        dispatch(fetchMeasurementsAction());
    },
);