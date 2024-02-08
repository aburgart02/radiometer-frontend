import {State} from '../../types/state/state';
import {NameSpace} from '../namespace';

export const getAuthorizationStatus = (state: State) => state[NameSpace.AuthData].authorizationStatus;

export const getUserId = (state: State) => state[NameSpace.AuthData].userId;

export const getLogin = (state: State) => state[NameSpace.AuthData].login;

export const getRole = (state: State) => state[NameSpace.AuthData].role;