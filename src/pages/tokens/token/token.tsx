import React, {ReactElement} from "react";
import '../../../common-styles/action-button.css'
import '../../../common-styles/detailed-page.css'
import {useParams} from "react-router-dom";
import {useAppSelector} from "../../../hooks/hooks";
import browserHistory from "../../../components/history-route/browser-history";
import {getTokens} from "../../../store/tokens/selectors";

function Token(): ReactElement {
    const params = useParams();
    const tokenId = Number(params.id);
    const tokens = useAppSelector(getTokens);
    const token = tokens.filter((patient) => patient.Id === tokenId)[0];

    return (
        <>
            <div className="detailed-page-container">
                <h2>Токен</h2>
                <p>
                    <span>Id: </span>{token.Id}
                </p>
                <p>
                    <span>Дата эмиссии: </span>{token.EmissionDate.replace(/[TZ_]/g, ' ')}
                </p>
                <p>
                    <span>Действителен до: </span>{token.ExpirationDate?.replace(/[TZ_]/g, ' ')}
                </p>
                <p>
                    <span>Описание: </span>{token.Description}
                </p>
                <p>
                    <span>Отозван: </span>{token.Revoked ? 'Да' : 'Нет'}
                </p>
                <span>Токен: </span>
                <p>
                    {token.Token}
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

export default Token;
