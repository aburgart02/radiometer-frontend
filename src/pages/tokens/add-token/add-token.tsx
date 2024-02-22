import '../../../common-styles/form.css'
import '../../../common-styles/action-button.css'
import React, {ReactElement, useRef} from "react";
import {useAppDispatch} from "../../../hooks/hooks";
import browserHistory from "../../../components/history-route/browser-history";
import {postTokenAction} from "../../../store/api-actions/tokens-actions/tokens-actions";


function AddToken(): ReactElement {
    const expirationDateRef = useRef<HTMLInputElement | null>(null);
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

    const dispatch = useAppDispatch();

    const handleSubmit = () => {
        if (expirationDateRef.current !== null && expirationDateRef.current.value !== '')
        {
            dispatch(postTokenAction({
                ExpirationDate: expirationDateRef.current?.value,
                Description: descriptionRef.current?.value
            }));
        }
    };

    return (
        <>
            <div className="form-container">
                <h2>Добавление токена</h2>
                <br/>
                <form>
                    <label htmlFor="expirationDate">Действителен до</label>
                    <input ref={expirationDateRef} type="date" id="expirationDate" name="expirationDate" className="date-picker"/>

                    <label htmlFor="description" className="label">Описание</label>
                    <textarea ref={descriptionRef} id="description" name="description" className="textarea-field"/>
                </form>
            </div>
            <button onClick={handleSubmit} className="action-button">Добавить</button>
            <button type="button" className="action-button" onClick={() => {
                browserHistory.back();
            }}
            >Вернуться
            </button>
        </>
    );
}

export default AddToken;
