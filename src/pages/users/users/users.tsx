import React, {ReactElement, useState} from "react";
import {useAppSelector} from "../../../hooks/hooks";
import '../../../common-styles/table.css'
import '../../../common-styles/pagination.css'
import '../../../common-styles/action-button.css'
import Pagination from "../../../components/pagination/pagination";
import {Link, NavLink} from "react-router-dom";
import {AppRoutes} from "../../../const/app-routes";
import {getSex} from "../../../utils/get-sex";
import {formatDate} from "../../../utils/format-date";
import {getUsers} from "../../../store/users/selectors";
import {FormattedMessage} from "react-intl";
import {getFullName} from "../../../utils/get-full-name";

const USERS_ON_PAGE = 8;

function Users(): ReactElement {
    const [userSearchValue, setUserSearchValue] = useState('');
    const users = useAppSelector(getUsers);
    const [pageNumber, setPageNumber] = React.useState(1);

    const handlePreviousButtonClick = () => {
        setPageNumber(pageNumber === 1 ? 1 : pageNumber - 1);
    };

    const handleNextButtonClick = () => {
        setPageNumber(pageNumber === Math.ceil(users.length / USERS_ON_PAGE) ? pageNumber: pageNumber + 1);
    };

    return (
        <>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Введите ФИО пользователя"
                    value={userSearchValue}
                    onChange={(e) => setUserSearchValue(e.target.value)}
                />
            </div>
            <table>
                <thead>
                <tr>
                    <th><FormattedMessage id="id"/></th>
                    <th><FormattedMessage id="login"/></th>
                    <th><FormattedMessage id="name"/></th>
                    <th><FormattedMessage id="surname"/></th>
                    <th><FormattedMessage id="patronymic"/></th>
                    <th><FormattedMessage id="birthdate"/></th>
                    <th><FormattedMessage id="sex"/></th>
                    <th><FormattedMessage id="notes"/></th>
                    <th><FormattedMessage id="role"/></th>
                    <th><FormattedMessage id="status"/></th>
                    <th/>
                </tr>
                </thead>
                <tbody>
                {users
                    .filter(user => getFullName(user).toLowerCase().includes(userSearchValue.toLowerCase()))
                    .slice()
                    .sort((a,b) => Number(a.Id) - Number(b.Id))
                    .slice((pageNumber - 1) * USERS_ON_PAGE, pageNumber * USERS_ON_PAGE)
                    .map(user => (
                        <tr key={user.Id}>
                            <td>{user.Id}</td>
                            <td>{user.Login}</td>
                            <td>{user.Name}</td>
                            <td>{user.Surname}</td>
                            <td>{user.Patronymic}</td>
                            <td>{user.BirthDate && formatDate(user.BirthDate)}</td>
                            <td>{getSex(user.Sex)}</td>
                            <td>{user.Notes}</td>
                            <td>{user.Role}</td>
                            <td>{user.Revoked ? <FormattedMessage id="blocked"/> : <FormattedMessage id="not_blocked"/>}</td>
                            <td>
                                <li><NavLink to={AppRoutes.User(user.Id)}><FormattedMessage id="more_detailed"/></NavLink></li>
                                <li><NavLink to={AppRoutes.EditUser(user.Id)}><FormattedMessage id="edit"/></NavLink></li>
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
