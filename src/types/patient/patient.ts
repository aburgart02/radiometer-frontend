export type Patient = {
    Id: number;
    Name: string;
    Surname: string;
    Patronymic: string | undefined;
    BirthDate: string;
    Sex: number | undefined;
    Notes: string | undefined;
};
