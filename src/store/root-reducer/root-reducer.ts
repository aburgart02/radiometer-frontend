import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../namespace';
import {authData} from "../auth-data/auth-data";
import {devices} from "../devices/devices";
import {patients} from "../patients/patients";
import {logs} from "../logs/logs";
import {tokens} from "../tokens/tokens";

export const rootReducer = combineReducers({
    [NameSpace.AuthData]: authData.reducer,
    [NameSpace.Devices]: devices.reducer,
    [NameSpace.Patients]: patients.reducer,
    [NameSpace.Logs]: logs.reducer,
    [NameSpace.Tokens]: tokens.reducer
});
