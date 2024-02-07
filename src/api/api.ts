import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {getToken} from './token';
import {StatusCodes} from 'http-status-codes';
import {toast} from 'react-toastify';

type ErrorMessage = {
    errorType: string;
    message: string;
    details: { property: string } & { value: string } & { messages: string[] }[];
}

const StatusCodeMapping: Record<number, boolean> = {
    [StatusCodes.BAD_REQUEST]: true,
    [StatusCodes.UNAUTHORIZED]: true,
    [StatusCodes.NOT_FOUND]: true
} as const;

const shouldDisplayError = (response: AxiosResponse) => StatusCodeMapping[response.status];

const BACKEND_URL = 'https://localhost:7209/';
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
            if (error.response && shouldDisplayError(error.response)) {
                const errorMessage : ErrorMessage = error.response.data;

                if (errorMessage.errorType === 'VALIDATION_ERROR') {
                    toast.error(errorMessage.details[0].messages[0]);
                } else if (errorMessage.errorType !== 'COMMON_ERROR') {
                    toast.warn(errorMessage.message);
                }
            }

            throw error;
        }
    );

    return api;
};
