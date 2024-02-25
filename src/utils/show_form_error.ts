import {toast} from "react-toastify";
import {LOCALES} from "../lang/locales";

export const showFormError = (locale: string) => {
    if (locale === LOCALES.ENGLISH)
        toast.error('Form is filled out incorrectly')
    if (locale === LOCALES.RUSSIAN)
        toast.error('Форма заполнена неверно');
    return '';
}