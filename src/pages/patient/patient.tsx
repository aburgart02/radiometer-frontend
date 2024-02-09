import React, {ReactElement} from "react";
import '../../common-styles/table.css'
import '../../common-styles/pagination.css'
import '../../common-styles/action-button.css'
import './patient.css'
import {useParams} from "react-router-dom";
import {useAppSelector} from "../../hooks/hooks";
import {getPatients} from "../../store/patients/selectors";
import browserHistory from "../../components/history-route/browser-history";
import {getSex} from "../../utils/get-sex";

function Patient(): ReactElement {
    const params = useParams();
    const patientId = Number(params.id);
    const patients = useAppSelector(getPatients);
    const patient = patients.filter((patient) => patient.Id === patientId)[0];

    return (
        <>
            <div className="patient-container">
                <h2>Пациент</h2>
                <p>
                    <span>Id: </span>{patient.Id}
                </p>
                <p>
                    <span>Имя: </span>{patient.Name}
                </p>
                <p>
                    <span>Фамилия: </span>{patient.Surname}
                </p>
                <p>
                    <span>Отчество: </span>{patient.Patronymic}
                </p>
                <p>
                    <span>Дата рождения: </span>{patient.BirthDate}
                </p>
                <p>
                    <span>Пол: </span>{getSex(patient.Sex)}
                </p>
                <span>Заметки: </span>
                <p>
                    {patient.Notes}
                </p>
            </div>
            <button type="button" className="action-button" onClick={() => {
                browserHistory.back();
            }}
            >Вернуться
            </button>
        </>
    );
}

export default Patient;
