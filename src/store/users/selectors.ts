import {State} from '../../types/state/state';
import {NameSpace} from '../namespace';

export const getUsers = (state: State) => state[NameSpace.Users].users;
