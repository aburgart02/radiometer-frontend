import {State} from '../../types/state/state';
import {NameSpace} from '../namespace';

export const getTokens = (state: State) => state[NameSpace.Tokens].tokens;
