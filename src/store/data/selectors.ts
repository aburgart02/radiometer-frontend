import {State} from "../../types/state/state";
import {NameSpace} from "../namespace";

export const getDeviceId = (state: State) => state[NameSpace.Data].deviceId;

export const getPatientId = (state: State) => state[NameSpace.Data].patientId;

export const getUserId = (state: State) => state[NameSpace.Data].userId;

export const getLocale = (state: State) => state[NameSpace.Data].locale;