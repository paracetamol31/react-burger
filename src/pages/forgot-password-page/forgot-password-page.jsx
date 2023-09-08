import {
    Link,
    useNavigate
} from "react-router-dom";
import forgotRasswordPageStyles from "./forgot-password-page.module.css";
import {
    Input,
    Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback } from "react";

export const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const onButtonClick = useCallback(() => {
        navigate("/resetPassword");
    }, [navigate]);

    return (
        <section className={forgotRasswordPageStyles.forgotRasswordPageWrapper}>
            <div className={forgotRasswordPageStyles.forgotRasswordPage}>
                <span className={`${forgotRasswordPageStyles.title} mb-6 text text_type_main-medium`}>
                    Восстановление пароля
                </span>
                <Input
                    type={'text'}
                    placeholder={'Укажите E-mail'}
                    extraClass={`${forgotRasswordPageStyles.inputs} mb-6`}
                />

                <Button
                    extraClass={`${forgotRasswordPageStyles.button} text text_type_main-default mb-20`}
                    onClick={onButtonClick}
                >
                    Восстановить
                </Button>
                <span className="text text_type_main-default text_color_inactive">
                    <span >Вспомнили пароль? </span>
                    <Link className={forgotRasswordPageStyles.linkText} to='/login'>
                        Войти
                    </Link>
                </span>
            </div>
        </section>
    );
}