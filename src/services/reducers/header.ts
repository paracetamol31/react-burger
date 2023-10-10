import {
    SET_CURRENT_MENU_HEADER,
    burgerConstructor,
    CLEAR_HEADER_STATE,
    THeaderActions
} from "../../services/actions/header";

const initialState = {
    currentItem: burgerConstructor
}

export const headerReducer = ((state = initialState, action: THeaderActions) => {
    switch (action.type) {
        case SET_CURRENT_MENU_HEADER:
            return {
                ...state,
                currentItem: action.payload.currentMenuItem
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