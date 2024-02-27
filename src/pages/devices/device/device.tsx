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
import {AppRoutes} from "../../../const/app-routes";
import {FormattedMessage} from "react-intl";

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
                <h2><FormattedMessage id="device"/></h2>
                <p>
                    <span><FormattedMessage id="id"/>: </span>{device.Id}
                </p>
                <p>
                    <span><FormattedMessage id="title"/>: </span>{device.Name}
                </p>
                <span><FormattedMessage id="description"/>: </span>
                <p>
                    {device.Description}
                </p>
                <p>
                    <span><FormattedMessage id="calibrations"/>: </span>
                </p>
            </div>
            {
                deviceCalibrations.length > 0 &&
                <>
                    <table>
                        <thead>
                        <tr>
                            <th><FormattedMessage id="id"/></th>
                            <th><FormattedMessage id="title"/></th>
                            <th><FormattedMessage id="date"/></th>
                            <th><FormattedMessage id="description"/></th>
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
                                        <li><NavLink to={AppRoutes.Calibration(calibration.Id)}>Подробнее</NavLink></li>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination handlePreviousButtonClick={handlePreviousButtonClick} handleNextButtonClick={handleNextButtonClick}/>
                </>
            }
            <button type="button" className="action-button" onClick={() => {
                browserHistory.back();
            }}
            ><FormattedMessage id="go_back"/>
            </button>
        </>
    );
}

export default Device;
