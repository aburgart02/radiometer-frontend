import React, {ReactElement} from "react";
import '../../../common-styles/action-button.css'
import '../../../common-styles/detailed-page.css'
import {useParams} from "react-router-dom";
import {useAppSelector} from "../../../hooks/hooks";
import browserHistory from "../../../components/history-route/browser-history";
import {getTokens} from "../../../store/tokens/selectors";
import {FormattedMessage} from "react-intl";

function Token(): ReactElement {
    const params = useParams();
    const tokenId = Number(params.id);
    const tokens = useAppSelector(getTokens);
    const token = tokens.filter((patient) => patient.Id === tokenId)[0];

    return (
        <>
            <div className="detailed-page-container">
                <h2><FormattedMessage id="token"/></h2>
                <p>
                    <span><FormattedMessage id="id"/>: </span>{token.Id}
                </p>
                <p>
                    <span><FormattedMessage id="emission_date"/>: </span>{token.EmissionDate.replace(/[TZ_]/g, ' ')}
                </p>
                <p>
                    <span><FormattedMessage id="expiration_date"/>: </span>{token.ExpirationDate?.replace(/[TZ_]/g, ' ')}
                </p>
                <p>
                    <span><FormattedMessage id="description"/>: </span>{token.Description}
                </p>
                <p>
                    <span><FormattedMessage id="revoked"/>: </span>{token.Revoked ? <FormattedMessage id="yes"/> : <FormattedMessage id="no"/>}
                </p>
                <span><FormattedMessage id="token"/>: </span>
                <p>
                    {token.Token}
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

export default Token;
