import '../../../common-styles/form.css'
import '../../../common-styles/action-button.css'
import '../../../common-styles/file-selection.css'
import React, {ReactElement, useRef} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import browserHistory from "../../../components/history-route/browser-history";
import {postMeasurementAction} from "../../../store/api-actions/measurements-actions/measurement-actions";
import {getDeviceId, getPatientId, getUserId} from "../../../store/data/selectors";
import {getDevices} from "../../../store/devices/selectors";
import {getUsers} from "../../../store/users/selectors";
import {getPatients} from "../../../store/patients/selectors";
import {getFullName} from "../../../utils/get-full-name";
import {Link} from "react-router-dom";
import {AppRoutes} from "../../../const/app-routes";


function AddMeasurement(): ReactElement {
    const [file, setFile] = React.useState(undefined);
    const dateRef = useRef<HTMLInputElement | null>(null);
    const timeRef = useRef<HTMLInputElement | null>(null);
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

    const deviceId = useAppSelector(getDeviceId);
    const userId = useAppSelector(getUserId);
    const patientId = useAppSelector(getPatientId);

    const devices = useAppSelector(getDevices);
    const users = useAppSelector(getUsers);
    const patients = useAppSelector(getPatients);

    const device = devices.filter((device) => device.Id === deviceId)[0];
    const user = users.filter((user) => user.Id === userId)[0];
    const patient = patients.filter((patient) => patient.Id === patientId)[0];

    const dispatch = useAppDispatch();

    const handleSubmit = () => {
        if (dateRef.current !== null && dateRef.current.value !== ''
            && timeRef.current !== null && timeRef.current.value !== ''
            && deviceId !== undefined && userId !== undefined && patientId !== undefined
            && file)
        {
            dispatch(postMeasurementAction({
                 Time: `${dateRef.current.value} ${timeRef.current.value}`,
                 Description: descriptionRef.current?.value,
                 DeviceId: deviceId,
                 UserId: userId,
                 PatientId: patientId,
                 Data: file
            }));
        }
    };

    const uploadFile = (evt: any) => {
        const file = evt.target.files[0];
        setFile(file);
    }

    return (
        <>
            <div className="form-container">
                <h2>Добавление исследования</h2>
                <br/>
                <form>
                    <label htmlFor="date">Дата</label>
                    <input ref={dateRef} type="date" id="birthdate" name="birthdate" className="date-picker"/>

                    <label htmlFor="time">Время</label>
                    <input ref={timeRef} type="time" id="time" name="time" className="date-picker"/>

                    <label htmlFor="description" className="label">Описание</label>
                    <textarea ref={descriptionRef} id="description" name="description" className="textarea-field"/>
                </form>
                <p>
                    <span>Прибор: </span>{device && device.Name}
                    <Link to={AppRoutes.SelectDevice} className="action-button">Выбрать прибор</Link>
                </p>
                <p>
                    <span>Исследователь: </span>{user && getFullName(user)}
                    <Link to={AppRoutes.SelectUser} className="action-button">Выбрать исследователя</Link>
                </p>
                <p>
                    <span>Пациент: </span>{patient && getFullName(patient)}
                    <Link to={AppRoutes.SelectPatient} className="action-button">Выбрать пациента</Link>
                </p>
            </div>
            <div className="file-selection">
                <input type="file"
                       onChange={uploadFile} />
            </div>
            <button onClick={handleSubmit} className="action-button">Добавить</button>
            <button type="button" className="action-button" onClick={() => {
                browserHistory.back();
            }}
            >Вернуться
            </button>
        </>
    );
}

export default AddMeasurement;
