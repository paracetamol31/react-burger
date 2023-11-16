import { FC, useEffect } from "react";
import {
    Link,
    Navigate,
    useNavigate
} from "react-router-dom";
import resetPasswordPageStyles from "./reset-password-page.module.css";
import {
    PasswordInput,
    Button,
    Input
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback } from "react";

import {
    resetPassword,
    getUserInfo
} from "../../services/actions/user";
import {
    changeInputValue,
    clearResetPasswordValue
} from "../../services/actions/authorizationInputFields";
import {
    codeInput,
    passwordInput,
    resetPasswordPage
} from "../../services/reducers/authorizationInputFields";
import { overPasswordReset } from "../../services/actions/routing";
import { useDispatch, useSelector } from "../../services/hooks";

export const ResetPasswordPage: FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { password, code } = useSelector(state => state.authorizationInputFields.resetPasswordPage);
    const { isStartedPasswordReset, isResetPassword } = useSelector(state => state.routing);
    const { userInfo, isUserInfoLoaded } = useSelector(state => state.user);

    const onSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(resetPassword(password, code, () => navigate("/login", { replace: true })))
    }, [navigate, dispatch, password, code]);

    const onInputsChanged = useCallback<(e: React.ChangeEvent<HTMLInputElement>) => void>((event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeInputValue({
            pageName: resetPasswordPage,
            inputName: event.target.name,
            value: event.target.value
        }));
    }, [dispatch]);

    useEffect(() => {
        return (() => {
            dispatch(overPasswordReset());
            dispatch(clearResetPasswordValue());
        })
    }, [dispatch]);

    useEffect(() => {
        if (!userInfo && !isUserInfoLoaded) {
            dispatch(getUserInfo());
        };
    }, [dispatch, userInfo, isUserInfoLoaded]);

    if (!isUserInfoLoaded) {
        return null
    }

    if (userInfo) {
        return <Navigate to="/" replace />;
    }

    if (isResetPassword) {
        return <Navigate to="/login" replace />;
    }

    return isStartedPasswordReset
        ?
        <section className={resetPasswordPageStyles.resetPasswordPageWrapper}>
            <div className={resetPasswordPageStyles.resetPasswordPage}>
                <span className={`${resetPasswordPageStyles.title} mb-6 text text_type_main-medium`}>
                    Восстановление пароля
                </span>
                <form className={resetPasswordPageStyles.form} onSubmit={onSubmit}>
                    <PasswordInput
                        name={passwordInput}
                        placeholder={'Введите новый пароль'}
                        icon={'ShowIcon'}
                        extraClass={`${resetPasswordPageStyles.inputs} mb-6`}
                        value={password}
                        onChange={onInputsChanged}
                        //TODO: отключена вваледация полей ввода
                        {...{ error: false }}
                    />
                    <Input
                        name={codeInput}
                        placeholder={'Введите код из письма'}
                        value={code}
                        extraClass={`${resetPasswordPageStyles.inputs} mb-6`}
                        onChange={onInputsChanged}
                    />
                    <Button
                        htmlType="submit"
                        type="primary"
                        extraClass={`${resetPasswordPageStyles.button} text text_type_main-default mb-20`}
                    >
                        Сохранить
                    </Button>
                </form>
                <span className="text text_type_main-default text_color_inactive">
                    <span >Вспомнили пароль? </span>
                    <Link className={resetPasswordPageStyles.linkText} to='/login' replace>
                        Войти
                    </Link>
                </span>
            </div>
        </section>
        : <Navigate to="/forgot-password" replace />;
}