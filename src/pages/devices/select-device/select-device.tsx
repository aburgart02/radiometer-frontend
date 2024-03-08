import React, {ReactElement, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {getDevices} from "../../../store/devices/selectors";
import '../../../common-styles/table.css'
import '../../../common-styles/pagination.css'
import '../../../common-styles/search.css'
import '../../../common-styles/select-buttons.css'
import Pagination from "../../../components/pagination/pagination";
import {Link} from "react-router-dom";
import {AppRoutes} from "../../../const/app-routes";
import browserHistory from "../../../components/history-route/browser-history";
import {setDeviceId} from "../../../store/data/data";
import {getDeviceId} from "../../../store/data/selectors";
import {FormattedMessage} from "react-intl";

const DEVICE_ON_PAGE = 8;

function SelectDevice(): ReactElement {
    const [searchValue, setSearchValue] = useState('');
    const devices = useAppSelector(getDevices);
    const deviceId = useAppSelector(getDeviceId);
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
        browserHistory.back();
    };

    return (
        <>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Введите название устройства"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
            </div>
            <table>
                <thead>
                <tr>
                    <th><FormattedMessage id="id"/></th>
                    <th><FormattedMessage id="title"/></th>
                    <th><FormattedMessage id="description"/></th>
                    <th/>
                </tr>
                </thead>
                <tbody>
                {devices
                    .filter(device =>
                        device.Name.toLowerCase().includes(searchValue.toLowerCase()))
                    .sort((a,b) => a.Id - b.Id)
                    .slice((pageNumber - 1) * DEVICE_ON_PAGE, pageNumber * DEVICE_ON_PAGE)
                    .map(device => (
                        <tr key={device.Id}>
                            <td>{device.Id}</td>
                            <td>{device.Name}</td>
                            <td>{device.Description}</td>
                            <td>
                                <button className={deviceId === device.Id ? 'selected-button' : 'unselected-button'} onClick={() => {
                                    handleSelectButtonClick(device.Id);
                                }
                                }><FormattedMessage id="select"/></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination handlePreviousButtonClick={handlePreviousButtonClick} handleNextButtonClick={handleNextButtonClick}/>
            <Link to={AppRoutes.AddDevice} className="action-button"><FormattedMessage id="add"/></Link>
        </>
    );
}

export default SelectDevice;
