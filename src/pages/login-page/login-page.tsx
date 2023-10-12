import {
    EmailInput,
    Button,
    PasswordInput
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useCallback, useEffect } from "react";
import {
    Link,
    Navigate,
    useNavigate
} from "react-router-dom";

import loginPageStyles from "./login-page.module.css";
import { login, getUserInfo } from "../../services/actions/user";
import {
    emailInput,
    passwordInput,
    loginPage
} from "../../services/reducers/authorizationInputFields";
import { changeInputValue } from "../../services/actions/authorizationInputFields";
import { useDispatch, useSelector } from "../../services/hocks";
import { RootState } from "../../services/types";

export const LoginPage: FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { email, password } = useSelector((state: RootState) => state.authorizationInputFields.loginPage);
    const { userInfo, isUserInfoLoaded } = useSelector((state: RootState) => state.user);
    const { savedLocation } = useSelector((state: RootState) => state.routing);

    const onSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(
            login(
                { email, password },
                () => (navigate(savedLocation.pathname, { replace: true }))
            )
        );
    }, [navigate, dispatch, email, password, savedLocation.pathname]);

    const onInputsChanged = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeInputValue({
            pageName: loginPage,
            inputName: event.target.name,
            value: event.target.value
        }));
    }, [dispatch]);

    useEffect(() => {
        if (!userInfo && !isUserInfoLoaded) {
            dispatch(getUserInfo());
        };
    }, [dispatch, userInfo, isUserInfoLoaded]);

    if (!isUserInfoLoaded) {
        return null
    }

    return !userInfo
        ? <section className={loginPageStyles.loginPageWrapper}>
            <div className={loginPageStyles.loginPage}>
                <span className={`${loginPageStyles.title} mb-6 text text_type_main-medium`}>Вход</span>
                <form className={loginPageStyles.form} onSubmit={onSubmit}>
                    <EmailInput
                        name={emailInput}
                        placeholder={'E-mail'}
                        extraClass={`${loginPageStyles.inputs} mb-6`}
                        onChange={onInputsChanged}
                        value={email}
                    />
                    <PasswordInput
                        name={passwordInput}
                        placeholder={'Пароль'}
                        extraClass={`${loginPageStyles.inputs} mb-6`}
                        onChange={onInputsChanged}
                        icon="ShowIcon"
                        value={password}
                    />

                    <Button
                        htmlType="submit"
                        type="primary"
                        extraClass={`${loginPageStyles.button} text text_type_main-default mb-20`}
                    >
                        Войти
                    </Button>
                </form>
                <span className={`mb-4 text text_type_main-default text_color_inactive`}>
                    <span>Вы - новый пользователь? </span>
                    <Link className={loginPageStyles.linkText} to='/registration'>
                        Зарегистрироваться
                    </Link>
                </span>
                <span className="text text_type_main-default text_color_inactive">
                    <span >Забыли пароль? </span>
                    <Link className={loginPageStyles.linkText} to="/forgot-password">
                        Восстановить пароль
                    </Link>
                </span>
            </div>
        </section>
        : <Navigate to={savedLocation.pathname || "/"} state={{ background: savedLocation }} replace />;
}