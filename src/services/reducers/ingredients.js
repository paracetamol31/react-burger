import {
    APPLY_INGREDIENTS_REQUEST,
    APPLY_INGREDIENTS_SUCCESS,
    APPLY_INGREDIENTS_FAILED,
    SET_CURRENT_INGREDIENT,
    CLEAR_CURRENT_INGREDIENT
} from "../actions/ingredients";

const initialState = {
    ingredientsRequest: false,
    ingredientsFailed: false,
    ingredients: null,
    currentIngredient: null
}

/** TODO: Reducer получился слишком громоздким, когда буду вносить правки, разобью его на несколько.   */
export const ingredientsReducer = ((state = initialState, action) => {
    switch (action.type) {
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
        default: {
            return state;
        }
    }
});