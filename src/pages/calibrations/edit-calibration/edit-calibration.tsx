import '../../../common-styles/form.css'
import '../../../common-styles/action-button.css'
import React, {ReactElement, useRef} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import browserHistory from "../../../components/history-route/browser-history";
import {useParams} from "react-router-dom";
import {getCalibrations} from "../../../store/calibrations/selectors";
import {
    deleteCalibrationAction,
    updateCalibrationAction
} from "../../../store/api-actions/calibrations-actions/calibrations-actions";


function EditCalibration(): ReactElement {
    const params = useParams();
    const calibrationId = Number(params.id);
    const calibrations = useAppSelector(getCalibrations);
    const calibration = calibrations.filter((calibration) => calibration.Id === calibrationId)[0];

    const nameRef = useRef<HTMLInputElement | null>(null);
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

    const dispatch = useAppDispatch();

    const handleSubmit = () => {
        if (nameRef.current !== null && nameRef.current.value !== '')
        {
            dispatch(updateCalibrationAction({
                Id: calibrationId,
                Name: nameRef.current.value,
                Description: descriptionRef.current?.value
            }));
        }
    };

    const handleDeleteSubmit = () => {
        dispatch(deleteCalibrationAction(calibrationId));
    };

    return (
        <>
            <div className="form-container">
                <h2>Калибровка</h2>
                <p>
                    <span>Id: </span>{calibration.Id}
                </p>
                <form>
                    <label htmlFor="name">Название</label>
                    <input defaultValue={calibration.Name} ref={nameRef} type="text" id="name" name="name" className="input-field"/>

                    <label htmlFor="description" className="label">Описание</label>
                    <textarea defaultValue={calibration.Description} ref={descriptionRef} id="description" name="description" className="textarea-field"/>
                </form>
            </div>
            <button onClick={handleSubmit} className="action-button">Сохранить</button>
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

export default EditCalibration;
