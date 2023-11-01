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
    ingredients: Map<string, IIngredientItem> | null,
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
                    ? new Map(Array.from(state.ingredients).map(
                        (item: [string, IIngredientItem]) => item[0] === action.payload.id
                            ? [item[0], { ...item[1], count: item[1].type === "bun" ? 2 : item[1].count + 1 }]
                            : item
                    ))
                    : null
            }
        }

        case REDUCE_COUNTER: {
            return {
                ...state,
                ingredients: state.ingredients
                    ? new Map(Array.from(state.ingredients).map(
                        (item: [string, IIngredientItem]) => item[0] === action.payload.id
                            ? [item[0], { ...item[1], count: item[1].type === "bun" ? 0 : item[1].count - 1 }]
                            : item
                    ))
                    : null
            }
        }

        case CLEAR_BUNS_COUNTER: {
            return {
                ...state,
                ingredients: state.ingredients
                    ? new Map(Array.from(state.ingredients).map(
                        (item: [string, IIngredientItem]) => (item[0] !== action.payload.id && item[1].type === "bun")
                            ? [item[0], { ...item[1], count: 0 }]
                            : item
                    ))
                    : null
            }
        }
        case CLEAR_ALL_COUNTER: {
            return {
                ...state,
                ingredients: state.ingredients
                    ? new Map(Array.from(state.ingredients).map(
                        (item: [string, IIngredientItem]) => [item[0], { ...item[1], count: 0 }]
                    ))
                    : null
            }
        }
        default: {
            return state;
        }
    }
});