import {Link} from 'react-router-dom';
import {AppRoutes} from '../../const/app-routes';
import {ReactElement} from 'react';
import './not-found-page.css'

function NotFoundPage(): ReactElement {
    return (
        <div className="not-found-container">
            <h1>404</h1>
            <p>Страница не найдена</p>
            <Link to={AppRoutes.Main} className={"back-link"}>Вернуться на главную</Link>
        </div>
    );
}

export default NotFoundPage;
