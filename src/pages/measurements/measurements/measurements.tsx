import React, {ReactElement, useState} from "react";
import {useAppSelector} from "../../../hooks/hooks";
import '../../../common-styles/table.css'
import '../../../common-styles/pagination.css'
import Pagination from "../../../components/pagination/pagination";
import {Link, NavLink} from "react-router-dom";
import {AppRoutes} from "../../../const/app-routes";
import {getMeasurements} from "../../../store/measurements/selectors";
import {getDevices} from "../../../store/devices/selectors";
import {getUsers} from "../../../store/users/selectors";
import {getPatients} from "../../../store/patients/selectors";
import {getFullName} from "../../../utils/get-full-name";
import {FormattedMessage} from "react-intl";
import {checkDateRange} from "../../../utils/check-date-range";

const MEASUREMENTS_ON_PAGE = 8;

function Measurements(): ReactElement {
    const [fullNameSearchValue, setFullNameSearchValue] = useState('');
    const [startDateValue, setStartDateValue] = useState('');
    const [endDateValue, setEndDateValue] = useState('');
    const measurements = useAppSelector(getMeasurements);
    const devices = useAppSelector(getDevices);
    const users = useAppSelector(getUsers);
    const patients = useAppSelector(getPatients);
    const [pageNumber, setPageNumber] = React.useState(1);

    const handlePreviousButtonClick = () => {
        setPageNumber(pageNumber === 1 ? 1 : pageNumber - 1);
    };

    const handleNextButtonClick = () => {
        setPageNumber(pageNumber === Math.ceil(measurements.length / MEASUREMENTS_ON_PAGE) ? pageNumber: pageNumber + 1);
    };

    return (
        <>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Введите ФИО исследователя или пациента"
                    value={fullNameSearchValue}
                    onChange={(e) => setFullNameSearchValue(e.target.value)}
                />
                <input onChange={(e) => setStartDateValue(e.target.value)} type="date" id="start-date" name="start-date" style={{width: '200px'}}/>
                <input onChange={(e) => setEndDateValue(e.target.value)} type="date" id="end-date" name="end-date" style={{width: '200px'}}/>
            </div>
            <table>
                <thead>
                <tr>
                    <th><FormattedMessage id="id"/></th>
                    <th><FormattedMessage id="time"/></th>
                    <th><FormattedMessage id="description"/></th>
                    <th><FormattedMessage id="device"/></th>
                    <th><FormattedMessage id="researcher"/></th>
                    <th><FormattedMessage id="patient"/></th>
                    <th/>
                </tr>
                </thead>
                <tbody>
                {measurements
                    .filter(measurement => (getFullName(users.filter((user) => user.Id === measurement.UserId)[0]).toLowerCase()
                        .includes(fullNameSearchValue.toLowerCase())
                        || getFullName(patients.filter((patient) => patient.Id === measurement.PatientId)[0]).toLowerCase()
                        .includes(fullNameSearchValue.toLowerCase()))
                        && checkDateRange(measurement.Time.replace(/[TZ_]/g, ' '), startDateValue, endDateValue))
                    .slice()
                    .sort((a,b) => a.Id - b.Id)
                    .slice((pageNumber - 1) * MEASUREMENTS_ON_PAGE, pageNumber * MEASUREMENTS_ON_PAGE)
                    .map(measurement => (
                        <tr key={measurement.Id}>
                            <td>{measurement.Id}</td>
                            <td>{measurement.Time.replace(/[TZ_]/g, ' ')}</td>
                            <td>{measurement.Description}</td>
                            <td>{
                                devices.filter((device) => device.Id === measurement.DeviceId)[0].Name
                            }</td>
                            <td>{
                                getFullName(users.filter((user) => user.Id === measurement.UserId)[0])
                            }</td>
                            <td>{
                                getFullName(patients.filter((patient) => patient.Id === measurement.PatientId)[0])
                            }</td>
                            <td>
                                <li><NavLink to={AppRoutes.Measurement(measurement.Id)}><FormattedMessage id="more_detailed"/></NavLink></li>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination handlePreviousButtonClick={handlePreviousButtonClick} handleNextButtonClick={handleNextButtonClick}/>
            <Link to={AppRoutes.AddMeasurement} className="action-button"><FormattedMessage id="add"/></Link>
        </>
    );
}

export default Measurements;
