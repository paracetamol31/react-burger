export const SET_CURRENT_MENU_HEADER = "SET_CURRENT_MENU_HEADER";
export const CLEAR_HEADER_STATE = "CLEAR_HEADER_DTATE";

//Константы имен элементов шапки
export const burgerConstructor = "burgerConstructor";
export const orderFeed = "orderFeed";
export const userProfile = "userProfile";

export const setCurrentMenuHeader = (currentItem) => {
    return {
        type: SET_CURRENT_MENU_HEADER,
        payload: { currentItem }
    }
}

export const clearHeaderState = () => {
    return {
        type: CLEAR_HEADER_STATE
    }
}
