import { useSelector, useDispatch } from "react-redux";
import profilePageStyles from "./profile-page.module.css";
import { FC, useCallback, useEffect } from "react";
import {
    EmailInput,
    PasswordInput,
    Input
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";

import {
    setCurrentMenuHeader,
    userProfile
} from "../../services/actions/header";
import { logout } from "../../services/actions/user";

export const ProfilePage: FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { name, email } = useSelector((state: any) => state.user.userInfo);

    useEffect(() => {
        dispatch(setCurrentMenuHeader(userProfile));
    }, [dispatch])

    const callLogout = useCallback<React.MouseEventHandler<HTMLSpanElement>>(() => {
        dispatch(logout(() => { navigate("/login") }) as any);
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
                placeholder={'Имя'}
                value={name}
                disabled={true}
                icon="EditIcon"
                error={false}
                onChange={() => { }}
                onIconClick={() => { }}
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