import {State} from '../../types/state/state';
import {NameSpace} from '../namespace';

export const getLogs = (state: State) => state[NameSpace.Logs].logs;
