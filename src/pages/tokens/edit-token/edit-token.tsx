import '../../../common-styles/form.css'
import '../../../common-styles/action-button.css'
import React, {ReactElement, useRef} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import browserHistory from "../../../components/history-route/browser-history";
import {useParams} from "react-router-dom";
import {getTokens} from "../../../store/tokens/selectors";
import {deleteTokenAction, updateTokenAction} from "../../../store/api-actions/tokens-actions/tokens-actions";


function EditToken(): ReactElement {
    const params = useParams();
    const tokenId = Number(params.id);
    const tokens = useAppSelector(getTokens);
    const token = tokens.filter((token) => token.Id === tokenId)[0];

    const revokedRef = useRef<HTMLInputElement | null>(null);
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

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
    };

    const handleDeleteSubmit = () => {
        dispatch(deleteTokenAction(tokenId));
    };

    return (
        <>
            <div className="form-container">
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
                <div className="checkbox-list">
                    <label htmlFor="revoked">Отозван</label>
                    <input defaultChecked={token.Revoked} ref={revokedRef} type="checkbox" id="revoked" name="revoked"/>
                </div>
                <form>
                    <label htmlFor="description" className="label">Описание</label>
                    <textarea defaultValue={token.Description} ref={descriptionRef} id="description" name="description" className="textarea-field"/>
                </form>
                <p>
                    <span>Токен: </span>{token.Token}
                </p>
            </div>
            <button onClick={handleEditSubmit} className="action-button">Сохранить</button>
            <button onClick={() => {
                handleDeleteSubmit();
                browserHistory.back();
            }} className="action-button">Удалить
            </button>
            <button type="button" className="action-button" onClick={() => {
                browserHistory.back();
            }}
            >Вернуться
            </button>
        </>
    );
}

export default EditToken;
