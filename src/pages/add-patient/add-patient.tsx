import './add-patient.css'
import '../../common-styles/action-button.css'
import React, {ReactElement, useRef} from "react";
import {useAppDispatch} from "../../hooks/hooks";
import {postPatientAction} from "../../store/api-actions/api-actions";
import browserHistory from "../../components/history-route/browser-history";


function AddPatient(): ReactElement {
    const nameRef = useRef<HTMLInputElement | null>(null);
    const surnameRef = useRef<HTMLInputElement | null>(null);
    const patronymicRef = useRef<HTMLInputElement | null>(null);
    const birthDateRef = useRef<HTMLInputElement | null>(null);
    const maleRef = useRef<HTMLInputElement | null>(null);
    const femaleRef = useRef<HTMLInputElement | null>(null);
    const notesRef = useRef<HTMLTextAreaElement | null>(null);

    const dispatch = useAppDispatch();

    const handleSubmit = () => {
        if (nameRef.current !== null && surnameRef.current !== null
            && birthDateRef.current !== null && nameRef.current.value !== ''
            && surnameRef.current.value !== '' && birthDateRef.current.value !== '')
        {
            dispatch(postPatientAction({
                Name: nameRef.current.value,
                Surname: surnameRef.current?.value,
                Patronymic: patronymicRef.current?.value,
                BirthDate: birthDateRef.current?.value,
                Sex: !(maleRef.current?.checked || femaleRef.current?.checked)
                    ? undefined
                    : maleRef.current?.checked
                        ? 0 : 1,
                Notes: notesRef.current?.value
            }));
        }
    };

    return (
        <>
            <div className="add-patient-container">
                <h2>Пациент</h2>
                <p>
                    <label htmlFor="id">ID: id</label>
                </p>

                <form>
                    <label htmlFor="name">Имя</label>
                    <input ref={nameRef} type="text" id="name" name="name" className="input-field"/>

                    <label htmlFor="surname">Фамилия</label>
                    <input ref={surnameRef} type="text" id="surname" name="surname" className="input-field"/>

                    <label htmlFor="patronymic">Отчество</label>
                    <input ref={patronymicRef} type="text" id="patronymic" name="patronymic" className="input-field"/>

                    <label htmlFor="birthdate">Дата рождения</label>
                    <input ref={birthDateRef} type="date" id="birthdate" name="birthdate" className="date-picker"/>

                    <div className="radio-list">
                        <div>Пол</div>
                        <label htmlFor="male">Мужской</label>
                        <input ref={maleRef} type="radio" id="male" name="gender"/>
                        <label htmlFor="female">Женский</label>
                        <input ref={femaleRef} type="radio" id="female" name="gender"/>
                    </div>

                    <label htmlFor="notes" className="label">Заметки</label>
                    <textarea ref={notesRef} id="notes" name="notes" className="textarea-field"/>
                </form>
            </div>
            <button onClick={handleSubmit} className="action-button">Добавить</button>
            <button type="button" className="action-button" onClick={() => {
                browserHistory.back();
            }}
            >Вернуться
            </button>
        </>
    );
}

export default AddPatient;
