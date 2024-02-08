import {State} from '../../types/state/state';
import {NameSpace} from '../namespace';

export const getPatients = (state: State) => state[NameSpace.Patients].patients;
