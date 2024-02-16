import React, {ReactElement} from "react";
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

const MEASUREMENTS_ON_PAGE = 8;

function Measurements(): ReactElement {
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
            <table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Время</th>
                    <th>Описание</th>
                    <th>Прибор</th>
                    <th>Исследователь</th>
                    <th>Пациент</th>
                    <th/>
                </tr>
                </thead>
                <tbody>
                {measurements
                    .slice()
                    .sort((a,b) => a.Id - b.Id)
                    .slice((pageNumber - 1) * MEASUREMENTS_ON_PAGE, pageNumber * MEASUREMENTS_ON_PAGE)
                    .map(measurement => (
                        <tr key={crypto.randomUUID()}>
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
                                <li><NavLink to={AppRoutes.Measurement(measurement.Id)}>Подробнее</NavLink></li>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination handlePreviousButtonClick={handlePreviousButtonClick} handleNextButtonClick={handleNextButtonClick}/>
            <Link to={AppRoutes.AddMeasurement} className="action-button">Добавить</Link>
        </>
    );
}

export default Measurements;
