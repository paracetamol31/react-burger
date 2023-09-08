import headerMenuItem from "../header-menu-item/header-menu-item";
import appHeaderStyles from "./app-header.module.css";
import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
    const ConstructorTab = headerMenuItem(BurgerIcon, true);
    const OrderFeedTab = headerMenuItem(ListIcon)
    const PersonalAccountTa = headerMenuItem(ProfileIcon);
    return (
        <header className={appHeaderStyles.header}>
            <div className={appHeaderStyles.container}>
                <div className={`${appHeaderStyles.sector} ${appHeaderStyles.rightSector}`}>
                    {/* TODO: После добавления роутинга теги <a> будут заменены */}
                    <a className={appHeaderStyles.link} href="/#"><ConstructorTab text="Конструктор" /></a>
                    <a className={`${appHeaderStyles.link} ml-2`} href="/#" ><OrderFeedTab text="Лента заказов" /></a>
                </div>
                <div className={`${appHeaderStyles.sector} ${appHeaderStyles.centralSector}`}>{<Logo />}</div>
                <div className={`${appHeaderStyles.sector} ${appHeaderStyles.leftSector}`}>
                    <a className={appHeaderStyles.link} href="/#"><PersonalAccountTa text="Личный кабинет" /></a>
                </div>
            </div>
        </header>
    )
}



export default AppHeader;