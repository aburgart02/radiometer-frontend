import {Sex} from "../const/sex";

export const getSex = (sex: number | undefined) => {
    if (sex === Sex.Male)
        return 'Мужской';
    if (sex === Sex.Female)
        return 'Женский';
    return '';
}