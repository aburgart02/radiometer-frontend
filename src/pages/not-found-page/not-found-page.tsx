import {Link} from 'react-router-dom';
import {AppRoutes} from '../../const/app-routes';
import React, {ReactElement} from 'react';
import './not-found-page.css'
import {FormattedMessage} from "react-intl";

function NotFoundPage(): ReactElement {
    return (
        <div className="not-found-container">
            <h1>404</h1>
            <p><FormattedMessage id="page_not_found"/></p>
            <Link to={AppRoutes.Main} className={"back-link"}><FormattedMessage id="go_back_to_main_page"/></Link>
        </div>
    );
}

export default NotFoundPage;
