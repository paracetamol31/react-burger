import {
    APPLY_INGREDIENTS_REQUEST,
    APPLY_INGREDIENTS_SUCCESS,
    APPLY_INGREDIENTS_FAILED,
    SET_CURRENT_INGREDIENT,
    CLEAR_CURRENT_INGREDIENT,
    APPLY_ORDER_ID_REQUEST,
    APPLY_ORDER_ID_SUCCESS,
    APPLY_ORDER_ID_FAILED,
    SHOW_INGREDIENT_MODAL,
    CLOSE_INGREDIENT_MODAL,
    SHOW_ORDER_MODAL,
    CLOSE_ORDER_MODAL,
    ADD_CONSTRUCTOR_ITEM,
    REMOVE_CONSTRUCTOR_ITEM
} from "../actions/index.js";

const initialState = {
    isShowIngredientModal: false,
    isShowOrderModal: false,

    ingredientsRequest: false,
    ingredientsFailed: false,
    ingredients: null,

    constructorIngredients: [],
    currentIngredient: null,

    orderId: null,
    orderIdRequest: false,
    orderIdFailed: false
}

/** TODO: Reducer получился слишком громоздким, когда буду вносить правки, разобью его на несколько.   */
export const rootReducer = ((state = initialState, action) => {
    switch (action.type) {
        case ADD_CONSTRUCTOR_ITEM:
            return {
                ...state,
                constructorIngredients: action.typeItem === "bun"
                    ? [...state.constructorIngredients.filter(item => item.type !== "bun")].unshift(action.idItem).push(action.idItem)
                    : [...state.constructorIngredients].push(action.idItem)
            }
        case REMOVE_CONSTRUCTOR_ITEM:
            return {
                ...state,
                constructorIngredients: [...state.constructorIngredients.splice(action.index, 1)] 
            }
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
        case APPLY_INGREDIENTS_REQUEST:
            return {
                ...state,
                ingredientsRequest: true
            }
        case APPLY_INGREDIENTS_SUCCESS:
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsFailed: false,
                ingredients: action.value
            }
        case APPLY_INGREDIENTS_FAILED:
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsFailed: true
            }
        case SET_CURRENT_INGREDIENT:
            return {
                ...state,
                currentIngredient: action.id
            }
        case CLEAR_CURRENT_INGREDIENT:
            return {
                ...state,
                currentIngredient: null
            }
        case APPLY_ORDER_ID_REQUEST:
            return {
                ...state,
                orderIdRequest: true
            }
        case APPLY_ORDER_ID_SUCCESS:
            return {
                ...state,
                orderIdRequest: false,
                orderIdFailed: false,
                orderId: action.value
            }
        case APPLY_ORDER_ID_FAILED:
            return {
                ...state,
                orderIdRequest: false,
                orderIdFailed: true
            }
        default:
            return state;
    }
});