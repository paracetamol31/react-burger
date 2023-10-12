import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import profilePanelStyles from "./profile-panel.module.css";
import { useDispatch, useSelector } from "../../services/hocks";
import { logout } from "../../services/actions/user";
import menuItem, { IPropsMenuItem } from "../menu-item/menu-item";
import { RootState } from "../../services/types";
import { setCurrentMenuProfilePanel } from "../../services/actions/profile";

export const menuItemProfile: "menuItemProfile" = "menuItemProfile";
export const menuItemOrderHistory: "menuItemOrderHistory" = "menuItemOrderHistory";
export const menuItemLogout: "menuItemLogout" = "menuItemLogout";

export type TNameProfileMenuItem =
    typeof menuItemProfile
    | typeof menuItemOrderHistory
    | typeof menuItemLogout;

export const ProfilePanel: FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { currentItem, footerText } = useSelector((state: RootState) => state.profile);

    const callLogout = useCallback<React.MouseEventHandler<HTMLSpanElement>>(() => {
        dispatch(setCurrentMenuProfilePanel(
            {
                menuItem: "menuItemLogout"
            }
        ))
        dispatch(logout(() => { navigate("/login") }));
    }, [dispatch, navigate]);

    const openOrderHistory = useCallback<React.MouseEventHandler<HTMLSpanElement>>(() => {
        navigate("/profile/order");
    }, [navigate]);

    const openUserProfileSetings = useCallback<React.MouseEventHandler<HTMLSpanElement>>(() => {
        navigate("/profile");
    }, [navigate]);

    const MenuItemProfile: React.FC<IPropsMenuItem> = menuItem({
        isTarget: currentItem === menuItemProfile
    });

    const MenuItemOrderHistory: React.FC<IPropsMenuItem> = menuItem({
        isTarget: currentItem === menuItemOrderHistory
    });

    const MenuItemLogout: React.FC<IPropsMenuItem> = menuItem({
        isTarget: currentItem === menuItemLogout
    });

    return (
        <div className={`${profilePanelStyles.profilePanel}`} >
            <div className={`${profilePanelStyles.menuPanel} mb-20`} >
                <div className={profilePanelStyles.menuItem} onClick={openUserProfileSetings}>
                    <MenuItemProfile text="Профиль" extraClass="text_type_main-medium"/>
                </div>
                <div className={profilePanelStyles.menuItem} onClick={openOrderHistory}>
                    <MenuItemOrderHistory text="История заказов" extraClass="text_type_main-medium" />
                </div>
                <div className={profilePanelStyles.menuItem} onClick={callLogout}>
                    <MenuItemLogout text="Выход" extraClass="text_type_main-medium"/>
                </div>
            </div>
            <div className={`${profilePanelStyles.menuPanel} ${profilePanelStyles.footerRightPanel}`} >
                <span className="text text_type_main-small text_color_inactive">{footerText}</span>
            </div>
        </div>
    )
}