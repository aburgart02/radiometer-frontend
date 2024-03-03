import axios, {AxiosError, AxiosInstance, AxiosRequestConfig} from 'axios';
import {getToken} from './token';
import {toast} from 'react-toastify';
import {LOCALES} from "../lang/locales";
import browserHistory from "../components/history-route/browser-history";

type ErrorMessage = {
    errorType: string;
    message: string;
    details: { property: string } & { value: string } & { messages: string[] }[];
}

const ErrorTypes = {
    ECONNREFUSED: 0,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
    CONFLICT: 409,
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
                const locale = localStorage.getItem('LOCALE') || LOCALES.RUSSIAN;
                if (locale === LOCALES.RUSSIAN) {
                    if (error.response.status === ErrorTypes.UNAUTHORIZED) {
                        toast.error(`Ошибка ${ErrorTypes.UNAUTHORIZED}. Не удалось пройти авторизацию`);
                    }
                    if (error.response.status === ErrorTypes.BAD_REQUEST) {
                        toast.error(`Ошибка ${ErrorTypes.BAD_REQUEST}. Сущность уже существует`);
                    }
                    if (error.response.status === ErrorTypes.NOT_FOUND) {
                        browserHistory.back();
                        toast.error(`Ошибка ${ErrorTypes.NOT_FOUND}. Сущность не существует`);
                    }
                    if (error.response.status === ErrorTypes.ECONNREFUSED) {
                        toast.error('Не удалось установить соединение с сервером');
                    }
                    if (error.response.status === ErrorTypes.CONFLICT) {
                        toast.error(`Ошибка ${ErrorTypes.CONFLICT}. Сущность имеет зависимые записи`);
                    }
                }
                if (locale === LOCALES.ENGLISH) {
                    if (error.response.status === ErrorTypes.UNAUTHORIZED) {
                        toast.error(`Error ${ErrorTypes.UNAUTHORIZED}. Authorization failed`);
                    }
                    if (error.response.status === ErrorTypes.BAD_REQUEST) {
                        toast.error(`Error ${ErrorTypes.BAD_REQUEST}. Entity already exist`);
                    }
                    if (error.response.status === ErrorTypes.NOT_FOUND) {
                        browserHistory.back();
                        toast.error(`Error ${ErrorTypes.NOT_FOUND}. Entity doesn't exist`);
                    }
                    if (error.response.status === ErrorTypes.ECONNREFUSED) {
                        toast.error('The connection to the server could not be established');
                    }
                    if (error.response.status === ErrorTypes.CONFLICT) {
                        toast.error(`Error ${ErrorTypes.CONFLICT}. Entity has dependent records`);
                    }
                }
            }
        }
    );

    return api;
};
