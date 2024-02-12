export type Token = {
    Id: number;
    Token: string;
    EmissionDate: string;
    ExpirationDate: string | undefined;
    Revoked: boolean;
    Description: string | undefined;
};
