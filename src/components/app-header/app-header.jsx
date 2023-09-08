import { Link } from "react-router-dom";
import headerMenuItem from "../header-menu-item/header-menu-item";
import appHeaderStyles from "./app-header.module.css";
import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from "react-redux";

import {
    burgerConstructor,
    orderFeed,
    userProfile
} from "../../services/actions/header";

const AppHeader = () => {
    const { currentItem } = useSelector(state => state.header);

    const ConstructorTab = headerMenuItem(BurgerIcon, currentItem === burgerConstructor);
    const OrderFeedTab = headerMenuItem(ListIcon, currentItem === orderFeed)
    const PersonalAccountTab = headerMenuItem(ProfileIcon, currentItem === userProfile);

    return (
        <header className={appHeaderStyles.header}>
            <div className={appHeaderStyles.container}>
                <div className={`${appHeaderStyles.sector} ${appHeaderStyles.rightSector}`}>
                    <Link className={appHeaderStyles.link} to='/'>
                        <ConstructorTab text="Конструктор" />
                    </Link>
                    <Link className={appHeaderStyles.link} to='/404'>
                        <OrderFeedTab text="Лента заказов" />
                    </Link>
                </div>
                <div className={`${appHeaderStyles.sector} ${appHeaderStyles.centralSector}`}>{<Logo />}</div>
                <div className={`${appHeaderStyles.sector} ${appHeaderStyles.leftSector}`}>
                    <Link className={appHeaderStyles.link} to='/profile'>
                        <PersonalAccountTab text="Личный кабинет" />
                    </Link>
                </div>
            </div>
        </header>
    )
}



export default AppHeader;