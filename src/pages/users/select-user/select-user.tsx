import React, {ReactElement, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import '../../../common-styles/table.css'
import '../../../common-styles/pagination.css'
import '../../../common-styles/action-button.css'
import '../../../common-styles/search.css'
import '../../../common-styles/select-buttons.css'
import Pagination from "../../../components/pagination/pagination";
import {getUsers} from "../../../store/users/selectors";
import browserHistory from "../../../components/history-route/browser-history";
import {setUserId} from "../../../store/data/data";
import {AppRoutes} from "../../../const/app-routes";
import {Link} from "react-router-dom";
import {getFullName} from "../../../utils/get-full-name";
import {formatDate} from "../../../utils/format-date";
import {getUserId} from "../../../store/data/selectors";
import {FormattedMessage} from "react-intl";

const USERS_ON_PAGE = 8;

function Users(): ReactElement {
    const [searchValue, setSearchValue] = useState('');
    const users = useAppSelector(getUsers);
    const userId = useAppSelector(getUserId);
    const [pageNumber, setPageNumber] = React.useState(1);
    const dispatch = useAppDispatch();

    const handlePreviousButtonClick = () => {
        setPageNumber(pageNumber === 1 ? 1 : pageNumber - 1);
    };

    const handleNextButtonClick = () => {
        setPageNumber(pageNumber === Math.ceil(users.length / USERS_ON_PAGE) ? pageNumber: pageNumber + 1);
    };

    const handleSelectButtonClick = (id: number) => {
        dispatch(setUserId(id));
        browserHistory.back();
    };

    return (
        <>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Введите ФИО"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
            </div>
            <table>
                <thead>
                <tr>
                    <th><FormattedMessage id="id"/></th>
                    <th><FormattedMessage id="name"/></th>
                    <th><FormattedMessage id="surname"/></th>
                    <th><FormattedMessage id="patronymic"/></th>
                    <th><FormattedMessage id="birthdate"/></th>
                    <th/>
                </tr>
                </thead>
                <tbody>
                {users
                    .filter(user =>
                        getFullName(user).toLowerCase().includes(searchValue.toLowerCase()))
                    .sort((a,b) => Number(a.Id) - Number(b.Id))
                    .slice((pageNumber - 1) * USERS_ON_PAGE, pageNumber * USERS_ON_PAGE)
                    .map(user => (
                        <tr key={user.Id}>
                            <td>{user.Id}</td>
                            <td>{user.Name}</td>
                            <td>{user.Surname}</td>
                            <td>{user.Patronymic}</td>
                            <td>{user.BirthDate && formatDate(user.BirthDate)}</td>
                            <td>
                                <button className={userId === user.Id ? 'selected-button' : 'unselected-button'} onClick={() => {
                                    handleSelectButtonClick(user.Id);
                                }
                                }><FormattedMessage id="select"/></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination handlePreviousButtonClick={handlePreviousButtonClick} handleNextButtonClick={handleNextButtonClick}/>
            <Link to={AppRoutes.AddUser} className="action-button"><FormattedMessage id="add"/></Link>
        </>
    );
}

export default Users;
