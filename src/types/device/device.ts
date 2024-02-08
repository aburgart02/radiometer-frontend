import {Measurement} from "../measurement/measurement";
import {Calibration} from "../calibration/calibration";

export type Device = {
    Id: number;
    Name: string;
    Description: string | undefined;
    Measurements: Measurement[];
    CalibrationDatas: Calibration[];
};
