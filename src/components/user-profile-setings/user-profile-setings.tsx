import { EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components"
import { FC, useEffect } from "react"

import userProfileSetingsStyles from "./user-profile-setings.module.css";
import { IUserInfo } from "../../services/actions/user";
import { useDispatch, useSelector } from "../../services/hocks";
import { RootState } from "../../services/types";
import { setCurrentMenuProfilePanel } from "../../services/actions/profile";

export const UserProfileSetings: FC = () => {
    const userInfo: IUserInfo | null = useSelector((state: RootState) => state.user.userInfo);
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
        <section className={userProfileSetingsStyles.inputsWrapper}>
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