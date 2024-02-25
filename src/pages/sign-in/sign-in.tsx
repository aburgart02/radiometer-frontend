import React, {FormEvent, ReactElement, useRef} from 'react';
import {loginAction} from '../../store/api-actions/auth-actions/auth-actions';
import {useAppDispatch} from '../../hooks/hooks';
import './sign-in.css'
import {FormattedMessage} from "react-intl";

function SignIn(): ReactElement {
    const loginRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);

    const dispatch = useAppDispatch();

    const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        dispatch(loginAction({
            login: loginRef.current?.value,
            password: passwordRef.current?.value
        }));
    };

    return (
        <div className="login-container">
            <h2><FormattedMessage id="authorization"/></h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="login"><FormattedMessage id="login"/>:</label>
                    <input ref={loginRef} type="text" id="login" name="login" placeholder="Логин" required/>
                </div>
                <div className="input-group">
                    <label htmlFor="password"><FormattedMessage id="password"/>:</label>
                    <input ref={passwordRef} type="password" id="password" name="password" placeholder="Пароль" required/>
                </div>
                <button type="submit"><FormattedMessage id="log_in"/></button>
            </form>
        </div>
    );
}

export default SignIn;
