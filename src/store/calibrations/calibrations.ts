import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../namespace';
import {fetchCalibrationsAction} from "../api-actions/api-actions";
import {Calibration} from "../../types/calibration/calibration";

type CalibrationsState = {
    calibrations: Calibration[];
    isLoaded: boolean;
}

const initialState: CalibrationsState = {
    calibrations: [],
    isLoaded: false,
};

export const calibrations = createSlice({
    name: NameSpace.Calibrations,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCalibrationsAction.pending, (state) => {
                state.isLoaded = false;
            })
            .addCase(fetchCalibrationsAction.fulfilled, (state, value) => {
                state.isLoaded = true;
                state.calibrations = value.payload;
            })
            .addCase(fetchCalibrationsAction.rejected, (state) => {
                state.isLoaded = false;
            });
    }
});
