import {createAsyncThunk} from "@reduxjs/toolkit";
import {Patient} from "../../../types/patient/patient";
import {AppDispatch, State} from "../../../types/state/state";
import {AxiosInstance} from "axios";
import {ApiRoutes} from "../../../api/api-routes";

export const fetchPatientsAction = createAsyncThunk<Patient[], undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'patients/fetchPatients',
    async (_arg, {extra: api}) => {
        const {data} = await api.get<Patient[]>(ApiRoutes.Patients);
        return data;
    },
);

export const postPatientAction = createAsyncThunk<void, Omit<Patient, 'Id'>, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'patients/postPatient',
    async (patient, {dispatch, extra: api}) => {
        await api.post<Patient>(ApiRoutes.AddPatient, patient);
        dispatch(fetchPatientsAction());
    },
);

export const updatePatientAction = createAsyncThunk<void, Patient, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'patients/updatePatient',
    async (patient, {dispatch, extra: api}) => {
        await api.put<Patient>(ApiRoutes.UpdatePatient, patient);
        dispatch(fetchPatientsAction());
    },
);

export const deletePatientAction = createAsyncThunk<void, number, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'patients/deletePatient',
    async (patientId, {dispatch, extra: api}) => {
        await api.post<Patient>(ApiRoutes.DeletePatient, {Id: patientId});
        dispatch(fetchPatientsAction());
    },
);