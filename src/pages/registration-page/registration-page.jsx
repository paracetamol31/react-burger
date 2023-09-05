import registrationPageStyles from "./registration-page.module.css";
import {
    Input,
    Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
    Link,
    useNavigate
} from 'react-router-dom';

import { register } from "../../services/actions/tokens"

export const RegistrationPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onButtonClick = useCallback(() => {
        dispatch(register({
            "email": "ilya.hotchenkov@list.ru",
            "password": "2213",
            "name": "ilya"
        }))
        navigate("/constructor");
    }, [navigate]);

    return (
        <section className={registrationPageStyles.registrationPageWrapper}>
            <div className={registrationPageStyles.registrationPage}>
                <span className={`${registrationPageStyles.title} mb-6 text text_type_main-medium`}>Регистрация</span>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    extraClass={`${registrationPageStyles.inputs} mb-6`}
                />
                <Input
                    type={'text'}
                    placeholder={'E-mail'}
                    extraClass={`${registrationPageStyles.inputs} mb-6`}
                />
                <Input
                    type={'text'}
                    placeholder={'Пароль'}
                    icon={'ShowIcon'}
                    extraClass={`${registrationPageStyles.inputs} mb-6`}
                />

                <Button
                    extraClass={`${registrationPageStyles.button} text text_type_main-default mb-20`}
                    onClick={onButtonClick}
                >
                    Зарегестрироваться
                </Button>
                <span className={`text text_type_main-default text_color_inactive`}>
                    <span>Уже зарегистрированы? </span>
                    <Link className={registrationPageStyles.linkText} to='/login'>
                        Войти
                    </Link>
                </span>
            </div>
        </section>
    );
}