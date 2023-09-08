export const SET_CURRENT_MENU_HEADER = "SET_CURRENT_MENU_HEADER";

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