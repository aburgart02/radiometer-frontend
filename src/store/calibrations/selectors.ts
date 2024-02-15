import {State} from '../../types/state/state';
import {NameSpace} from '../namespace';

export const getCalibrations = (state: State) => state[NameSpace.Calibrations].calibrations;
