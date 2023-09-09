import { useEffect } from "react";
import {
    Link,
    Navigate,
    useNavigate
} from "react-router-dom";
import resetPasswordPageStyles from "./reset-password-page.module.css";
import {
    Input,
    Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    resetPassword
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

export const ResetPasswordPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { password, code } = useSelector(state => state.authorizationInputFields.resetPasswordPage);
    const { isStartedPasswordReset, isResetPassword } = useSelector(state => state.routing);
    const { userInfo } = useSelector(state => state.user);

    const onButtonClick = useCallback(() => {
        dispatch(resetPassword(password, code, () => navigate("/login", { replace: true })))
    }, [navigate, dispatch, password, code]);

    const onInputsChanged = useCallback((event) => {
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
    }, []);

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
                <Input
                    name={passwordInput}
                    type={'text'}
                    placeholder={'Введите новый пароль'}
                    icon={'ShowIcon'}
                    extraClass={`${resetPasswordPageStyles.inputs} mb-6`}
                    value={password}
                    onChange={onInputsChanged}
                />
                <Input
                    name={codeInput}
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    extraClass={`${resetPasswordPageStyles.inputs} mb-6`}
                    value={code}
                    onChange={onInputsChanged}
                />

                <Button
                    htmlType="button"
                    type="primary"
                    extraClass={`${resetPasswordPageStyles.button} text text_type_main-default mb-20`}
                    onClick={onButtonClick}
                >
                    Сохранить
                </Button>
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