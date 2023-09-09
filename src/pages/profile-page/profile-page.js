import { useSelector, useDispatch } from "react-redux";
import profilePageStyles from "./profile-page.module.css";
import { useCallback, useEffect } from "react";
import {
    EmailInput,
    PasswordInput
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";

import {
    setCurrentMenuHeader,
    userProfile
} from "../../services/actions/header";
import { logout } from "../../services/actions/user";

export const ProfilePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { name, email } = useSelector(state => state.user.userInfo);

    useEffect(() => {
        dispatch(setCurrentMenuHeader(userProfile));
    }, [dispatch])

    const callLogout = useCallback(() => {
        dispatch(logout(() => { navigate("/login") }));
    }, [dispatch, navigate])

    return <section className={profilePageStyles.pageWrapper}>
        <div className={`${profilePageStyles.rightPanel}`} >
            <div className={`${profilePageStyles.menuPanel} mb-20`} >
                <div className={profilePageStyles.menuItem}>
                    <span className="text text_type_main-medium">Профиль</span>
                </div>
                <div className={profilePageStyles.menuItem}>
                    <span className="text text_type_main-medium text_color_inactive">История заказов</span>
                </div>
                <div className={profilePageStyles.menuItem}>
                    <span
                        className="text text_type_main-medium text_color_inactive"
                        onClick={callLogout}
                    >
                        Выход
                    </span>
                </div>
            </div>
            <div className={`${profilePageStyles.menuPanel} footerRightPanel`} >
                <span className="text text_type_main-small text_color_inactive">В этом разделе вы можете изменить свои персональные данные</span>
            </div>
        </div>
        <div className={profilePageStyles.inputsWrapper}>
            <EmailInput
                placeholder={'Имя'}
                value={name}
                isIcon={true}
                error={false}
                onChange={() => { }}
            />
            <EmailInput
                placeholder={'Логин'}
                value={email}
                isIcon={true}
                onChange={() => { }}
            />
            <PasswordInput
                placeholder={'Пароль'}
                value={""}
                onChange={() => { }}
                icon="EditIcon"
            />
        </div>
    </section>
}