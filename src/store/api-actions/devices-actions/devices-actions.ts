import {createAsyncThunk} from "@reduxjs/toolkit";
import {Device} from "../../../types/device/device";
import {AppDispatch, State} from "../../../types/state/state";
import {AxiosInstance} from "axios";
import {ApiRoutes} from "../../../api/api-routes";

export const fetchDevicesAction = createAsyncThunk<Device[], undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'devices/fetchDevices',
    async (_arg, {extra: api}) => {
        const {data} = await api.get<Device[]>(ApiRoutes.Devices);
        return data;
    },
);

export const postDeviceAction = createAsyncThunk<void, Omit<Device, 'Id'>, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'devices/postDevice',
    async (device, {dispatch, extra: api}) => {
        await api.post<Device>(ApiRoutes.AddDevice, device);
        dispatch(fetchDevicesAction());
    },
);

export const updateDeviceAction = createAsyncThunk<void, Device, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'devices/updateDevice',
    async (device, {dispatch, extra: api}) => {
        await api.put<Device>(ApiRoutes.UpdateDevice, device);
        dispatch(fetchDevicesAction());
    },
);

export const deleteDeviceAction = createAsyncThunk<void, number, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'devices/deleteDevice',
    async (deviceId, {dispatch, extra: api}) => {
        await api.post<Device>(ApiRoutes.DeleteDevice, {Id: deviceId});
        dispatch(fetchDevicesAction());
    },
);