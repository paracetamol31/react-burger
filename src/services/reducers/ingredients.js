import {
    APPLY_INGREDIENTS_REQUEST,
    APPLY_INGREDIENTS_SUCCESS,
    APPLY_INGREDIENTS_FAILED,
    SET_CURRENT_INGREDIENT,
    CLEAR_CURRENT_INGREDIENT,
    SET_CATEGORY_INGREDIENTS,
    INCREASE_COUNTER,
    REDUCE_COUNTER,
    CLEAR_BUNS_COUNTER
} from "../actions/ingredients";

const initialState = {
    ingredientsRequest: false,
    ingredientsFailed: false,
    ingredients: null,
    currentIngredient: null,
    currentCategory: 0
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
        case SET_CATEGORY_INGREDIENTS:
            return {
                ...state,
                currentCategory: action.value
            }

        case INCREASE_COUNTER: {
            return {
                ...state,
                ingredients: [
                    ...state.ingredients.map
                        (
                            item => item._id === action.id
                                ? { ...item, count: item.type === "bun" ? 2 : item.count + 1 }
                                : item
                        )
                ]
            }
        }
        case REDUCE_COUNTER: {
            return {
                ...state,
                ingredients: [
                    ...state.ingredients.map
                        (
                            item => item._id === action.id
                                ? { ...item, count: item.type === "bun" ? 0 : item.count - 1 }
                                : item
                        )
                ]
            }
        }
        case CLEAR_BUNS_COUNTER: {
            return {
                ...state,
                ingredients: [
                    ...state.ingredients.map
                        (
                            item => (item._id !== action.id && item.type === "bun")
                                ? { ...item, count: 0 }
                                : item
                        )
                ]
            }
        }
        default: {
            return state;
        }
    }
});