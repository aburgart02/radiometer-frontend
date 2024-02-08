import {AxiosInstance} from 'axios';
import { jwtDecode } from 'jwt-decode'
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../../types/state/state.js';
import {
    redirectToRoute,
} from './redirect-to-route';
import {saveToken} from '../../api/token';
import {ApiRoutes} from '../../api/api-routes';
import {AppRoutes} from "../../const/app-routes";
import {Credentials} from "../../types/credentials/credentials";
import {Auth} from "../../types/auth/auth";
import {Device} from "../../types/device/device";
import {Patient} from "../../types/patient/patient";


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
        const decodedToken: any = jwtDecode(token);
        dispatch(fetchDevicesAction());
        dispatch(fetchPatientsAction());
        dispatch(redirectToRoute(AppRoutes.Main));
        return {
            userId: data['value']['userId'],
            login: decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
            role: decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
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