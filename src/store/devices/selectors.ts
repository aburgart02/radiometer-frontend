import {State} from '../../types/state/state';
import {NameSpace} from '../namespace';

export const getDevices = (state: State) => state[NameSpace.Devices].devices;
