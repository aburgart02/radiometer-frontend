import React, {ReactElement} from "react";
import '../../../common-styles/action-button.css'
import '../../../common-styles/detailed-page.css'
import {useParams} from "react-router-dom";
import {useAppSelector} from "../../../hooks/hooks";
import browserHistory from "../../../components/history-route/browser-history";
import {getCalibrations} from "../../../store/calibrations/selectors";
import {FormattedMessage} from "react-intl";


function Calibration(): ReactElement {
    const params = useParams();
    const calibrationId = Number(params.id);
    const calibrations = useAppSelector(getCalibrations);
    const calibration = calibrations.filter((calibration) => calibration.Id === calibrationId)[0];

    const handleDownloadCalibration = () => {
        const jsonData = new TextDecoder().decode(Uint8Array.from(atob(calibration.Data), c => c.charCodeAt(0)));
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.json';
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
    }

    return (
        <>
            <div className="detailed-page-container">
                <h2><FormattedMessage id="calibration"/></h2>
                <p>
                    <span><FormattedMessage id="id"/>: </span>{calibration.Id}
                </p>
                <p>
                    <span><FormattedMessage id="title"/>: </span>{calibration.Name}
                </p>
                <span><FormattedMessage id="description"/>: </span>
                <p>
                    {calibration.Description}
                </p>
            </div>
            <button type="button" className="action-button" onClick={handleDownloadCalibration}><FormattedMessage id="download"/></button>
            <button type="button" className="action-button" onClick={() => {
                browserHistory.back();
            }}
            ><FormattedMessage id="go_back"/>
            </button>
        </>
    );
}

export default Calibration;
