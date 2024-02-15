import '../../../common-styles/form.css'
import '../../../common-styles/action-button.css'
import React, {ReactElement, useRef} from "react";
import {useAppDispatch} from "../../../hooks/hooks";
import browserHistory from "../../../components/history-route/browser-history";
import {postDeviceAction} from "../../../store/api-actions/devices-actions/devices-actions";


function AddDevice(): ReactElement {
    const nameRef = useRef<HTMLInputElement | null>(null);
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

    const dispatch = useAppDispatch();

    const handleSubmit = () => {
        if (nameRef.current !== null && nameRef.current.value !== '')
        {
            dispatch(postDeviceAction({
                Name: nameRef.current.value,
                Description: descriptionRef.current?.value
            }));
        }
    };

    return (
        <>
            <div className="form-container">
                <form>
                    <label htmlFor="name">Название</label>
                    <input ref={nameRef} type="text" id="name" name="name" className="input-field"/>

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

export default AddDevice;
