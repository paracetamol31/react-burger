import {
    Link,
    Navigate,
    useNavigate
} from "react-router-dom";
import forgotPasswordPageStyles from "./forgot-password-page.module.css";
import {
    EmailInput,
    Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useCallback, useEffect } from "react";

import { changeInputValue } from "../../services/actions/authorizationInputFields";
import {
    forgotPassword,
    getUserInfo
} from "../../services/actions/user";
import {
    emailInput,
    forgotPasswordPage
} from "../../services/reducers/authorizationInputFields";
import { useDispatch, useSelector } from "../../services/hooks";

export const ForgotPasswordPage: FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { email } = useSelector(state => state.authorizationInputFields.forgotPasswordPage);
    const { userInfo, isUserInfoLoaded } = useSelector(state => state.user);

    const onSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(forgotPassword(email, () => navigate("/reset-password")))
    }, [navigate, dispatch, email]);

    const onInputsChanged = useCallback<(e: React.ChangeEvent<HTMLInputElement>) => void>((event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeInputValue({
            pageName: forgotPasswordPage,
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
        ? <section className={forgotPasswordPageStyles.forgotPasswordPageWrapper}>
            <div className={forgotPasswordPageStyles.forgotPasswordPage}>
                <span className={`${forgotPasswordPageStyles.title} mb-6 text text_type_main-medium`} >
                    Восстановление пароля
                </span>
                <form className={forgotPasswordPageStyles.form} onSubmit={onSubmit} >
                    <EmailInput
                        name={emailInput}
                        placeholder={'Укажите E-mail'}
                        extraClass={`${forgotPasswordPageStyles.inputs} mb-6`}
                        value={email}
                        onChange={onInputsChanged}
                        //TODO: отключена вваледация полей ввода
                        {...{ error: false }}
                    />

                    <Button
                        htmlType="submit"
                        type="primary"
                        extraClass={`${forgotPasswordPageStyles.button} text text_type_main-default mb-20`}
                    >
                        Восстановить
                    </Button>
                </form>
                <span className="text text_type_main-default text_color_inactive">
                    <span >Вспомнили пароль? </span>
                    <Link className={forgotPasswordPageStyles.linkText} to='/login'>
                        Войти
                    </Link>
                </span>
            </div>
        </section>
        : <Navigate to="/" replace />;
}