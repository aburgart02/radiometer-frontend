import React, {ReactElement, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import '../../../common-styles/table.css'
import '../../../common-styles/pagination.css'
import '../../../common-styles/action-button.css'
import '../../../common-styles/search.css'
import '../../../common-styles/select-buttons.css'
import {getPatients} from "../../../store/patients/selectors";
import Pagination from "../../../components/pagination/pagination";
import {getSex} from "../../../utils/get-sex";
import {formatDate} from "../../../utils/format-date";
import {setPatientId} from "../../../store/data/data";
import browserHistory from "../../../components/history-route/browser-history";
import {AppRoutes} from "../../../const/app-routes";
import {Link} from "react-router-dom";
import {getFullName} from "../../../utils/get-full-name";
import {getPatientId} from "../../../store/data/selectors";

const PATIENTS_ON_PAGE = 8;

function SelectPatient(): ReactElement {
    const [searchValue, setSearchValue] = useState('');
    const patients = useAppSelector(getPatients);
    const patientId = useAppSelector(getPatientId);
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
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Введите ФИО"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
            </div>
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
                    .filter(patient =>
                        getFullName(patient).toLowerCase().includes(searchValue.toLowerCase()))
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
                                <button className={patientId === patient.Id ? 'selected-button' : 'unselected-button'} onClick={() => {
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
