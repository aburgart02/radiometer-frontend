import React, {ReactElement} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {getDevices} from "../../../store/devices/selectors";
import '../../../common-styles/table.css'
import '../../../common-styles/pagination.css'
import Pagination from "../../../components/pagination/pagination";
import {Link} from "react-router-dom";
import {AppRoutes} from "../../../const/app-routes";
import browserHistory from "../../../components/history-route/browser-history";
import {setDeviceId} from "../../../store/data/data";

const DEVICE_ON_PAGE = 8;

function SelectDevice(): ReactElement {
    const devices = useAppSelector(getDevices);
    const [pageNumber, setPageNumber] = React.useState(1);
    const dispatch = useAppDispatch();

    const handlePreviousButtonClick = () => {
        setPageNumber(pageNumber === 1 ? 1 : pageNumber - 1);
    };

    const handleNextButtonClick = () => {
        setPageNumber(pageNumber === Math.ceil(devices.length / DEVICE_ON_PAGE) ? pageNumber: pageNumber + 1);
    };

    const handleSelectButtonClick = (id: number) => {
        dispatch(setDeviceId(id));
    };

    return (
        <>
            <table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Имя</th>
                    <th>Описание</th>
                    <th/>
                </tr>
                </thead>
                <tbody>
                {devices
                    .slice()
                    .sort((a,b) => a.Id - b.Id)
                    .slice((pageNumber - 1) * DEVICE_ON_PAGE, pageNumber * DEVICE_ON_PAGE)
                    .map(device => (
                        <tr key={crypto.randomUUID()}>
                            <td>{device.Id}</td>
                            <td>{device.Name}</td>
                            <td>{device.Description}</td>
                            <td>
                                <button onClick={() => {
                                    handleSelectButtonClick(device.Id)
                                }
                                }>Выбрать</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination handlePreviousButtonClick={handlePreviousButtonClick} handleNextButtonClick={handleNextButtonClick}/>
            <Link to={AppRoutes.AddDevice} className="action-button">Добавить</Link>
            <button type="button" className="action-button" onClick={() => {
                browserHistory.back();
            }}
            >Вернуться
            </button>
        </>
    );
}

export default SelectDevice;
