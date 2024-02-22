import '../../../common-styles/form.css'
import '../../../common-styles/action-button.css'
import '../../../common-styles/file-selection.css'
import React, {ReactElement, useRef} from "react";
import {useAppDispatch} from "../../../hooks/hooks";
import browserHistory from "../../../components/history-route/browser-history";
import {useParams} from "react-router-dom";
import {postCalibrationAction} from "../../../store/api-actions/calibrations-actions/calibrations-actions";
import {validateCalibration} from "../../../utils/validate-calibration";


function AddCalibration(): ReactElement {
    const [file, setFile] = React.useState(undefined);
    const params = useParams();
    const deviceId = Number(params.id);
    const nameRef = useRef<HTMLInputElement | null>(null);
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

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
                <h2>Добавление калибровки</h2>
                <br/>
                <form>
                    <label htmlFor="name">Название</label>
                    <input ref={nameRef} type="text" id="name" name="name" className="input-field"/>

                    <label htmlFor="description" className="label">Описание</label>
                    <textarea ref={descriptionRef} id="description" name="description" className="textarea-field"/>
                </form>
            </div>
            <div className="file-selection">
                <input type="file"
                       onChange={uploadFile} />
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

export default AddCalibration;
