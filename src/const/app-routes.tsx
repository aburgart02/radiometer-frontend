export const AppRoutes = {
    Main: '/',
    SignIn: '/login',
    Devices: '/devices',
    Patient: (id: number | string) => `/patients/${id}`,
    Patients: '/patients',
    AddPatient: '/add-patient',
    EditPatient: (id: number | string) => `/patients/edit/${id}`,
    Measurements: '/measurements',
    Logs: '/logs',
    Log: (id: string) => `/logs/${id}`,
    Tokens: '/tokens',
    Token: (id: number | string) => `/tokens/${id}`,
    AddToken: '/add-token',
    EditToken: (id: number | string) => `/tokens/edit/${id}`,
    NotFound: '*'
} as const;
