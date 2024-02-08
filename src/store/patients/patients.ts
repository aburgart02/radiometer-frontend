import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../namespace';
import {Patient} from "../../types/patient/patient";
import {fetchPatientsAction} from "../api-actions/api-actions";

type PatientsState = {
    patients: Patient[];
    isLoaded: boolean;
}

const initialState: PatientsState = {
    patients: [],
    isLoaded: false,
};

export const patients = createSlice({
    name: NameSpace.Devices,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPatientsAction.pending, (state) => {
                state.isLoaded = false;
            })
            .addCase(fetchPatientsAction.fulfilled, (state, value) => {
                state.isLoaded = true;
                state.patients = value.payload;
            })
            .addCase(fetchPatientsAction.rejected, (state) => {
                state.isLoaded = false;
            });
    }
});
