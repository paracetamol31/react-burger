import {
    Link,
    useNavigate
} from "react-router-dom";
import passwordRecoveryPagesStyles from "./password-recovery-first-page.module.css";
import {
    Input,
    Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback } from "react";

export const PasswordRecoveryFirstPage = () => {
    const navigate = useNavigate();
    const onButtonClick = useCallback(() => {
        navigate("/passwordRecovery2");
    }, [navigate]);

    return (
        <section className={passwordRecoveryPagesStyles.passwordRecoveryPageWrapper}>
            <div className={passwordRecoveryPagesStyles.passwordRecoveryPage}>
                <span className={`${passwordRecoveryPagesStyles.title} mb-6 text text_type_main-medium`}>
                    Восстановление пароля
                </span>
                <Input
                    type={'text'}
                    placeholder={'Укажите E-mail'}
                    extraClass={`${passwordRecoveryPagesStyles.inputs} mb-6`}
                />

                <Button
                    extraClass={`${passwordRecoveryPagesStyles.button} text text_type_main-default mb-20`}
                    onClick={onButtonClick}
                >
                    Восстановить
                </Button>
                <span className="text text_type_main-default text_color_inactive">
                    <span >Вспомнили пароль? </span>
                    <Link className={passwordRecoveryPagesStyles.linkText} to='/login'>
                        Войти
                    </Link>
                </span>
            </div>
        </section>
    );
}