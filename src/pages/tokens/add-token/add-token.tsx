import '../../../common-styles/form.css'
import '../../../common-styles/action-button.css'
import React, {ReactElement, useRef} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import browserHistory from "../../../components/history-route/browser-history";
import {postTokenAction} from "../../../store/api-actions/tokens-actions/tokens-actions";
import {getLocale} from "../../../store/data/selectors";
import {showFormError} from "../../../utils/show_form_error";
import {FormattedMessage} from "react-intl";


function AddToken(): ReactElement {
    const expirationDateRef = useRef<HTMLInputElement | null>(null);
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

    const locale = useAppSelector(getLocale);
    const dispatch = useAppDispatch();

    const handleSubmit = () => {
        if (expirationDateRef.current !== null && expirationDateRef.current.value !== '')
        {
            dispatch(postTokenAction({
                ExpirationDate: expirationDateRef.current?.value,
                Description: descriptionRef.current?.value
            }));
        }
        else {
            showFormError(locale);
        }
    };

    return (
        <>
            <div className="form-container">
                <h2><FormattedMessage id="token_adding"/></h2>
                <br/>
                <form>
                    <label htmlFor="expirationDate"><FormattedMessage id="expiration_date"/></label>
                    <input ref={expirationDateRef} type="date" id="expirationDate" name="expirationDate" className="date-picker"/>

                    <label htmlFor="description" className="label"><FormattedMessage id="description"/></label>
                    <textarea ref={descriptionRef} id="description" name="description" className="textarea-field"/>
                </form>
            </div>
            <button onClick={handleSubmit} className="action-button"><FormattedMessage id="add"/></button>
            <button type="button" className="action-button" onClick={() => {
                browserHistory.back();
            }}
            ><FormattedMessage id="go_back"/>
            </button>
        </>
    );
}

export default AddToken;
