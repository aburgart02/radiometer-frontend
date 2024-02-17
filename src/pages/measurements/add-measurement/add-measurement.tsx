import '../../../common-styles/form.css'
import '../../../common-styles/action-button.css'
import '../../../common-styles/file-selection.css'
import React, {ReactElement, useRef} from "react";
import {useAppDispatch} from "../../../hooks/hooks";
import browserHistory from "../../../components/history-route/browser-history";
import {postMeasurementAction} from "../../../store/api-actions/measurements-actions/measurement-actions";


function AddMeasurement(): ReactElement {
    const [file, setFile] = React.useState(undefined);
    const dateRef = useRef<HTMLInputElement | null>(null);
    const timeRef = useRef<HTMLInputElement | null>(null);
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

    const dispatch = useAppDispatch();

    const handleSubmit = () => {
        if (dateRef.current !== null && dateRef.current.value !== ''
            && timeRef.current !== null && timeRef.current.value !== ''
            && file)
        {
            dispatch(postMeasurementAction({
                 Time: `${dateRef.current.value} ${timeRef.current.value}`,
                 Description: descriptionRef.current?.value,
                 DeviceId: 1,
                 UserId: 1,
                 PatientId: 1,
                 Data: file
            }));
        }
    };

    const uploadFile = (evt: any) => {
        const file = evt.target.files[0];
        setFile(file);
    }

    return (
        <>
            <div className="form-container">
                <form>
                    <label htmlFor="date">Дата</label>
                    <input ref={dateRef} type="date" id="birthdate" name="birthdate" className="date-picker"/>

                    <label htmlFor="time">Время</label>
                    <input ref={timeRef} type="time" id="time" name="time" className="date-picker"/>

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

export default AddMeasurement;
