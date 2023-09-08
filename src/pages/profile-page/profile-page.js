import { useSelector, useDispatch } from "react-redux";
import profilePageStyles from "./profile-page.module.css";
import { useCallback, useEffect } from "react";
import {
    Input
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
            <Input
                type={'text'}
                placeholder={'Имя'}
                value={name}
                onChange={() => { }}
            />
            <Input
                type={'text'}
                placeholder={'Логин'}
                value={email}
                onChange={() => { }}
            />
            <Input
                type={'password'}
                placeholder={'Пароль'}
                value={""}
                onChange={() => { }}
            />
        </div>
    </section>
}