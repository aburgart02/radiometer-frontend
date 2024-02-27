import '../../../common-styles/form.css'
import '../../../common-styles/action-button.css'
import React, {ReactElement, useRef} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import browserHistory from "../../../components/history-route/browser-history";
import {Roles} from "../../../const/roles";
import {postUserAction} from "../../../store/api-actions/users-action/users-actions";
import {getLocale} from "../../../store/data/selectors";
import {showFormError} from "../../../utils/show_form_error";
import {FormattedMessage} from "react-intl";


function AddUser(): ReactElement {
    const loginRef = useRef<HTMLInputElement | null>(null);
    const nameRef = useRef<HTMLInputElement | null>(null);
    const surnameRef = useRef<HTMLInputElement | null>(null);
    const patronymicRef = useRef<HTMLInputElement | null>(null);
    const birthDateRef = useRef<HTMLInputElement | null>(null);
    const maleRef = useRef<HTMLInputElement | null>(null);
    const femaleRef = useRef<HTMLInputElement | null>(null);
    const researcherRef = useRef<HTMLInputElement | null>(null);
    const adminRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const notesRef = useRef<HTMLTextAreaElement | null>(null);

    const locale = useAppSelector(getLocale);
    const dispatch = useAppDispatch();

    const handleSubmit = () => {
        if (loginRef.current !== null && nameRef.current !== null && surnameRef.current !== null
            && researcherRef.current != null && adminRef.current != null && passwordRef.current !== null
            && loginRef.current.value !== '' && nameRef.current.value !== ''
            && surnameRef.current.value !== '' && passwordRef.current.value !== ''
            && (researcherRef.current.checked || adminRef.current.checked))
        {
            dispatch(postUserAction({
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
                Password: passwordRef.current.value,
                Notes: notesRef.current?.value
            }));
        }
        else {
            showFormError(locale);
        }
    };

    return (
        <>
            <div className="form-container">
                <h2><FormattedMessage id="user_adding"/></h2>
                <br/>
                <form>
                    <label htmlFor="login"><FormattedMessage id="login"/></label>
                    <input ref={loginRef} type="text" id="login" name="login" className="input-field"/>

                    <label htmlFor="name"><FormattedMessage id="name"/></label>
                    <input ref={nameRef} type="text" id="name" name="name" className="input-field"/>

                    <label htmlFor="surname"><FormattedMessage id="surname"/></label>
                    <input ref={surnameRef} type="text" id="surname" name="surname" className="input-field"/>

                    <label htmlFor="patronymic"><FormattedMessage id="patronymic"/></label>
                    <input ref={patronymicRef} type="text" id="patronymic" name="patronymic" className="input-field"/>

                    <label htmlFor="birthdate"><FormattedMessage id="birthdate"/></label>
                    <input ref={birthDateRef} type="date" id="birthdate" name="birthdate" className="date-picker"/>

                    <div className="radio-list">
                        <div><FormattedMessage id="sex"/></div>
                        <label htmlFor="male"><FormattedMessage id="male"/></label>
                        <input ref={maleRef} type="radio" id="male" name="sex"/>
                        <label htmlFor="female"><FormattedMessage id="female"/></label>
                        <input ref={femaleRef} type="radio" id="female" name="sex"/>
                    </div>

                    <div className="radio-list">
                        <div><FormattedMessage id="role"/></div>
                        <label htmlFor="researcher"><FormattedMessage id="researcher"/></label>
                        <input ref={researcherRef} type="radio" id="researcher" name="role"/>
                        <label htmlFor="admin"><FormattedMessage id="admin"/></label>
                        <input ref={adminRef} type="radio" id="admin" name="role"/>
                    </div>

                    <label htmlFor="password"><FormattedMessage id="password"/></label>
                    <input ref={passwordRef} type="text" id="password" name="password" className="input-field"/>

                    <label htmlFor="notes" className="label"><FormattedMessage id="notes"/></label>
                    <textarea ref={notesRef} id="notes" name="notes" className="textarea-field"/>
                </form>
            </div>
            <button onClick={handleSubmit} className="action-button"><FormattedMessage id="add"/></button>
            <button type="button" className="action-button" onClick={() => {
                browserHistory.back();
            }}
            ><FormattedMessage id="go_back"/>
            </button>
        </>
    );
}

export default AddUser;
