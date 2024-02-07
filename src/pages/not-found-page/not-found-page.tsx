import {Link} from 'react-router-dom';
import {AppRoutes} from '../../const/app-routes';
import {ReactElement} from 'react';

function NotFoundPage(): ReactElement {
    return (
        <div className="not-found-page">
            <p>404. Страница не найдена</p>
            <Link to={AppRoutes.Main}>Вернуться на главную</Link>
        </div>
    );
}

export default NotFoundPage;
