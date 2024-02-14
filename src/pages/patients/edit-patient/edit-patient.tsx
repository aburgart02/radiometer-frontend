import '../../../common-styles/form.css'
import '../../../common-styles/action-button.css'
import React, {ReactElement, useRef} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {deletePatientAction, updatePatientAction} from "../../../store/api-actions/api-actions";
import browserHistory from "../../../components/history-route/browser-history";
import {useParams} from "react-router-dom";
import {getPatients} from "../../../store/patients/selectors";
import {formatDate} from "../../../utils/format-date";


function EditPatient(): ReactElement {
    const params = useParams();
    const patientId = Number(params.id);
    const patients = useAppSelector(getPatients);
    const patient = patients.filter((patient) => patient.Id === patientId)[0];

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
            dispatch(updatePatientAction({
                Id: patientId,
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

    const handleDeleteSubmit = () => {
        dispatch(deletePatientAction(patientId));
    };

    return (
        <>
            <div className="form-container">
                <h2>Пациент</h2>
                <p>
                    <span>Id: </span>{patient.Id}
                </p>

                <form>
                    <label htmlFor="name">Имя</label>
                    <input defaultValue={patient.Name} ref={nameRef} type="text" id="name" name="name" className="input-field"/>

                    <label htmlFor="surname">Фамилия</label>
                    <input defaultValue={patient.Surname} ref={surnameRef} type="text" id="surname" name="surname" className="input-field"/>

                    <label htmlFor="patronymic">Отчество</label>
                    <input defaultValue={patient.Patronymic} ref={patronymicRef} type="text" id="patronymic" name="patronymic" className="input-field"/>

                    <label htmlFor="birthdate">Дата рождения</label>
                    <input defaultValue={formatDate(patient.BirthDate)} ref={birthDateRef} type="date" id="birthdate" name="birthdate" className="date-picker"/>

                    <div className="radio-list">
                        <div>Пол</div>
                        <label htmlFor="male">Мужской</label>
                        <input defaultChecked={patient.Sex === 0} ref={maleRef} type="radio" id="male" name="sex"/>
                        <label htmlFor="female">Женский</label>
                        <input defaultChecked={patient.Sex === 1} ref={femaleRef} type="radio" id="female" name="sex"/>
                    </div>

                    <label htmlFor="notes" className="label">Заметки</label>
                    <textarea defaultValue={patient.Notes} ref={notesRef} id="notes" name="notes" className="textarea-field"/>
                </form>
            </div>
            <button onClick={handleSubmit} className="action-button">Сохранить</button>
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

export default EditPatient;
