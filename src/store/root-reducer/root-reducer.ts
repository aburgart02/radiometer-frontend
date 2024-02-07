import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../namespace';
import {authData} from "../auth-data/auth-data";

export const rootReducer = combineReducers({
    [NameSpace.Account]: authData.reducer,
});
