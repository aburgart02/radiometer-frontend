import React, {ReactElement} from "react";
import {useAppSelector} from "../../../hooks/hooks";
import '../../../common-styles/table.css'
import '../../../common-styles/pagination.css'
import '../../../common-styles/action-button.css'
import Pagination from "../../../components/pagination/pagination";
import {NavLink} from "react-router-dom";
import {AppRoutes} from "../../../const/app-routes";
import {getLogs} from "../../../store/logs/selectors";
import {FormattedMessage} from "react-intl";

const LOGS_ON_PAGE = 8;

function Logs(): ReactElement {
    const logs = useAppSelector(getLogs);
    const [pageNumber, setPageNumber] = React.useState(1);

    const handlePreviousButtonClick = () => {
        setPageNumber(pageNumber === 1 ? 1 : pageNumber - 1);
    };

    const handleNextButtonClick = () => {
        setPageNumber(pageNumber === Math.ceil(logs.length / LOGS_ON_PAGE) ? pageNumber: pageNumber + 1);
    };

    return (
        <>
            <table>
                <thead>
                <tr>
                    <th><FormattedMessage id="time"/></th>
                    <th><FormattedMessage id="source"/></th>
                    <th><FormattedMessage id="type"/></th>
                    <th><FormattedMessage id="message"/></th>
                    <th/>
                </tr>
                </thead>
                <tbody>
                {logs
                    .slice((pageNumber - 1) * LOGS_ON_PAGE, pageNumber * LOGS_ON_PAGE)
                    .map(log => (
                        <tr key={crypto.randomUUID()}>
                            <td>{log.Time.replace(/[TZ_]/g, ' ')}</td>
                            <td>{log.Source}</td>
                            <td>{log.Type}</td>
                            <td>{log.Body}</td>
                            <td>
                                <li><NavLink to={AppRoutes.Log(log.Time)}><FormattedMessage id="more_detailed"/></NavLink></li>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination handlePreviousButtonClick={handlePreviousButtonClick} handleNextButtonClick={handleNextButtonClick}/>
        </>
    );
}

export default Logs;
