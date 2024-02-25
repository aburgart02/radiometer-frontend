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
                <h2>Редактирование устройства</h2>
                <p>
                    <span>Id: </span>{device.Id}
                </p>
                <form>
                    <label htmlFor="name">Название</label>
                    <input defaultValue={device.Name} ref={nameRef} type="text" id="name" name="name" className="input-field"/>

                    <label htmlFor="description" className="label">Описание</label>
                    <textarea defaultValue={device.Description} ref={descriptionRef} id="description" name="description" className="textarea-field"/>
                </form>
                <p>
                    <span>Калибровки: </span>
                </p>
            </div>
            {
                deviceCalibrations.length > 0 &&
                <>
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
                                        <li><NavLink to={AppRoutes.Calibration(calibration.Id)}>Подробнее</NavLink></li>
                                        <li><NavLink to={AppRoutes.EditCalibration(calibration.Id)}>Редактировать</NavLink></li>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination handlePreviousButtonClick={handlePreviousButtonClick} handleNextButtonClick={handleNextButtonClick}/>
                </>
            }
            <Link to={AppRoutes.AddCalibration(deviceId)} className="action-button">Добавить калибровку</Link>
            <button onClick={handleSubmit} className="action-button">Сохранить</button>
            <button onClick={() => {
                handleDeleteSubmit();
                browserHistory.back();
            }} className="action-button">Удалить
            </button>
            <button type="button" className="action-button" onClick={() => {
                browserHistory.back();
            }}
            >Вернуться
            </button>
        </>
    );
}

export default EditDevice;
