import {Navigate} from 'react-router-dom';
import {AppRoutes} from '../../const/app-routes';
import {ReactElement} from 'react';
import {AuthorizationStatus} from '../../const/authorization-status';

type PrivateRouteProps = {
    children: ReactElement;
    authorizationStatus: AuthorizationStatus;
}

function PrivateRoute({children, authorizationStatus}: PrivateRouteProps): ReactElement {
    return (
        authorizationStatus === AuthorizationStatus.Auth
            ? children
            : <Navigate to={AppRoutes.SignIn} />
    );
}

export default PrivateRoute;
