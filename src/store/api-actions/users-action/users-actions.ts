import {createAsyncThunk} from "@reduxjs/toolkit";
import {User} from "../../../types/user/user";
import {AppDispatch, State} from "../../../types/state/state";
import {AxiosInstance} from "axios";
import {ApiRoutes} from "../../../api/api-routes";

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