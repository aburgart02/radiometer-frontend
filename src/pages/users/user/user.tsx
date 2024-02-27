import React, {ReactElement} from "react";
import '../../../common-styles/action-button.css'
import '../../../common-styles/detailed-page.css'
import {useParams} from "react-router-dom";
import {useAppSelector} from "../../../hooks/hooks";
import browserHistory from "../../../components/history-route/browser-history";
import {getSex} from "../../../utils/get-sex";
import {getUsers} from "../../../store/users/selectors";
import {FormattedMessage} from "react-intl";

function User(): ReactElement {
    const params = useParams();
    const userId = Number(params.id);
    const users = useAppSelector(getUsers);
    const user = users.filter((patient) => patient.Id === userId)[0];

    return (
        <>
            <div className="detailed-page-container">
                <h2><FormattedMessage id="user"/></h2>
                <p>
                    <span><FormattedMessage id="id"/>: </span>{user.Id}
                </p>
                <p>
                    <span><FormattedMessage id="login"/>: </span>{user.Login}
                </p>
                <p>
                    <span><FormattedMessage id="name"/>: </span>{user.Name}
                </p>
                <p>
                    <span><FormattedMessage id="surname"/>: </span>{user.Surname}
                </p>
                <p>
                    <span><FormattedMessage id="patronymic"/>: </span>{user.Patronymic}
                </p>
                <p>
                    <span><FormattedMessage id="birthdate"/>: </span>{user.BirthDate}
                </p>
                <p>
                    <span><FormattedMessage id="sex"/>: </span>{getSex(user.Sex)}
                </p>
                <p>
                    <span><FormattedMessage id="role"/>: </span>{user.Role}
                </p>
                <p>
                    <span><FormattedMessage id="status"/>: </span>{user.Revoked ? <FormattedMessage id="blocked"/> : <FormattedMessage id="not_blocked"/>}
                </p>
                <span><FormattedMessage id="notes"/>: </span>
                <p>
                    {user.Notes}
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

export default User;
