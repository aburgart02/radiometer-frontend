import React, {ReactElement} from "react";
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

const USERS_ON_PAGE = 8;

function Users(): ReactElement {
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
            <table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Логин</th>
                    <th>Имя</th>
                    <th>Фамилия</th>
                    <th>Отчество</th>
                    <th>Дата рождения</th>
                    <th>Пол</th>
                    <th>Заметки</th>
                    <th>Роль</th>
                    <th>Статус</th>
                    <th/>
                </tr>
                </thead>
                <tbody>
                {users
                    .slice()
                    .sort((a,b) => Number(a.Id) - Number(b.Id))
                    .slice((pageNumber - 1) * USERS_ON_PAGE, pageNumber * USERS_ON_PAGE)
                    .map(user => (
                        <tr key={crypto.randomUUID()}>
                            <td>{user.Login}</td>
                            <td>{user.Id}</td>
                            <td>{user.Name}</td>
                            <td>{user.Surname}</td>
                            <td>{user.Patronymic}</td>
                            <td>{user.BirthDate && formatDate(user.BirthDate)}</td>
                            <td>{getSex(user.Sex)}</td>
                            <td>{user.Notes}</td>
                            <td>{user.Role}</td>
                            <td>{user.Revoked ? 'Заблокирован' : 'Не заблокирован'}</td>
                            <td>
                                <li><NavLink to={AppRoutes.User(user.Id)}>Подробнее</NavLink></li>
                                <li><NavLink to={AppRoutes.EditUser(user.Id)}>Редактировать</NavLink></li>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination handlePreviousButtonClick={handlePreviousButtonClick} handleNextButtonClick={handleNextButtonClick}/>
            <Link to={AppRoutes.AddUser} className="action-button">Добавить</Link>
        </>
    );
}

export default Users;
