import headerMenuItem from "../header-menu-item/header-menu-item";
import appHeaderStyles from "./app-header.module.css";
import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
    const СonstructorTab = headerMenuItem(BurgerIcon, true);
    const OrderFeedTab = headerMenuItem(ListIcon)
    const PersonalAccountTa = headerMenuItem(ProfileIcon);
    return (
        <header className={appHeaderStyles.header}>
            <div className={appHeaderStyles.container}>
                <div className={`${appHeaderStyles.sector} ${appHeaderStyles.rightSector}`}>
                    {/* TODO: После добавления роутинга теги <div> будут заменены */}
                    <div href=""><СonstructorTab text="Конструктор" /></div>
                    <div href="" className="ml-2"><OrderFeedTab text="Лента заказов" /></div>
                </div>
                <div className={`${appHeaderStyles.sector} ${appHeaderStyles.centralSector}`}>{<Logo />}</div>
                <div className={`${appHeaderStyles.sector} ${appHeaderStyles.leftSector}`}>
                    <div href=""><PersonalAccountTa text="Личный кабинет" /></div>
                </div>
            </div>
        </header>
    )
}



export default AppHeader;