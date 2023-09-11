import registrationPageStyles from "./registration-page.module.css";
import {
    EmailInput,
    Button,
    PasswordInput
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback } from "react";
import {
    useDispatch,
    useSelector
} from "react-redux";
import {
    Link,
    Navigate,
    useNavigate
} from 'react-router-dom';
import { register } from "../../services/actions/user";
import {
    nameInput,
    emailInput,
    passwordInput,
    registrationPage
} from "../../services/reducers/authorizationInputFields";
import {
    changeInputValue
} from "../../services/actions/authorizationInputFields";

export const RegistrationPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { name, email, password } = useSelector(state => state.authorizationInputFields.registrationPage);
    const { userInfo } = useSelector(state => state.user);
    const { savedLocation } = useSelector(state => state.routing);

    const onButtonClick = useCallback(() => {
        dispatch(
            register(
                { name, email, password },
                () => navigate(savedLocation.pathname, { replace: true })
            )
        );
    }, [navigate, dispatch, name, email, password, savedLocation]);

    const onInputsChanged = useCallback((event) => {
        dispatch(changeInputValue({
            pageName: registrationPage,
            inputName: event.target.name,
            value: event.target.value
        }));
    }, [dispatch]);

    return !userInfo
        ? <section className={registrationPageStyles.registrationPageWrapper}>
            <div className={registrationPageStyles.registrationPage}>
                <span className={`${registrationPageStyles.title} mb-6 text text_type_main-medium`}>Регистрация</span>
                <EmailInput
                    name={nameInput}
                    placeholder={'Имя'}
                    extraClass={`${registrationPageStyles.inputs} mb-6`}
                    error={false}
                    onChange={onInputsChanged}
                    value={name}
                />
                <EmailInput
                    name={emailInput}
                    placeholder={'E-mail'}
                    extraClass={`${registrationPageStyles.inputs} mb-6`}
                    onChange={onInputsChanged}
                    value={email}
                />
                <PasswordInput
                    name={passwordInput}
                    placeholder={'Пароль'}
                    extraClass={`${registrationPageStyles.inputs} mb-6`}
                    onChange={onInputsChanged}
                    value={password}
                />

                <Button
                    htmlType="button"
                    type="primary"
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
        : <Navigate to={savedLocation.pathname || "/"} state={{ background: savedLocation }} replace />;
}