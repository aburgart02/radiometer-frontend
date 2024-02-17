export type Measurement = {
    Id: number;
    Time: string;
    Description: string | undefined;
    UserId: number;
    PatientId: number;
    DeviceId: number;
    Data: string;
};