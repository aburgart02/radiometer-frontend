import '../../../common-styles/form.css'
import '../../../common-styles/action-button.css'
import '../../../common-styles/file-selection.css'
import React, {ReactElement, useRef} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import browserHistory from "../../../components/history-route/browser-history";
import {useParams} from "react-router-dom";
import {postCalibrationAction} from "../../../store/api-actions/calibrations-actions/calibrations-actions";
import {validateCalibration} from "../../../utils/validate-calibration";
import {showFormError} from "../../../utils/show_form_error";
import {getLocale} from "../../../store/data/selectors";
import {FormattedMessage} from "react-intl";


function AddCalibration(): ReactElement {
    const [file, setFile] = React.useState(undefined);
    const params = useParams();
    const deviceId = Number(params.id);
    const nameRef = useRef<HTMLInputElement | null>(null);
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

    const locale = useAppSelector(getLocale);
    const dispatch = useAppDispatch();

    const handleSubmit = () => {
        if (nameRef.current !== null && nameRef.current.value !== '' && file)
        {
            dispatch(postCalibrationAction({
                Name: nameRef.current.value,
                Description: descriptionRef.current?.value,
                DeviceId: deviceId,
                Data: file
            }));
        }
        else {
            showFormError(locale);
        }
    };

    const uploadFile = (evt: any) => {
        const reader = new FileReader();
        const file = evt.target.files[0];

        reader.onload = function (e) {
            if (e.target && e.target.result) {
                try {
                    const jsonData = JSON.parse(e.target.result.toString());
                    if (validateCalibration(jsonData)) {
                        setFile(file);
                    }
                    else {
                        setFile(undefined);
                    }
                } catch (error) {
                    console.error('Error parsing JSON file:', error);
                    setFile(undefined);
                }
            }
        };

        reader.readAsText(file);
    }

    return (
        <>
            <div className="form-container">
                <h2><FormattedMessage id="calibration_adding"/></h2>
                <br/>
                <form>
                    <label htmlFor="name"><FormattedMessage id="title"/></label>
                    <input ref={nameRef} type="text" id="name" name="name" className="input-field"/>

                    <label htmlFor="description" className="label"><FormattedMessage id="description"/></label>
                    <textarea ref={descriptionRef} id="description" name="description" className="textarea-field"/>
                </form>
            </div>
            <div className="file-selection">
                <input type="file"
                       onChange={uploadFile} />
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

export default AddCalibration;
