import {
    Link,
    useNavigate
} from "react-router-dom";
import resetPasswordPageStyles from "./reset-password-page.module.css";
import {
    Input,
    Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback } from "react";

export const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const onButtonClick = useCallback(() => {
        navigate("/");
    }, [navigate]);

    return (
        <section className={resetPasswordPageStyles.resetPasswordPageWrapper}>
            <div className={resetPasswordPageStyles.resetPasswordPage}>
                <span className={`${resetPasswordPageStyles.title} mb-6 text text_type_main-medium`}>
                    Восстановление пароля
                </span>
                <Input
                    type={'text'}
                    placeholder={'Введите новый пароль'}
                    icon={'ShowIcon'}
                    extraClass={`${resetPasswordPageStyles.inputs} mb-6`}
                />
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    extraClass={`${resetPasswordPageStyles.inputs} mb-6`}
                />

                <Button
                    extraClass={`${resetPasswordPageStyles.button} text text_type_main-default mb-20`}
                    onClick={onButtonClick}
                >
                    Сохранить
                </Button>
                <span className="text text_type_main-default text_color_inactive">
                    <span >Вспомнили пароль? </span>
                    <Link className={resetPasswordPageStyles.linkText} to='/login'>
                        Войти
                    </Link>
                </span>
            </div>
        </section>
    );
}