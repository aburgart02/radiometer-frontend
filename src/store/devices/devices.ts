import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../namespace';
import {Device} from "../../types/device/device";
import {fetchDevicesAction} from "../api-actions/devices-actions/devices-actions";

type DevicesState = {
    devices: Device[];
    isLoaded: boolean;
}

const initialState: DevicesState = {
    devices: [],
    isLoaded: false,
};

export const devices = createSlice({
    name: NameSpace.Devices,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDevicesAction.pending, (state) => {
                state.isLoaded = false;
            })
            .addCase(fetchDevicesAction.fulfilled, (state, value) => {
                state.isLoaded = true;
                state.devices = value.payload;
            })
            .addCase(fetchDevicesAction.rejected, (state) => {
                state.isLoaded = false;
            });
    }
});
