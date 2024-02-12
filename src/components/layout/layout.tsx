import React, {ReactElement} from 'react';
import './layout.css'
import {NavLink} from 'react-router-dom';
import {AppRoutes} from "../../const/app-routes";
import {useDispatch} from "react-redux";
import {logout} from "../../store/auth-data/auth-data";
import {useAppSelector} from "../../hooks/hooks";
import {getRole} from "../../store/auth-data/selectors";
import {Roles} from "../../const/roles";

type PrivateRouteProps = {
    children: ReactElement;
}

const Layout =({children} : PrivateRouteProps) : ReactElement => {
    const role = useAppSelector(getRole);

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(logout());
    };

    return(
        <>
            <div className="navigation">
                <ul>
                    <li><NavLink to={AppRoutes.Measurements}>Исследования</NavLink></li>
                    <li><NavLink to={AppRoutes.Patients}>Пациенты</NavLink></li>
                    <li><NavLink to={AppRoutes.Devices}>Устройства</NavLink></li>
                    {role === Roles.Admin && <li><NavLink to={AppRoutes.Logs}>События</NavLink></li>}
                    {role === Roles.Admin && <li><NavLink to={AppRoutes.Tokens}>Токены</NavLink></li>}
                    <li onClick={() => handleClick()}><NavLink to={AppRoutes.SignIn}>Выйти</NavLink></li>
                </ul>
            </div>
            <div className="content">
                {children}
            </div>
        </>
    )
}

export default Layout;