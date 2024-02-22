import axios, {AxiosError, AxiosInstance, AxiosRequestConfig} from 'axios';
import {getToken} from './token';
import {toast} from 'react-toastify';

type ErrorMessage = {
    errorType: string;
    message: string;
    details: { property: string } & { value: string } & { messages: string[] }[];
}

const ErrorTypes = {
    ECONNREFUSED: 0,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
} as const;

export const BACKEND_URL = 'https://localhost:7209/';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
    const api = axios.create({
        baseURL: BACKEND_URL,
        timeout: REQUEST_TIMEOUT,
    });

    api.interceptors.request.use(
        (config: AxiosRequestConfig) => {
            const token = getToken();

            if (token && config.headers) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }

            return config;
        },
    );

    api.interceptors.response.use(
        (response) => response,
        (error: AxiosError<ErrorMessage>) => {
            if (error.response) {
                if (error.response.status === ErrorTypes.UNAUTHORIZED) {
                    toast.error('Не удалось пройти авторизацию');
                }
                if (error.response.status === ErrorTypes.BAD_REQUEST) {
                    toast.error('Отправлен неверный запрос');
                }
                if (error.response.status === ErrorTypes.ECONNREFUSED) {
                    toast.error('Не удалось установить соединение с сервером');
                }
            }
        }
    );

    return api;
};
