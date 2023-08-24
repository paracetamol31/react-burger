import {
    SHOW_INGREDIENT_MODAL,
    CLOSE_INGREDIENT_MODAL,
    SHOW_ORDER_MODAL,
    CLOSE_ORDER_MODAL
} from "../actions/modal"

const initialState = {
    isShowIngredientModal: false,
    isShowOrderModal: false,
}

export const modalReducer = ((state = initialState, action) => {
    switch (action.type) {
        case SHOW_INGREDIENT_MODAL:
            return {
                ...state,
                isShowIngredientModal: true
            }
        case CLOSE_INGREDIENT_MODAL:
            return {
                ...state,
                isShowIngredientModal: false
            }
        case SHOW_ORDER_MODAL:
            return {
                ...state,
                isShowOrderModal: true
            }
        case CLOSE_ORDER_MODAL:
            return {
                ...state,
                isShowOrderModal: false
            }
        default:
            return state;
    }
});