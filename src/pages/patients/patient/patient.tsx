import React, {ReactElement} from "react";
import '../../../common-styles/action-button.css'
import '../../../common-styles/detailed-page.css'
import {useParams} from "react-router-dom";
import {useAppSelector} from "../../../hooks/hooks";
import {getPatients} from "../../../store/patients/selectors";
import browserHistory from "../../../components/history-route/browser-history";
import {getSex} from "../../../utils/get-sex";
import {FormattedMessage} from "react-intl";

function Patient(): ReactElement {
    const params = useParams();
    const patientId = Number(params.id);
    const patients = useAppSelector(getPatients);
    const patient = patients.filter((patient) => patient.Id === patientId)[0];

    return (
        <>
            <div className="detailed-page-container">
                <h2><FormattedMessage id="patient"/></h2>
                <p>
                    <span><FormattedMessage id="id"/>: </span>{patient.Id}
                </p>
                <p>
                    <span><FormattedMessage id="name"/>: </span>{patient.Name}
                </p>
                <p>
                    <span><FormattedMessage id="surname"/>: </span>{patient.Surname}
                </p>
                <p>
                    <span><FormattedMessage id="patronymic"/>: </span>{patient.Patronymic}
                </p>
                <p>
                    <span><FormattedMessage id="birthdate"/>: </span>{patient.BirthDate}
                </p>
                <p>
                    <span><FormattedMessage id="sex"/>: </span>{getSex(patient.Sex)}
                </p>
                <span><FormattedMessage id="notes"/>: </span>
                <p>
                    {patient.Notes}
                </p>
            </div>
            <button type="button" className="action-button" onClick={() => {
                browserHistory.back();
            }}
            ><FormattedMessage id="go_back"/>
            </button>
        </>
    );
}

export default Patient;
