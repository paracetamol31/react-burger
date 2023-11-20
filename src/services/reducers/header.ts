import {
    SET_CURRENT_MENU_HEADER,
    burgerConstructor,
    CLEAR_HEADER_STATE,
    THeaderActions,
    TCurrentMenuHeaders
} from "../../services/actions/header";

export interface IHeaderSate {
    currentItem: TCurrentMenuHeaders
}

export const initialState: IHeaderSate = {
    currentItem: burgerConstructor
}

export const headerReducer = ((state = initialState, action: THeaderActions): IHeaderSate => {
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