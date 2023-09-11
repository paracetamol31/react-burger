import {
    Link,
    Navigate,
    useNavigate
} from "react-router-dom";
import forgotRasswordPageStyles from "./forgot-password-page.module.css";
import {
    Input,
    Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { changeInputValue } from "../../services/actions/authorizationInputFields";
import {
    forgotPassword,
    getUserInfo
} from "../../services/actions/user";
import {
    emailInput,
    forgotPasswordPage
} from "../../services/reducers/authorizationInputFields";

export const ForgotPasswordPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { email } = useSelector(state => state.authorizationInputFields.forgotPasswordPage);
    const { userInfo, isUserInfoLoaded } = useSelector(state => state.user);

    const onButtonClick = useCallback(() => {
        dispatch(forgotPassword(email, () => navigate("/reset-password")))
    }, [navigate, dispatch, email]);

    const onInputsChanged = useCallback((event) => {
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
        ? <section className={forgotRasswordPageStyles.forgotRasswordPageWrapper}>
            <div className={forgotRasswordPageStyles.forgotRasswordPage}>
                <span className={`${forgotRasswordPageStyles.title} mb-6 text text_type_main-medium`}>
                    Восстановление пароля
                </span>
                <Input
                    name={emailInput}
                    type={'text'}
                    placeholder={'Укажите E-mail'}
                    extraClass={`${forgotRasswordPageStyles.inputs} mb-6`}
                    value={email}
                    onChange={onInputsChanged}
                />

                <Button
                    htmlType="button"
                    type="primary"
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
        : <Navigate to="/" replace />;
}