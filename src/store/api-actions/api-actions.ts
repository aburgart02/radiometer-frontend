import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../../types/state/state.js';
import {
    redirectToRoute,
} from './redirect-to-route';
import {getToken, saveToken} from '../../api/token';
import {ApiRoutes} from '../../api/api-routes';
import {AppRoutes} from "../../const/app-routes";
import {Credentials} from "../../types/credentials/credentials";
import {Auth} from "../../types/auth/auth";
import {Device} from "../../types/device/device";
import {Patient} from "../../types/patient/patient";
import {Log} from "../../types/log/log";
import {Roles} from "../../const/roles";
import {decodeToken} from "../../utils/decode-token";

export const checkAuthAction = createAsyncThunk<Auth, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'authData/checkAuth',
    async (_arg, {dispatch, extra: api}) => {
        const token = getToken();
        const decodedToken = decodeToken(token);
        await api.get(ApiRoutes.CheckAuth);
        dispatch(fetchDevicesAction());
        dispatch(fetchPatientsAction());
        if (decodedToken.role === Roles.Admin)
            dispatch(fetchLogsAction());
        return {
            login: decodedToken.login,
            role: decodedToken.role
        };
    },
);

export const loginAction = createAsyncThunk<Auth, Credentials, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'authData/login',
    async ({login: userLogin, password}, {dispatch, extra: api}) => {
        const authData = {
            login: userLogin,
            password: password
        }
        const {data}: any = await api.post<object>(ApiRoutes.Login, authData);
        const token = data['value']['access_token'];
        saveToken(token);
        const decodedToken = decodeToken(token);
        dispatch(fetchDevicesAction());
        dispatch(fetchPatientsAction());
        if (decodedToken.role === Roles.Admin)
            dispatch(fetchLogsAction());
        dispatch(redirectToRoute(AppRoutes.Main));
        return {
            login: decodedToken.login,
            role: decodedToken.role
        };
    },
);

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

export const fetchPatientsAction = createAsyncThunk<Patient[], undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'patients/fetchPatients',
    async (_arg, {extra: api}) => {
        const {data} = await api.get<Patient[]>(ApiRoutes.Patients);
        return data;
    },
);

export const postPatientAction = createAsyncThunk<void, Omit<Patient, 'Id'>, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'patients/postPatient',
    async (patient, {dispatch, extra: api}) => {
        await api.post<Patient>(ApiRoutes.AddPatient, patient);
        dispatch(fetchPatientsAction());
    },
);

export const updatePatientAction = createAsyncThunk<void, Patient, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'patients/updatePatient',
    async (patient, {dispatch, extra: api}) => {
        await api.put<Patient>(ApiRoutes.UpdatePatient, patient);
        dispatch(fetchPatientsAction());
    },
);

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