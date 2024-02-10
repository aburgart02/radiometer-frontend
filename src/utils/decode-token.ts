import {jwtDecode} from "jwt-decode";

export const decodeToken = (token: any) => {
    const decodedToken: any = jwtDecode(token);

    return {
        login: decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
        role: decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    };
}