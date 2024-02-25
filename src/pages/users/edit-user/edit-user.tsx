import '../../../common-styles/form.css'
import '../../../common-styles/action-button.css'
import './edit-user.css'
import React, {ReactElement, useRef} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import browserHistory from "../../../components/history-route/browser-history";
import {useParams} from "react-router-dom";
import {formatDate} from "../../../utils/format-date";
import {getUsers} from "../../../store/users/selectors";
import {Roles} from "../../../const/roles";
import {
    deleteUserAction,
    updateUserAction,
    updateUserPasswordAction
} from "../../../store/api-actions/users-action/users-actions";
import {getLocale} from "../../../store/data/selectors";
import {showFormError} from "../../../utils/show_form_error";


function EditUser(): ReactElement {
    const params = useParams();
    const userId = Number(params.id);
    const users = useAppSelector(getUsers);
    const user = users.filter((user) => user.Id === userId)[0];

    const loginRef = useRef<HTMLInputElement | null>(null);
    const nameRef = useRef<HTMLInputElement | null>(null);
    const surnameRef = useRef<HTMLInputElement | null>(null);
    const patronymicRef = useRef<HTMLInputElement | null>(null);
    const birthDateRef = useRef<HTMLInputElement | null>(null);
    const maleRef = useRef<HTMLInputElement | null>(null);
    const femaleRef = useRef<HTMLInputElement | null>(null);
    const researcherRef = useRef<HTMLInputElement | null>(null);
    const adminRef = useRef<HTMLInputElement | null>(null);
    const revokedRef = useRef<HTMLInputElement | null>(null);
    const notesRef = useRef<HTMLTextAreaElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);

    const locale = useAppSelector(getLocale);
    const dispatch = useAppDispatch();

    const handleSubmit = () => {
        if (loginRef.current !== null && nameRef.current !== null && surnameRef.current !== null
            && researcherRef.current != null && adminRef.current != null && revokedRef.current != null
            && loginRef.current.value !== '' && nameRef.current.value !== ''
            && surnameRef.current.value !== '' && revokedRef.current.value !== ''
            && (researcherRef.current.checked || adminRef.current.checked))
        {
            dispatch(updateUserAction({
                Id: userId,
                Login: loginRef.current.value,
                Name: nameRef.current.value,
                Surname: surnameRef.current.value,
                Patronymic: patronymicRef.current?.value,
                BirthDate: birthDateRef.current?.value,
                Sex: !(maleRef.current?.checked || femaleRef.current?.checked)
                    ? undefined
                    : maleRef.current?.checked
                        ? 0 : 1,
                Role: researcherRef.current.checked
                    ? Roles.Researcher : Roles.Admin,
                Revoked: revokedRef.current.checked,
                Notes: notesRef.current?.value
            }));
        }
        else {
            showFormError(locale);
        }
    };

    const handleDeleteSubmit = () => {
        dispatch(deleteUserAction(userId));
    };

    const handleUpdatePasswordSubmit = () => {
        if (passwordRef.current !== null && passwordRef.current.value !== '')
        {
            dispatch(updateUserPasswordAction({
                Id: userId,
                Password: passwordRef.current.value
            }));
        }
    };

    return (
        <>
            <div className="form-container">
                <h2>Редактирование пользователя</h2>
                <p>
                    <span>Id: </span>{user.Id}
                </p>

                <form>
                    <label htmlFor="login">Логин</label>
                    <input defaultValue={user.Login} ref={loginRef} type="text" id="login" name="login" className="input-field"/>

                    <label htmlFor="name">Имя</label>
                    <input defaultValue={user.Name} ref={nameRef} type="text" id="name" name="name" className="input-field"/>

                    <label htmlFor="surname">Фамилия</label>
                    <input defaultValue={user.Surname} ref={surnameRef} type="text" id="surname" name="surname" className="input-field"/>

                    <label htmlFor="patronymic">Отчество</label>
                    <input defaultValue={user.Patronymic} ref={patronymicRef} type="text" id="patronymic" name="patronymic" className="input-field"/>

                    <label htmlFor="birthdate">Дата рождения</label>
                    <input defaultValue={user.BirthDate && formatDate(user.BirthDate)} ref={birthDateRef} type="date" id="birthdate" name="birthdate" className="date-picker"/>

                    <div className="radio-list">
                        <div>Пол</div>
                        <label htmlFor="male">Мужской</label>
                        <input defaultChecked={user.Sex === 0} ref={maleRef} type="radio" id="male" name="sex"/>
                        <label htmlFor="female">Женский</label>
                        <input defaultChecked={user.Sex === 1} ref={femaleRef} type="radio" id="female" name="sex"/>
                    </div>

                    <div className="radio-list">
                        <div>Роль</div>
                        <label htmlFor="researcher">Исследователь</label>
                        <input defaultChecked={user.Role === Roles.Researcher} ref={researcherRef} type="radio" id="researcher" name="role"/>
                        <label htmlFor="admin">Админ</label>
                        <input defaultChecked={user.Role === Roles.Admin} ref={adminRef} type="radio" id="admin" name="role"/>
                    </div>

                    <div className="checkbox-list">
                        <label htmlFor="revoked">Заблокирован</label>
                        <input defaultChecked={user.Revoked} ref={revokedRef} type="checkbox" id="revoked" name="revoked"/>
                    </div>

                    <label htmlFor="notes" className="label">Заметки</label>
                    <textarea defaultValue={user.Notes} ref={notesRef} id="notes" name="notes" className="textarea-field"/>
                </form>
            </div>
            <button onClick={handleSubmit} className="action-button">Сохранить</button>
            <div className="password-container">
                <button onClick={handleUpdatePasswordSubmit} className="action-button">Обновить пароль</button>
                <label htmlFor="password">Пароль</label>
                <input ref={passwordRef} type="text" id="password" name="password" className="password-input-field"/>
            </div>
            <button onClick={() => {
                handleDeleteSubmit();
                browserHistory.back();
            }} className="action-button">Удалить
            </button>
            <button type="button" className="action-button" onClick={() => {
                browserHistory.back();
            }}
            >Вернуться
            </button>
        </>
    );
}

export default EditUser;
