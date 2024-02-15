import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../../../types/state/state.js';
import {
    redirectToRoute,
} from '../redirect-to-route';
import {getToken, saveToken} from '../../../api/token';
import {ApiRoutes} from '../../../api/api-routes';
import {AppRoutes} from "../../../const/app-routes";
import {Credentials} from "../../../types/credentials/credentials";
import {Auth} from "../../../types/auth/auth";
import {Roles} from "../../../const/roles";
import {decodeToken} from "../../../utils/decode-token";
import {fetchDevicesAction} from "../devices-actions/devices-actions";
import {fetchCalibrationsAction} from "../calibrations-actions/calibrations-actions";
import {fetchPatientsAction} from "../patients-action/patients-actions";
import {fetchUsersAction} from "../users-action/users-actions";
import {fetchLogsAction} from "../logs-actions/logs-actions";
import {fetchTokensAction} from "../tokens-actions/tokens-actions";

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