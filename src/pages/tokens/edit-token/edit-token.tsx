import '../../../common-styles/form.css'
import '../../../common-styles/action-button.css'
import React, {ReactElement, useRef} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import browserHistory from "../../../components/history-route/browser-history";
import {useParams} from "react-router-dom";
import {getTokens} from "../../../store/tokens/selectors";
import {deleteTokenAction, updateTokenAction} from "../../../store/api-actions/tokens-actions/tokens-actions";
import {getLocale} from "../../../store/data/selectors";
import {showFormError} from "../../../utils/show_form_error";
import {FormattedMessage} from "react-intl";


function EditToken(): ReactElement {
    const params = useParams();
    const tokenId = Number(params.id);
    const tokens = useAppSelector(getTokens);
    const token = tokens.filter((token) => token.Id === tokenId)[0];

    const revokedRef = useRef<HTMLInputElement | null>(null);
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

    const locale = useAppSelector(getLocale);
    const dispatch = useAppDispatch();

    const handleEditSubmit = () => {
        if (revokedRef.current !== null && revokedRef.current.value !== '')
        {
            dispatch(updateTokenAction({
                Id: tokenId,
                EmissionDate: token.EmissionDate,
                ExpirationDate: token.ExpirationDate,
                Revoked:  revokedRef.current.checked,
                Token: token.Token,
                Description: descriptionRef.current?.value
            }));
        }
        else {
            showFormError(locale);
        }
    };

    const handleDeleteSubmit = () => {
        dispatch(deleteTokenAction(tokenId));
    };

    return (
        <>
            <div className="form-container">
                <h2><FormattedMessage id="token_editing"/></h2>
                <p>
                    <span><FormattedMessage id="id"/>: </span>{token.Id}
                </p>
                <p>
                    <span><FormattedMessage id="emission_date"/>: </span>{token.EmissionDate.replace(/[TZ_]/g, ' ')}
                </p>
                <p>
                    <span><FormattedMessage id="expiration_date"/>: </span>{token.ExpirationDate?.replace(/[TZ_]/g, ' ')}
                </p>
                <div className="checkbox-list">
                    <label htmlFor="revoked"><FormattedMessage id="revoked"/></label>
                    <input defaultChecked={token.Revoked} ref={revokedRef} type="checkbox" id="revoked" name="revoked"/>
                </div>
                <form>
                    <label htmlFor="description" className="label"><FormattedMessage id="description"/></label>
                    <textarea defaultValue={token.Description} ref={descriptionRef} id="description" name="description" className="textarea-field"/>
                </form>
                <p>
                    <span><FormattedMessage id="token"/>: </span>{token.Token}
                </p>
            </div>
            <button onClick={handleEditSubmit} className="action-button"><FormattedMessage id="save"/></button>
            <button onClick={() => {
                handleDeleteSubmit();
                browserHistory.back();
            }} className="action-button"><FormattedMessage id="delete"/>
            </button>
            <button type="button" className="action-button" onClick={() => {
                browserHistory.back();
            }}
            ><FormattedMessage id="go_back"/>
            </button>
        </>
    );
}

export default EditToken;
