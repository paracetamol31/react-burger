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
    CLEAR_ALL_COUNTER,
    TIngredientsActions
} from "../actions/ingredients";

export interface IIngredientItem extends IIngredient {
    count: number;
}

export interface IIngredientsState {
    ingredientsRequest: boolean,
    ingredientsFailed: boolean,
    ingredients: Array<IIngredientItem> | null,
    currentIngredient: string | null,
    currentCategory: number
}

const initialState: IIngredientsState = {
    ingredientsRequest: false,
    ingredientsFailed: false,
    ingredients: null,
    currentIngredient: null,
    currentCategory: 0
}

export const ingredientsReducer = ((state = initialState, action: TIngredientsActions): IIngredientsState => {
    switch (action.type) {
        case APPLY_INGREDIENTS_REQUEST:
            return {
                ...state,
                ingredientsRequest: true
            }
        case APPLY_INGREDIENTS_SUCCESS:
            debugger
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsFailed: false,
                ingredients: action.payload.ingredients
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
                currentIngredient: action.payload.id
            }
        case CLEAR_CURRENT_INGREDIENT:
            return {
                ...state,
                currentIngredient: null
            }
        case SET_CATEGORY_INGREDIENTS:
            return {
                ...state,
                currentCategory: action.payload.value
            }

        case INCREASE_COUNTER: {
            return {
                ...state,
                ingredients: state.ingredients
                    ? [
                        ...state.ingredients.map
                            (
                                item => item._id === action.payload.id
                                    ? { ...item, count: item.type === "bun" ? 2 : item.count + 1 }
                                    : item
                            )
                    ]
                    : null
            }
        }
        case REDUCE_COUNTER: {
            return {
                ...state,
                ingredients: state.ingredients
                    ? [
                        ...state.ingredients.map
                            (
                                item => item._id === action.payload.id
                                    ? { ...item, count: item.type === "bun" ? 0 : item.count - 1 }
                                    : item
                            )
                    ]
                    : null
            }
        }
        case CLEAR_BUNS_COUNTER: {
            return {
                ...state,
                ingredients: state.ingredients
                    ? [
                        ...state.ingredients.map
                            (
                                item => (item._id !== action.payload.id && item.type === "bun")
                                    ? { ...item, count: 0 }
                                    : item
                            )
                    ]
                    : null
            }
        }
        case CLEAR_ALL_COUNTER: {
            return {
                ...state,
                ingredients: state.ingredients
                    ? [
                        ...state.ingredients.map
                            (
                                item => { return { ...item, count: 0 } }
                            )
                    ]
                    : null
            }
        }
        default: {
            return state;
        }
    }
});