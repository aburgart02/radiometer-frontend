export type User = {
    Id: number;
    Name: string;
    Surname: string;
    Patronymic: string | undefined;
    BirthDate: string | undefined;
    Sex: number | undefined;
    Notes: string | undefined;
    Login: string;
    Role: string;
    Revoked: boolean;
};
