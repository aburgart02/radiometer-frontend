import {User} from "../types/user/user";
import {Patient} from "../types/patient/patient";

export const getFullName = (person: User | Patient) => {
    return `${person.Surname} ${person.Name} ${person.Patronymic ? person.Patronymic : ''}`;
}