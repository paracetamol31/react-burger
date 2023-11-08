import { EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components"
import { FC, useEffect } from "react"

import userProfileSettingsPageStyles from "./user-profile-settings-page.module.css";
import { IUserInfo } from "../../services/actions/user";
import { useDispatch, useSelector } from "../../services/hooks";
import { setCurrentMenuProfilePanel } from "../../services/actions/profile";

export const UserProfileSettingsPage: FC = () => {
    const userInfo: IUserInfo | null = useSelector(state => state.user.userInfo);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCurrentMenuProfilePanel(
            {
                menuItem: "menuItemProfile",
                footerText: "В этом разделе вы можете изменить свои персональные данные"
            }
        ))
    }, [dispatch]);

    return (
        <section className={userProfileSettingsPageStyles.inputsWrapper}>
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
        </section>
    )
}