import profilePageStyles from "./profile-page.module.css";

import {
    Input
} from "@ya.praktikum/react-developer-burger-ui-components";

export const ProfilePage = () => {
    return <section className={profilePageStyles.wrapperPage}>
        <Input
            type={'text'}
            placeholder={'Имя'}
        />
        <Input
            type={'text'}
            placeholder={'Логин'}
        />
        <Input
            type={'password'}
            placeholder={'Пароль'}
        />
    </section>
}