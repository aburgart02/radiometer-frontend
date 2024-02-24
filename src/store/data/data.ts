import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace} from '../namespace';

type DataState = {
    deviceId: number | undefined;
    patientId: number | undefined;
    userId: number | undefined;
    locale: string;
}

const initialState: DataState = {
    deviceId: undefined,
    patientId: undefined,
    userId: undefined,
    locale: 'ru-RU',
};

export const data = createSlice({
    name: NameSpace.Data,
    initialState,
    reducers: {
        setDeviceId: (state, value: PayloadAction<number>) => {
            state.deviceId = value.payload;
        },
        setPatientId: (state, value: PayloadAction<number>) => {
            state.patientId = value.payload;
        },
        setUserId: (state, value: PayloadAction<number>) => {
            state.userId = value.payload;
        },
        setLocale: (state, value: PayloadAction<string>) => {
            state.locale = value.payload;
        },
    },
});

export const {setDeviceId, setPatientId, setUserId, setLocale} = data.actions;