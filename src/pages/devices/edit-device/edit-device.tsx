import '../../../common-styles/form.css'
import '../../../common-styles/action-button.css'
import React, {ReactElement, useRef} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import browserHistory from "../../../components/history-route/browser-history";
import {useParams} from "react-router-dom";
import {getDevices} from "../../../store/devices/selectors";
import {deleteDeviceAction, updateDeviceAction} from "../../../store/api-actions/devices-actions/devices-actions";


function EditDevice(): ReactElement {
    const params = useParams();
    const deviceId = Number(params.id);
    const devices = useAppSelector(getDevices);
    const device = devices.filter((patient) => patient.Id === deviceId)[0];

    const nameRef = useRef<HTMLInputElement | null>(null);
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

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
    };

    const handleDeleteSubmit = () => {
        dispatch(deleteDeviceAction(deviceId));
    };

    return (
        <>
            <div className="form-container">
                <h2>Устройство</h2>
                <p>
                    <span>Id: </span>{device.Id}
                </p>

                <form>
                    <label htmlFor="name">Название</label>
                    <input defaultValue={device.Name} ref={nameRef} type="text" id="name" name="name" className="input-field"/>

                    <label htmlFor="description" className="label">Описание</label>
                    <textarea defaultValue={device.Description} ref={descriptionRef} id="description" name="description" className="textarea-field"/>
                </form>
            </div>
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
