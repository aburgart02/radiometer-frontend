import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace} from '../namespace';

type DataState = {
    deviceId: number | undefined;
    patientId: number | undefined;
    userId: number | undefined;
}

const initialState: DataState = {
    deviceId: undefined,
    patientId: undefined,
    userId: undefined
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
    },
});

export const {setDeviceId, setPatientId, setUserId} = data.actions;