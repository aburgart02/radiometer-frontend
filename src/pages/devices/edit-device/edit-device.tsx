import '../../../common-styles/form.css'
import '../../../common-styles/action-button.css'
import React, {ReactElement, useRef} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import browserHistory from "../../../components/history-route/browser-history";
import {Link, NavLink, useParams} from "react-router-dom";
import {getDevices} from "../../../store/devices/selectors";
import {deleteDeviceAction, updateDeviceAction} from "../../../store/api-actions/devices-actions/devices-actions";
import {getCalibrations} from "../../../store/calibrations/selectors";
import {formatDate} from "../../../utils/format-date";
import Pagination from "../../../components/pagination/pagination";
import {AppRoutes} from "../../../const/app-routes";
import {getLocale} from "../../../store/data/selectors";
import {showFormError} from "../../../utils/show_form_error";
import {FormattedMessage} from "react-intl";

const CALIBRATION_ON_PAGE = 4;

function EditDevice(): ReactElement {
    const [pageNumber, setPageNumber] = React.useState(1);
    const params = useParams();
    const deviceId = Number(params.id);
    const devices = useAppSelector(getDevices);
    const device = devices.filter((device) => device.Id === deviceId)[0];
    const calibrations = useAppSelector(getCalibrations);
    const deviceCalibrations = calibrations.filter(x => x.DeviceId === deviceId);

    const nameRef = useRef<HTMLInputElement | null>(null);
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

    const locale = useAppSelector(getLocale);
    const dispatch = useAppDispatch();

    const handleSubmit = () => {
        if (nameRef.current !== null && nameRef.current.value !== '')
        {
            dispatch(updateDeviceAction({
                Id: deviceId,
                Name: nameRef.current.value,
                Description: descriptionRef.current?.value
            }));
        }
        else {
            showFormError(locale);
        }
    };

    const handleDeleteSubmit = () => {
        dispatch(deleteDeviceAction(deviceId));
    };

    const handlePreviousButtonClick = () => {
        setPageNumber(pageNumber === 1 ? 1 : pageNumber - 1);
    };

    const handleNextButtonClick = () => {
        setPageNumber(pageNumber === Math.ceil(deviceCalibrations.length / CALIBRATION_ON_PAGE) ? pageNumber: pageNumber + 1);
    };

    return (
        <>
            <div className="form-container">
                <h2><FormattedMessage id="device_editing"/></h2>
                <p>
                    <span><FormattedMessage id="id"/>: </span>{device.Id}
                </p>
                <form>
                    <label htmlFor="name"><FormattedMessage id="title"/></label>
                    <input defaultValue={device.Name} ref={nameRef} type="text" id="name" name="name" className="input-field"/>

                    <label htmlFor="description" className="label"><FormattedMessage id="description"/></label>
                    <textarea defaultValue={device.Description} ref={descriptionRef} id="description" name="description" className="textarea-field"/>
                </form>
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
                                <tr key={calibration.Id}>
                                    <td>{calibration.Id}</td>
                                    <td>{calibration.Name}</td>
                                    <td>{formatDate(calibration.Date)}</td>
                                    <td>{calibration.Description}</td>
                                    <td>
                                        <li><NavLink to={AppRoutes.Calibration(calibration.Id)}><FormattedMessage id="more_detailed"/></NavLink></li>
                                        <li><NavLink to={AppRoutes.EditCalibration(calibration.Id)}><FormattedMessage id="edit"/></NavLink></li>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination handlePreviousButtonClick={handlePreviousButtonClick} handleNextButtonClick={handleNextButtonClick}/>
                </>
            }
            <Link to={AppRoutes.AddCalibration(deviceId)} className="action-button"><FormattedMessage id="add_calibration"/></Link>
            <button onClick={handleSubmit} className="action-button"><FormattedMessage id="save"/></button>
            <button onClick={() => {
                handleDeleteSubmit();
                browserHistory.back();
            }} className="action-button"><FormattedMessage id="delete"/>
            </button>
            <button type="button" className="action-button" onClick={() => {
                browserHistory.back();
            }}
            ><FormattedMessage id="go_back"/>
            </button>
        </>
    );
}

export default EditDevice;
