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
import { useDispatch } from "react-redux";

import { login } from "../../services/actions/tokens"

export const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onButtonClick = useCallback(() => {
        navigate("/constructor");
        dispatch(login({
            "email": "ilya.hotchenkov@list.ru",
            "password": "2213"
        }));
    }, [navigate]);

    return (
        <section className={loginPageStyles.loginPageWrapper}>
            <div className={loginPageStyles.loginPage}>
                <span className={`${loginPageStyles.title} mb-6 text text_type_main-medium`}>Вход</span>
                <Input
                    type={'text'}
                    placeholder={'E-mail'}
                    extraClass={`${loginPageStyles.inputs} mb-6`}
                />
                <Input
                    type={'text'}
                    placeholder={'Пароль'}
                    icon={'ShowIcon'}
                    extraClass={`${loginPageStyles.inputs} mb-6`}
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
                    <Link className={loginPageStyles.linkText} to='/passwordRecovery1'>
                        Восстановить пароль
                    </Link>
                </span>
            </div>
        </section>
    );
}