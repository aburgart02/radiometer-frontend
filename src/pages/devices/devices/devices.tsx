import React, {ReactElement} from "react";
import {useAppSelector} from "../../../hooks/hooks";
import {getDevices} from "../../../store/devices/selectors";
import '../../../common-styles/table.css'
import '../../../common-styles/pagination.css'
import Pagination from "../../../components/pagination/pagination";
import {Link, NavLink} from "react-router-dom";
import {AppRoutes} from "../../../const/app-routes";

const DEVICE_ON_PAGE = 8;

function Devices(): ReactElement {
    const devices = useAppSelector(getDevices);
    const [pageNumber, setPageNumber] = React.useState(1);

    const handlePreviousButtonClick = () => {
        setPageNumber(pageNumber === 1 ? 1 : pageNumber - 1);
    };

    const handleNextButtonClick = () => {
        setPageNumber(pageNumber === Math.ceil(devices.length / DEVICE_ON_PAGE) ? pageNumber: pageNumber + 1);
    };

    return (
        <>
            <table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Имя</th>
                    <th>Описание</th>
                    <th/>
                </tr>
                </thead>
                <tbody>
                {devices
                    .slice()
                    .sort((a,b) => a.Id - b.Id)
                    .slice((pageNumber - 1) * DEVICE_ON_PAGE, pageNumber * DEVICE_ON_PAGE)
                    .map(device => (
                        <tr key={crypto.randomUUID()}>
                            <td>{device.Id}</td>
                            <td>{device.Name}</td>
                            <td>{device.Description}</td>
                            <td>
                                <li><NavLink to={AppRoutes.Device(device.Id)}>Подробнее</NavLink></li>
                                <li><NavLink to={AppRoutes.EditDevice(device.Id)}>Редактировать</NavLink></li>
                            </td>
                        </tr>
                ))}
                </tbody>
            </table>
            <Pagination handlePreviousButtonClick={handlePreviousButtonClick} handleNextButtonClick={handleNextButtonClick}/>
            <Link to={AppRoutes.AddDevice} className="action-button">Добавить</Link>
        </>
    );
}

export default Devices;
