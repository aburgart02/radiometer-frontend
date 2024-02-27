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
import {getLocale} from "../../../store/data/selectors";
import {showFormError} from "../../../utils/show_form_error";
import {FormattedMessage} from "react-intl";


function EditCalibration(): ReactElement {
    const params = useParams();
    const calibrationId = Number(params.id);
    const calibrations = useAppSelector(getCalibrations);
    const calibration = calibrations.filter((calibration) => calibration.Id === calibrationId)[0];

    const nameRef = useRef<HTMLInputElement | null>(null);
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

    const locale = useAppSelector(getLocale);
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
        else {
            showFormError(locale);
        }
    };

    const handleDeleteSubmit = () => {
        dispatch(deleteCalibrationAction(calibrationId));
    };

    return (
        <>
            <div className="form-container">
                <h2><FormattedMessage id="calibration_editing"/></h2>
                <p>
                    <span><FormattedMessage id="id"/>: </span>{calibration.Id}
                </p>
                <form>
                    <label htmlFor="name"><FormattedMessage id="title"/></label>
                    <input defaultValue={calibration.Name} ref={nameRef} type="text" id="name" name="name" className="input-field"/>

                    <label htmlFor="description" className="label"><FormattedMessage id="description"/></label>
                    <textarea defaultValue={calibration.Description} ref={descriptionRef} id="description" name="description" className="textarea-field"/>
                </form>
            </div>
            <button onClick={handleSubmit} className="action-button"><FormattedMessage id="save"/></button>
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

export default EditCalibration;
