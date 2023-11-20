import { TNameProfileMenuItem } from "../../components/profile-panel/profile-panel";
import { SET_CURRENT_MENU_PROFILE_PANEL, TProfileActions } from "../actions/profile";

export interface IProfileState {
    currentItem: TNameProfileMenuItem;
    footerText?: string;
}

export  const initialState: IProfileState = {
    currentItem: "menuItemProfile",
    footerText: ""
}

export const profileReducer = ((state = initialState, action: TProfileActions): IProfileState => {
    switch (action.type) {
        case SET_CURRENT_MENU_PROFILE_PANEL: {
            return {
                ...state,
                currentItem: action.payload.menuItem,
                footerText: action.payload.footerText || ""
            }
        }
        default:
            return state;
    }
});