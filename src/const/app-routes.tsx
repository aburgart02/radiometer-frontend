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
    Log: (id: number | string) => `/logs/${id}`,
    NotFound: '*'
} as const;
