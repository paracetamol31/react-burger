import {
    SET_CURRENT_MENU_HEADER,
    burgerConstructor
} from "../../services/actions/header";

const initialState = {
    currentItem: burgerConstructor
}

export const headerReducer = ((state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_CURRENT_MENU_HEADER:
            return {
                ...state,
                currentItem: payload.currentItem
            }
        default:
            return state;
    }
});