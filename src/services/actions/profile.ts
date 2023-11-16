import { TNameProfileMenuItem } from "../../components/profile-panel/profile-panel";

export const SET_CURRENT_MENU_PROFILE_PANEL: "SET_CURRENT_MENU_PROFILE_PANEL" = "SET_CURRENT_MENU_PROFILE_PANEL";

export interface ISetCurrentMenuProfilePanelAction {
    readonly type: typeof SET_CURRENT_MENU_PROFILE_PANEL,
    readonly payload: ISetCurrentMenuProfilePanelPayload
}

export interface ISetCurrentMenuProfilePanelPayload {
    menuItem: TNameProfileMenuItem;
    footerText?: string;
}

export const setCurrentMenuProfilePanel = (payload: ISetCurrentMenuProfilePanelPayload): ISetCurrentMenuProfilePanelAction => {
    return {
        type: SET_CURRENT_MENU_PROFILE_PANEL,
        payload
    }
}

export type TProfileActions = ISetCurrentMenuProfilePanelAction;