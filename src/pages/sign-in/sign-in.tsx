import {FormEvent, ReactElement, useRef} from 'react';
import {loginAction} from '../../store/api-actions/api-actions';
import {useAppDispatch} from '../../hooks/hooks';
import './sign-in.css'

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
            <h2>Авторизация</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="login">Логин:</label>
                    <input ref={loginRef} type="text" id="login" name="login" placeholder="Логин" required/>
                </div>
                <div className="input-group">
                    <label htmlFor="password">Пароль:</label>
                    <input ref={passwordRef} type="password" id="password" name="password" placeholder="Пароль" required/>
                </div>
                <button type="submit">Войти в аккаунт</button>
            </form>
        </div>
    );
}

export default SignIn;
