import React, {ReactElement} from "react";
import '../../../common-styles/action-button.css'
import '../../../common-styles/detailed-page.css'
import {useParams} from "react-router-dom";
import {useAppSelector} from "../../../hooks/hooks";
import browserHistory from "../../../components/history-route/browser-history";
import {getMeasurements} from "../../../store/measurements/selectors";
import {getDevices} from "../../../store/devices/selectors";
import {getUsers} from "../../../store/users/selectors";
import {getPatients} from "../../../store/patients/selectors";
import {getFullName} from "../../../utils/get-full-name";
import {BACKEND_URL} from "../../../api/api";
import {getToken} from "../../../api/token";

function Measurement(): ReactElement {
    const params = useParams();
    const measurementId = Number(params.id);
    const measurements = useAppSelector(getMeasurements);
    const devices = useAppSelector(getDevices);
    const users = useAppSelector(getUsers);
    const patients = useAppSelector(getPatients);
    const token = getToken();
    const measurement = measurements.filter((measurement) => measurement.Id === measurementId)[0];

    const handleDownloadCalibration = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}measurements/${measurementId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/octet-stream',
                },
            });

            const blob = await response.blob();
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `measurement ${measurementId}`);
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    }

    return (
        <>
            <div className="detailed-page-container">
                <h2>Исследование</h2>
                <p>
                    <span>Id: </span>{measurement.Id}
                </p>
                <p>
                    <span>Время: </span>{measurement.Time.replace(/[TZ_]/g, ' ')}
                </p>
                <p>
                    <span>Описание: </span>{measurement.Description}
                </p>
                <p>
                    <span>Прибор: </span>{devices.filter((device) => device.Id === measurement.DeviceId)[0].Name}
                </p>
                <p>
                    <span>Исследователь: </span>{getFullName(users.filter((user) => user.Id === measurement.UserId)[0])}
                </p>
                <p>
                    <span>Пациент: </span>{getFullName(patients.filter((patient) => patient.Id === measurement.PatientId)[0])}
                </p>
            </div>
            <button type="button" className="action-button" onClick={handleDownloadCalibration}>Скачать</button>
            <button type="button" className="action-button" onClick={() => {
                browserHistory.back();
            }}
            >Вернуться
            </button>
        </>
    );
}

export default Measurement;
