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
import { IUserInfo, logout } from "../../services/actions/user";
import { useDispatch, useSelector } from "../../services/hocks";
import { RootState } from "../../services/types";

export const ProfilePage: FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userInfo: IUserInfo | null = useSelector((state: RootState) => state.user.userInfo);

    useEffect(() => {
        dispatch(setCurrentMenuHeader({ currentMenuItem: userProfile }));
    }, [dispatch])

    const callLogout = useCallback<React.MouseEventHandler<HTMLSpanElement>>(() => {
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
                placeholder={'Имя'}
                value={userInfo?.name || ""}
                disabled={true}
                icon="EditIcon"
                error={false}
                onChange={() => { }}
                onIconClick={() => { }}
            />
            <EmailInput
                placeholder={'Логин'}
                value={userInfo?.email || ""}
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