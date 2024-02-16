import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../namespace';
import {Measurement} from "../../types/measurement/measurement";
import {fetchMeasurementsAction} from "../api-actions/measurements-actions/measurement-actions";

type MeasurementsState = {
    measurements: Measurement[];
    isLoaded: boolean;
}

const initialState: MeasurementsState = {
    measurements: [],
    isLoaded: false,
};

export const measurements = createSlice({
    name: NameSpace.Measurements,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMeasurementsAction.pending, (state) => {
                state.isLoaded = false;
            })
            .addCase(fetchMeasurementsAction.fulfilled, (state, value) => {
                state.isLoaded = true;
                state.measurements = value.payload;
            })
            .addCase(fetchMeasurementsAction.rejected, (state) => {
                state.isLoaded = false;
            });
    }
});
