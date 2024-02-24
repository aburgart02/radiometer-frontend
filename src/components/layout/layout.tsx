import React, {ReactElement} from 'react';
import './layout.css'
import {NavLink} from 'react-router-dom';
import {AppRoutes} from "../../const/app-routes";
import {useDispatch} from "react-redux";
import {logout} from "../../store/auth-data/auth-data";
import {useAppSelector} from "../../hooks/hooks";
import {getRole} from "../../store/auth-data/selectors";
import {Roles} from "../../const/roles";
import {setLocale} from "../../store/data/data";
import {LOCALES} from "../../lang/locales";
import { FormattedMessage } from 'react-intl'

type PrivateRouteProps = {
    children: ReactElement;
}

const Layout =({children} : PrivateRouteProps) : ReactElement => {
    const role = useAppSelector(getRole);

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(logout());
    };

    const handleSubmitRuButton = () => {
        dispatch(setLocale(LOCALES.RUSSIAN));
    };

    const handleSubmitEnButton = () => {
        dispatch(setLocale(LOCALES.ENGLISH));
    };

    return(
        <>
            <div className="navigation">
                <ul>
                    <li><NavLink to={AppRoutes.Measurements}><FormattedMessage id="researches"/></NavLink></li>
                    <li><NavLink to={AppRoutes.Patients}><FormattedMessage id="patients"/></NavLink></li>
                    <li><NavLink to={AppRoutes.Devices}><FormattedMessage id="devices"/></NavLink></li>
                    {role === Roles.Admin && <li><NavLink to={AppRoutes.Users}><FormattedMessage id="users"/></NavLink></li>}
                    {role === Roles.Admin && <li><NavLink to={AppRoutes.Logs}><FormattedMessage id="logs"/></NavLink></li>}
                    {role === Roles.Admin && <li><NavLink to={AppRoutes.Tokens}><FormattedMessage id="tokens"/></NavLink></li>}
                    <li onClick={() => handleClick()}><NavLink to={AppRoutes.SignIn}><FormattedMessage id="logout"/></NavLink></li>
                </ul>
                <div className="language-buttons">
                    <button onClick={handleSubmitRuButton} type="button">Ru</button>
                    <button onClick={handleSubmitEnButton} type="button">En</button>
                </div>
            </div>
            <div className="content">
                {children}
            </div>
        </>
    )
}

export default Layout;