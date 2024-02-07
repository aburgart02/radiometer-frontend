import {FormEvent, ReactElement, useRef} from 'react';
import {loginAction} from '../../store/api-actions/api-actions';
import {useAppDispatch} from '../../hooks/hooks';

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
        <div>
            <form action="#" onSubmit={handleSubmit}>
                <div>
                    <div>
                        <input ref={loginRef} placeholder="Логин" name="user-login" id="user-login"/>
                    </div>
                    <div>
                        <input ref={passwordRef} type="password" placeholder="Пароль" name="user-password" id="user-password"/>
                    </div>
                </div>
                <div>
                    <button type="submit">Sign in</button>
                </div>
            </form>
        </div>
    );
}

export default SignIn;
