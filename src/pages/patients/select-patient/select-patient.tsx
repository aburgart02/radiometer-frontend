import React, {ReactElement} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import '../../../common-styles/table.css'
import '../../../common-styles/pagination.css'
import '../../../common-styles/action-button.css'
import {getPatients} from "../../../store/patients/selectors";
import Pagination from "../../../components/pagination/pagination";
import {getSex} from "../../../utils/get-sex";
import {formatDate} from "../../../utils/format-date";
import {setPatientId} from "../../../store/data/data";
import browserHistory from "../../../components/history-route/browser-history";
import {AppRoutes} from "../../../const/app-routes";
import {Link} from "react-router-dom";

const PATIENTS_ON_PAGE = 8;

function SelectPatient(): ReactElement {
    const patients = useAppSelector(getPatients);
    const [pageNumber, setPageNumber] = React.useState(1);
    const dispatch = useAppDispatch();

    const handlePreviousButtonClick = () => {
        setPageNumber(pageNumber === 1 ? 1 : pageNumber - 1);
    };

    const handleNextButtonClick = () => {
        setPageNumber(pageNumber === Math.ceil(patients.length / PATIENTS_ON_PAGE) ? pageNumber: pageNumber + 1);
    };

    const handleSelectButtonClick = (id: number) => {
        dispatch(setPatientId(id));
    };

    return (
        <>
            <table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Имя</th>
                    <th>Фамилия</th>
                    <th>Отчество</th>
                    <th>Дата рождения</th>
                    <th>Пол</th>
                    <th>Заметки</th>
                    <th/>
                </tr>
                </thead>
                <tbody>
                {patients
                    .slice()
                    .sort((a,b) => Number(a.Id) - Number(b.Id))
                    .slice((pageNumber - 1) * PATIENTS_ON_PAGE, pageNumber * PATIENTS_ON_PAGE)
                    .map(patient => (
                        <tr key={crypto.randomUUID()}>
                            <td>{patient.Id}</td>
                            <td>{patient.Name}</td>
                            <td>{patient.Surname}</td>
                            <td>{patient.Patronymic}</td>
                            <td>{formatDate(patient.BirthDate)}</td>
                            <td>{getSex(patient.Sex)}</td>
                            <td>{patient.Notes}</td>
                            <td>
                                <button onClick={() => {
                                        handleSelectButtonClick(patient.Id)
                                    }
                                }>Выбрать</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination handlePreviousButtonClick={handlePreviousButtonClick} handleNextButtonClick={handleNextButtonClick}/>
            <Link to={AppRoutes.AddPatient} className="action-button">Добавить</Link>
            <button type="button" className="action-button" onClick={() => {
                browserHistory.back();
            }}
            >Вернуться
            </button>
        </>
    );
}

export default SelectPatient;
