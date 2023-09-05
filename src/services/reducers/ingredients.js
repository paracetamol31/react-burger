import {
    APPLY_INGREDIENTS_REQUEST,
    APPLY_INGREDIENTS_SUCCESS,
    APPLY_INGREDIENTS_FAILED,
    SET_CURRENT_INGREDIENT,
    CLEAR_CURRENT_INGREDIENT,
    SET_CATEGORY_INGREDIENTS,
    INCREASE_COUNTER,
    REDUCE_COUNTER,
    CLEAR_BUNS_COUNTER,
    CLEAR_ALL_COUNTER
} from "../actions/ingredients";

const initialState = {
    ingredientsRequest: false,
    ingredientsFailed: false,
    ingredients: null,
    currentIngredient: null,
    currentCategory: 0
}

export const ingredientsReducer = ((state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
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
                ingredients: payload.value
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
                currentIngredient: payload.id
            }
        case CLEAR_CURRENT_INGREDIENT:
            return {
                ...state,
                currentIngredient: null
            }
        case SET_CATEGORY_INGREDIENTS:
            return {
                ...state,
                currentCategory: payload.value
            }

        case INCREASE_COUNTER: {
            return {
                ...state,
                ingredients: [
                    ...state.ingredients.map
                        (
                            item => item._id === payload.id
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
                            item => item._id === payload.id
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
                            item => (item._id !== payload.id && item.type === "bun")
                                ? { ...item, count: 0 }
                                : item
                        )
                ]
            }
        }
        case CLEAR_ALL_COUNTER: {
            return {
                ...state,
                ingredients: [
                    ...state.ingredients.map
                        (
                            item => { return { ...item, count: 0 } }
                        )
                ]
            }
        }
        default: {
            return state;
        }
    }
});