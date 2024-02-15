import React, {ReactElement} from "react";
import '../../../common-styles/action-button.css'
import '../../../common-styles/detailed-page.css'
import {useParams} from "react-router-dom";
import {useAppSelector} from "../../../hooks/hooks";
import browserHistory from "../../../components/history-route/browser-history";
import {getDevices} from "../../../store/devices/selectors";

function Device(): ReactElement {
    const params = useParams();
    const deviceId = Number(params.id);
    const devices = useAppSelector(getDevices);
    const device = devices.filter((device) => device.Id === deviceId)[0];

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
            </div>
            <button type="button" className="action-button" onClick={() => {
                browserHistory.back();
            }}
            >Вернуться
            </button>
        </>
    );
}

export default Device;
