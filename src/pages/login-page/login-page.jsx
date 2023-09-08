import loginPageStyles from "./login-page.module.css";
import {
    Input,
    Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback } from "react";
import {
    Link,
    useNavigate
} from "react-router-dom";
import {
    useDispatch,
    useSelector
} from "react-redux";

import { login } from "../../services/actions/user";
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
    
    const onButtonClick = useCallback(() => {
        dispatch(
            login(
                { email, password },
                () => (navigate("/"))
            )
        );
    }, [navigate, dispatch, email, password]);

    const onInputsChanged = useCallback((event) => {
        dispatch(changeInputValue({
            pageName: loginPage,
            inputName: event.target.name,
            value: event.target.value
        }));
    }, [dispatch]);

    return (
        <section className={loginPageStyles.loginPageWrapper}>
            <div className={loginPageStyles.loginPage}>
                <span className={`${loginPageStyles.title} mb-6 text text_type_main-medium`}>Вход</span>
                <Input
                    name={emailInput}
                    type={'text'}
                    placeholder={'E-mail'}
                    extraClass={`${loginPageStyles.inputs} mb-6`}
                    onChange={onInputsChanged}
                    value={email}
                />
                <Input
                    name={passwordInput}
                    type={'password'}
                    placeholder={'Пароль'}
                    icon={'ShowIcon'}
                    extraClass={`${loginPageStyles.inputs} mb-6`}
                    onChange={onInputsChanged}
                    value={password}
                />

                <Button
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
                    <Link className={loginPageStyles.linkText} to="/forgotPassword">
                        Восстановить пароль
                    </Link>
                </span>
            </div>
        </section>
    );
}