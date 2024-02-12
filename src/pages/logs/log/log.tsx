import React, {ReactElement} from "react";
import '../../../common-styles/action-button.css'
import '../../../common-styles/detailed-page.css'
import {useParams} from "react-router-dom";
import {useAppSelector} from "../../../hooks/hooks";
import browserHistory from "../../../components/history-route/browser-history";
import {getLogs} from "../../../store/logs/selectors";

function Log(): ReactElement {
    const params = useParams();
    const logId = params.id;
    const logs = useAppSelector(getLogs);
    const log = logs.filter((log) => log.Time === logId)[0];

    return (
        <>
            <div className="detailed-page-container">
                <h2>Событие</h2>
                <p>
                    <span>Дата/Время: </span>{log.Time.replace(/[TZ_]/g, ' ')}
                </p>
                <p>
                    <span>Источник: </span>{log.Source}
                </p>
                <p>
                    <span>Тип: </span>{log.Type}
                </p>
                <span>Сообщение: </span>
                <p>
                    {log.Body}
                </p>
            </div>
            <button type="button" className="action-button" onClick={() => {
                browserHistory.back();
            }}
            >Вернуться
            </button>
        </>
    );
}

export default Log;
