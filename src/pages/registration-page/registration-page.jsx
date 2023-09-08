import registrationPageStyles from "./registration-page.module.css";
import {
    Input,
    Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback } from "react";
import {
    useDispatch,
    useSelector
} from "react-redux";
import {
    Link,
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
    
    const onButtonClick = useCallback(() => {
        dispatch(
            register(
                { name, email, password },
                () => navigate("/")
            )
        );
    }, [navigate, dispatch, name, email, password]);

    const onInputsChanged = useCallback((event) => {
        dispatch(changeInputValue({
            pageName: registrationPage,
            inputName: event.target.name,
            value: event.target.value
        }));
    }, [dispatch]);

    return (
        <section className={registrationPageStyles.registrationPageWrapper}>
            <div className={registrationPageStyles.registrationPage}>
                <span className={`${registrationPageStyles.title} mb-6 text text_type_main-medium`}>Регистрация</span>
                <Input
                    name={nameInput}
                    type={'text'}
                    placeholder={'Имя'}
                    extraClass={`${registrationPageStyles.inputs} mb-6`}
                    onChange={onInputsChanged}
                    value={name}
                />
                <Input
                    name={emailInput}
                    type={'text'}
                    placeholder={'E-mail'}
                    extraClass={`${registrationPageStyles.inputs} mb-6`}
                    onChange={onInputsChanged}
                    value={email}
                />
                <Input
                    name={passwordInput}
                    type={'password'}
                    placeholder={'Пароль'}
                    icon={'ShowIcon'}
                    extraClass={`${registrationPageStyles.inputs} mb-6`}
                    onChange={onInputsChanged}
                    value={password}
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