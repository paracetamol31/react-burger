import headerMenuItem from "../header-menu-item/header-menu-item";
import appHeaderStyles from "./app-header.module.css";
import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = (props) => {
    const СonstructorTab = headerMenuItem(BurgerIcon, true);
    const OrderFeedTab = headerMenuItem(ListIcon)
    const PersonalAccountTa = headerMenuItem(ProfileIcon);
    return (
        <header className={appHeaderStyles.header}>
            <div className={appHeaderStyles.container}>
                <div className={`${appHeaderStyles.sector} ${appHeaderStyles.rightSector}`}>
                    {/* TODO: После добавления роутинга теги <p> будут заменены */}
                    <p href=""><СonstructorTab text="Конструктор" /></p>
                    <p href="" className="ml-2"><OrderFeedTab text="Лента заказов" /></p>
                </div>
                <div className={`${appHeaderStyles.sector} ${appHeaderStyles.centralSector}`}>{<Logo />}</div>
                <div className={`${appHeaderStyles.sector} ${appHeaderStyles.leftSector}`}>
                    <p href=""><PersonalAccountTa text="Личный кабинет" /></p>
                </div>
            </div>
        </header>
    )
}

export default AppHeader;