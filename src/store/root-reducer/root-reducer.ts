import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../namespace';
import {authData} from "../auth-data/auth-data";
import {devices} from "../devices/devices";
import {patients} from "../patients/patients";
import {logs} from "../logs/logs";
import {tokens} from "../tokens/tokens";
import {users} from "../users/users";
import {calibrations} from "../calibrations/calibrations";
import {measurements} from "../measurements/measurements";

export const rootReducer = combineReducers({
    [NameSpace.AuthData]: authData.reducer,
    [NameSpace.Measurements]: measurements.reducer,
    [NameSpace.Devices]: devices.reducer,
    [NameSpace.Calibrations]: calibrations.reducer,
    [NameSpace.Patients]: patients.reducer,
    [NameSpace.Users]: users.reducer,
    [NameSpace.Logs]: logs.reducer,
    [NameSpace.Tokens]: tokens.reducer
});
