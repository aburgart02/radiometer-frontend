import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../namespace';
import {Calibration} from "../../types/calibration/calibration";
import {fetchCalibrationsAction} from "../api-actions/calibrations-actions/calibrations-actions";

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
