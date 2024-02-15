import React, {ReactElement} from "react";
import '../../../common-styles/action-button.css'
import '../../../common-styles/detailed-page.css'
import {useParams} from "react-router-dom";
import {useAppSelector} from "../../../hooks/hooks";
import browserHistory from "../../../components/history-route/browser-history";
import {getCalibrations} from "../../../store/calibrations/selectors";


function Calibration(): ReactElement {
    const params = useParams();
    const calibrationId = Number(params.id);
    const calibrations = useAppSelector(getCalibrations);
    const calibration = calibrations.filter((calibration) => calibration.Id === calibrationId)[0];

    return (
        <>
            <div className="detailed-page-container">
                <h2>Калибровка</h2>
                <p>
                    <span>Id: </span>{calibration.Id}
                </p>
                <p>
                    <span>Название: </span>{calibration.Name}
                </p>
                <span>Описание: </span>
                <p>
                    {calibration.Description}
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

export default Calibration;
