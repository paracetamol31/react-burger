import { FC, useCallback } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import appHeaderStyles from "./app-header.module.css";
import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

import menuItem, { IPropsMenuItem } from "../menu-item/menu-item";
import {
    burgerConstructor,
    orderFeed,
    userProfile
} from "../../services/actions/header";
import { useSelector } from "../../services/hooks";

const AppHeader: FC = () => {
    const { currentItem } = useSelector((state) => state.header);
    const navigate: NavigateFunction = useNavigate();

    const ConstructorTab: React.FC<IPropsMenuItem> = menuItem({
        Icon: BurgerIcon,
        isTarget: currentItem === burgerConstructor
    });

    const OrderFeedTab: React.FC<IPropsMenuItem> = menuItem({
        Icon: ListIcon,
        isTarget: currentItem === orderFeed
    });

    const PersonalAccountTab: React.FC<IPropsMenuItem> = menuItem({
        Icon: ProfileIcon,
        isTarget: currentItem === userProfile
    });

    const onClickByLogo = useCallback(() => {
        navigate("/");
    }, [navigate]);

    return (
        <header className={appHeaderStyles.header}>
            <div className={appHeaderStyles.container}>
                <div className={`${appHeaderStyles.sector} ${appHeaderStyles.rightSector}`}>
                    <Link className={appHeaderStyles.link} to='/'>
                        <ConstructorTab text="Конструктор" />
                    </Link>
                    <Link className={appHeaderStyles.link} to='/feed'>
                        <OrderFeedTab text="Лента заказов" />
                    </Link>
                </div>
                <div className={`${appHeaderStyles.sector} ${appHeaderStyles.centralSector}`} onClick={onClickByLogo}>
                    <Logo />
                </div>
                <div className={`${appHeaderStyles.sector} ${appHeaderStyles.leftSector}`} >
                    <Link className={appHeaderStyles.link} to='/profile'>
                        <PersonalAccountTab text="Личный кабинет" />
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default AppHeader;