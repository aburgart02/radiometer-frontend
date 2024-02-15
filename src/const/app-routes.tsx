export const AppRoutes = {
    Main: '/',
    SignIn: '/login',
    Devices: '/devices',
    Device: (id: number | string) => `/devices/${id}`,
    AddDevice: '/add-device',
    EditDevice: (id: number | string) => `/devices/edit/${id}`,
    AddCalibration: (id: number | string) => `/calibrations/add/${id}`,
    Patients: '/patients',
    Patient: (id: number | string) => `/patients/${id}`,
    AddPatient: '/add-patient',
    EditPatient: (id: number | string) => `/patients/edit/${id}`,
    Measurements: '/measurements',
    Users: '/users',
    User: (id: number | string) => `/users/${id}`,
    AddUser: '/add-user',
    EditUser: (id: number | string) => `/users/edit/${id}`,
    Logs: '/logs',
    Log: (id: string) => `/logs/${id}`,
    Tokens: '/tokens',
    Token: (id: number | string) => `/tokens/${id}`,
    AddToken: '/add-token',
    EditToken: (id: number | string) => `/tokens/edit/${id}`,
    NotFound: '*'
} as const;
