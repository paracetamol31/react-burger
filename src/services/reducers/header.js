import {
    SET_CURRENT_MENU_HEADER,
    burgerConstructor,
    CLEAR_HEADER_STATE
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
        case CLEAR_HEADER_STATE:
            return {
                ...state,
                ...initialState
            }
        default:
            return state;
    }
});