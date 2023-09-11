import {
    EmailInput,
    Button,
    PasswordInput
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, useEffect } from "react";
import {
    Link,
    Navigate,
    useNavigate
} from "react-router-dom";
import {
    useDispatch,
    useSelector
} from "react-redux";

import loginPageStyles from "./login-page.module.css";
import { login, getUserInfo } from "../../services/actions/user";
import {
    emailInput,
    passwordInput,
    loginPage
} from "../../services/reducers/authorizationInputFields";
import { changeInputValue } from "../../services/actions/authorizationInputFields";

export const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { email, password } = useSelector(state => state.authorizationInputFields.loginPage);
    const { userInfo, isUserInfoLoaded } = useSelector(state => state.user);
    const { savedLocation } = useSelector(state => state.routing);

    const onButtonClick = useCallback(() => {
        dispatch(
            login(
                { email, password },
                () => (navigate(savedLocation.pathname, { replace: true }))
            )
        );
    }, [navigate, dispatch, email, password, savedLocation.pathname]);

    const onInputsChanged = useCallback((event) => {
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
                    error={false}
                    icon="ShowIcon"
                    value={password}
                />

                <Button
                    htmlType="button"
                    type="primary"
                    extraClass={`${loginPageStyles.button} text text_type_main-default mb-20`}
                    onClick={onButtonClick}
                >
                    Войти
                </Button>
                <span className={`mb-4 text text_type_main-default text_color_inactive`}>
                    <span>Вы - новый пользователь? </span>
                    <Link className={loginPageStyles.linkText} to='/registration'>
                        Зарегестрироваться
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