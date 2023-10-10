export const SET_CURRENT_MENU_HEADER: "SET_CURRENT_MENU_HEADER" = "SET_CURRENT_MENU_HEADER";
export const CLEAR_HEADER_STATE: "CLEAR_HEADER_DTATE" = "CLEAR_HEADER_DTATE";

//Константы имен элементов шапки
export const burgerConstructor: "burgerConstructor" = "burgerConstructor";
export const orderFeed: "orderFeed" = "orderFeed";
export const userProfile: "userProfile" = "userProfile";

export type TCurrentMenuHeaders = typeof burgerConstructor | typeof orderFeed | typeof userProfile;

export interface ISetCurrentMenuHeaderAction {
    readonly type: typeof SET_CURRENT_MENU_HEADER;
    readonly payload: { currentMenuItem: TCurrentMenuHeaders };
}

export interface IClearHeaderStateAction {
    readonly type: typeof CLEAR_HEADER_STATE;
}

export const setCurrentMenuHeader = (currentMenuItem: TCurrentMenuHeaders) => {
    return {
        type: SET_CURRENT_MENU_HEADER,
        payload: { currentMenuItem }
    }
}

export const clearHeaderState = () => {
    return {
        type: CLEAR_HEADER_STATE
    }
}

export type THeaderActions = ISetCurrentMenuHeaderAction | IClearHeaderStateAction; 
