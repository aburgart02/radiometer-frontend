import React, {ReactElement} from "react";
import {useAppSelector} from "../../hooks/hooks";
import {getDevices} from "../../store/devices/selectors";
import '../../common-styles/table.css'
import '../../common-styles/pagination.css'

const DEVICE_ON_PAGE = 6;

function Devices(): ReactElement {
    const devices = useAppSelector(getDevices);
    const [pageNumber, setPageNumber] = React.useState(1);

    const handlePreviousButtonClick = () => {
        setPageNumber(pageNumber === 1 ? 1 : pageNumber - 1);
    };

    const handleNextButtonClick = () => {
        setPageNumber(pageNumber === Math.ceil(devices.length / DEVICE_ON_PAGE) ? pageNumber: pageNumber + 1);
    };

    return (
        <>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Имя</th>
                    <th>Описание</th>
                    <th/>
                </tr>
                </thead>
                <tbody>
                {devices.slice((pageNumber - 1) * DEVICE_ON_PAGE, pageNumber * DEVICE_ON_PAGE).map(device => (
                    <tr key={crypto.randomUUID()}>
                        <td>{device.Id}</td>
                        <td>{device.Name}</td>
                        <td>{device.Description}</td>
                        <td>
                            <p>Подробнее</p>
                            <p>Редактировать</p>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={() => handlePreviousButtonClick()} type="button">Previous</button>
                <button onClick={() => handleNextButtonClick()} type="button">Next</button>
            </div>
        </>
    );
}

export default Devices;
