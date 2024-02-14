import React, {ReactElement} from "react";
import '../../../common-styles/action-button.css'
import '../../../common-styles/detailed-page.css'
import {useParams} from "react-router-dom";
import {useAppSelector} from "../../../hooks/hooks";
import browserHistory from "../../../components/history-route/browser-history";
import {getSex} from "../../../utils/get-sex";
import {getUsers} from "../../../store/users/selectors";

function User(): ReactElement {
    const params = useParams();
    const userId = Number(params.id);
    const users = useAppSelector(getUsers);
    const user = users.filter((patient) => patient.Id === userId)[0];

    return (
        <>
            <div className="detailed-page-container">
                <h2>Пользователь</h2>
                <p>
                    <span>Id: </span>{user.Id}
                </p>
                <p>
                    <span>Логин: </span>{user.Login}
                </p>
                <p>
                    <span>Имя: </span>{user.Name}
                </p>
                <p>
                    <span>Фамилия: </span>{user.Surname}
                </p>
                <p>
                    <span>Отчество: </span>{user.Patronymic}
                </p>
                <p>
                    <span>Дата рождения: </span>{user.BirthDate}
                </p>
                <p>
                    <span>Пол: </span>{getSex(user.Sex)}
                </p>
                <p>
                    <span>Роль: </span>{user.Role}
                </p>
                <p>
                    <span>Статус: </span>{user.Revoked ? 'Заблокирован' : 'Не заблокирован'}
                </p>
                <span>Заметки: </span>
                <p>
                    {user.Notes}
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

export default User;
