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
import {Token} from "../../types/token/token";
import {User} from "../../types/user/user";
import {Calibration} from "../../types/calibration/calibration";

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
        dispatch(fetchCalibrationsAction());
        dispatch(fetchPatientsAction());
        if (decodedToken.role === Roles.Admin) {
            dispatch(fetchUsersAction());
            dispatch(fetchLogsAction());
            dispatch(fetchTokensAction());
        }
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
        dispatch(fetchCalibrationsAction());
        dispatch(fetchPatientsAction());
        if (decodedToken.role === Roles.Admin) {
            dispatch(fetchUsersAction());
            dispatch(fetchLogsAction());
            dispatch(fetchTokensAction());
        }
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

export const deletePatientAction = createAsyncThunk<void, number, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'patients/deletePatient',
    async (patientId, {dispatch, extra: api}) => {
        await api.post<Patient>(ApiRoutes.DeletePatient, {Id: patientId});
        dispatch(fetchPatientsAction());
    },
);

export const fetchUsersAction = createAsyncThunk<User[], undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'users/fetchUsers',
    async (_arg, {extra: api}) => {
        const {data} = await api.get<User[]>(ApiRoutes.Users);
        return data;
    },
);

export const postUserAction = createAsyncThunk<void, Omit<User, 'Id' | 'Revoked'>, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'users/postUser',
    async (user, {dispatch, extra: api}) => {
        await api.post<User>(ApiRoutes.AddUser, user);
        dispatch(fetchUsersAction());
    },
);

export const updateUserAction = createAsyncThunk<void, Omit<User, 'Password'>, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'users/updateUsers',
    async (user, {dispatch, extra: api}) => {
        await api.put<User>(ApiRoutes.UpdateUser, user);
        dispatch(fetchUsersAction());
    },
);

export const updateUserPasswordAction = createAsyncThunk<void, { Id: number, Password: string } , {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'users/updateUserPassword',
    async (user, {dispatch, extra: api}) => {
        await api.post<User>(ApiRoutes.UpdateUserPassword, user);
        dispatch(fetchUsersAction());
    },
);

export const deleteUserAction = createAsyncThunk<void, number, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'users/deleteUser',
    async (userId, {dispatch, extra: api}) => {
        await api.post<User>(ApiRoutes.DeleteUser, {Id: userId});
        dispatch(fetchUsersAction());
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

export const fetchTokensAction = createAsyncThunk<Token[], undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'tokens/fetchTokens',
    async (_arg, {extra: api}) => {
        const {data} = await api.get<Token[]>(ApiRoutes.Tokens);
        return data;
    },
);

export const postTokenAction = createAsyncThunk<void, Omit<Token, 'Id' | 'Token' | 'EmissionDate' | 'Revoked'>, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'tokens/postToken',
    async (token, {dispatch, extra: api}) => {
        await api.post<Token>(ApiRoutes.AddToken, token);
        dispatch(fetchTokensAction());
    },
);

export const updateTokenAction = createAsyncThunk<void, Token, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'tokens/updateToken',
    async (token, {dispatch, extra: api}) => {
        await api.put<Token>(ApiRoutes.UpdateToken, token);
        dispatch(fetchTokensAction());
    },
);

export const deleteTokenAction = createAsyncThunk<void, number, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'tokens/deleteToken',
    async (tokenId, {dispatch, extra: api}) => {
        await api.post<Token>(ApiRoutes.DeleteToken, {Id: tokenId});
        dispatch(fetchTokensAction());
    },
);