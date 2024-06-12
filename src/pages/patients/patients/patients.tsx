import React, {ReactElement, useState} from "react";
import {useAppSelector} from "../../../hooks/hooks";
import '../../../common-styles/table.css'
import '../../../common-styles/pagination.css'
import '../../../common-styles/action-button.css'
import {getPatients} from "../../../store/patients/selectors";
import Pagination from "../../../components/pagination/pagination";
import {Link, NavLink} from "react-router-dom";
import {AppRoutes} from "../../../const/app-routes";
import {getSex} from "../../../utils/get-sex";
import {formatDate} from "../../../utils/format-date";
import {FormattedMessage} from "react-intl";
import {getFullName} from "../../../utils/get-full-name";

const PATIENTS_ON_PAGE = 8;

function Patients(): ReactElement {
    const [patientSearchValue, setPatientSearchValue] = useState('');
    const patients = useAppSelector(getPatients);
    const [pageNumber, setPageNumber] = React.useState(1);

    const handlePreviousButtonClick = () => {
        setPageNumber(pageNumber === 1 ? 1 : pageNumber - 1);
    };

    const handleNextButtonClick = () => {
        setPageNumber(pageNumber === Math.ceil(patients.length / PATIENTS_ON_PAGE) ? pageNumber: pageNumber + 1);
    };

    return (
        <>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Введите ФИО пациента"
                    value={patientSearchValue}
                    onChange={(e) => setPatientSearchValue(e.target.value)}
                />
            </div>
            <table>
                <thead>
                <tr>
                    <th><FormattedMessage id="id"/></th>
                    <th><FormattedMessage id="name"/></th>
                    <th><FormattedMessage id="surname"/></th>
                    <th><FormattedMessage id="patronymic"/></th>
                    <th><FormattedMessage id="birthdate"/></th>
                    <th><FormattedMessage id="sex"/></th>
                    <th><FormattedMessage id="notes"/></th>
                    <th/>
                </tr>
                </thead>
                <tbody>
                {patients
                    .filter(patient => getFullName(patient).toLowerCase().includes(patientSearchValue.toLowerCase()))
                    .slice()
                    .sort((a,b) => Number(a.Id) - Number(b.Id))
                    .slice((pageNumber - 1) * PATIENTS_ON_PAGE, pageNumber * PATIENTS_ON_PAGE)
                    .map(patient => (
                        <tr key={patient.Id}>
                            <td>{patient.Id}</td>
                            <td>{patient.Name}</td>
                            <td>{patient.Surname}</td>
                            <td>{patient.Patronymic}</td>
                            <td>{formatDate(patient.BirthDate)}</td>
                            <td>{getSex(patient.Sex)}</td>
                            <td>{patient.Notes}</td>
                            <td>
                                <li><NavLink to={AppRoutes.Patient(patient.Id)}><FormattedMessage id="more_detailed"/></NavLink></li>
                                <li><NavLink to={AppRoutes.EditPatient(patient.Id)}><FormattedMessage id="edit"/></NavLink></li>
                            </td>
                        </tr>
                ))}
                </tbody>
            </table>
            <Pagination handlePreviousButtonClick={handlePreviousButtonClick} handleNextButtonClick={handleNextButtonClick}/>
            <Link to={AppRoutes.AddPatient} className="action-button"><FormattedMessage id="add"/></Link>
        </>
    );
}

export default Patients;
