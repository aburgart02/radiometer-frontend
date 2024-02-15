import React, {ReactElement} from "react";
import '../../../common-styles/action-button.css'
import '../../../common-styles/detailed-page.css'
import {NavLink, useParams} from "react-router-dom";
import {useAppSelector} from "../../../hooks/hooks";
import browserHistory from "../../../components/history-route/browser-history";
import {getDevices} from "../../../store/devices/selectors";
import {getCalibrations} from "../../../store/calibrations/selectors";
import {formatDate} from "../../../utils/format-date";
import Pagination from "../../../components/pagination/pagination";

const CALIBRATION_ON_PAGE = 4;

function Device(): ReactElement {
    const [pageNumber, setPageNumber] = React.useState(1);
    const params = useParams();
    const deviceId = Number(params.id);
    const devices = useAppSelector(getDevices);
    const device = devices.filter((device) => device.Id === deviceId)[0];
    const calibrations = useAppSelector(getCalibrations);
    const deviceCalibrations = calibrations.filter(x => x.DeviceId === deviceId);

    const handlePreviousButtonClick = () => {
        setPageNumber(pageNumber === 1 ? 1 : pageNumber - 1);
    };

    const handleNextButtonClick = () => {
        setPageNumber(pageNumber === Math.ceil(deviceCalibrations.length / CALIBRATION_ON_PAGE) ? pageNumber: pageNumber + 1);
    };

    return (
        <>
            <div className="detailed-page-container">
                <h2>Устройство</h2>
                <p>
                    <span>Id: </span>{device.Id}
                </p>
                <p>
                    <span>Название: </span>{device.Name}
                </p>
                <span>Описание: </span>
                <p>
                    {device.Description}
                </p>
                <p>
                    <span>Калибровки: </span>
                </p>
            </div>
            {
                deviceCalibrations.length > 0 &&
                <table>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Название</th>
                        <th>Дата</th>
                        <th>Описание</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {deviceCalibrations
                        .slice()
                        .sort((a,b) => a.Id - b.Id)
                        .slice((pageNumber - 1) * CALIBRATION_ON_PAGE, pageNumber * CALIBRATION_ON_PAGE)
                        .map(calibration => (
                            <tr key={crypto.randomUUID()}>
                                <td>{calibration.Id}</td>
                                <td>{calibration.Name}</td>
                                <td>{formatDate(calibration.Date)}</td>
                                <td>{calibration.Description}</td>
                                <td>
                                    <li><NavLink to={'/'}>Подробнее</NavLink></li>
                                    <li><NavLink to={'/'}>Редактировать</NavLink></li>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
            <Pagination handlePreviousButtonClick={handlePreviousButtonClick} handleNextButtonClick={handleNextButtonClick}/>
            <button type="button" className="action-button" onClick={() => {
                browserHistory.back();
            }}
            >Вернуться
            </button>
        </>
    );
}

export default Device;
