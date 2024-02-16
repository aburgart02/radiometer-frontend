import {State} from '../../types/state/state';
import {NameSpace} from '../namespace';

export const getMeasurements = (state: State) => state[NameSpace.Measurements].measurements;
