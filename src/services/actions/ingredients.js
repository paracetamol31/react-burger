import { makeRequestIngredients } from "../../utils/api";

export const APPLY_INGREDIENTS_REQUEST = "APPLY_INGREDIENTS_REQUEST";
export const APPLY_INGREDIENTS_SUCCESS = "APPLY_INGREDIENTS_SUCCESS";
export const APPLY_INGREDIENTS_FAILED = "APPLY_INGREDIENTS_FAILED";

export const SET_CURRENT_INGREDIENT = "SET_CURRENT_INGREDIENT";
export const CLEAR_CURRENT_INGREDIENT = "CLEAR_CURRENT_INGREDIENT";

export const SET_CATEGORY_INGREDIENTS = "SET_CATEGORY_INGREDIENTS";

export const INCREASE_COUNTER = "INCREASE_COUNTER";
export const REDUCE_COUNTER = "REDUCE_COUNTER";
export const CLEAR_BUNS_COUNTER = "CLEAR_BUNS_COUNTER";
export const CLEAR_ALL_COUNTER = "CLEAR_ALL_COUNTER";


export const applayIngredients = () => {
    return async (dispatch) => {
        dispatch(applayIngredientsRequest())
        makeRequestIngredients().then(response => {
            dispatch(
                applayIngredientsSuccess({ value: response.data.map(item => { return { ...item, count: 0 } }) })
            )
        }).catch(e => {
            console.error(e);
            dispatch(applayIngredientsFailed())
        });
    }
}

export const applayIngredientsRequest = () => {
    return {
        type: APPLY_INGREDIENTS_REQUEST
    }
}

export const applayIngredientsSuccess = (value) => {
    return {
        type: APPLY_INGREDIENTS_SUCCESS,
        payload: {
            ...value
        }
    }
}

export const applayIngredientsFailed = () => {
    return {
        type: APPLY_INGREDIENTS_FAILED,
    }
}

export const setCurrentIngredient = (value) => {
    return {
        type: SET_CURRENT_INGREDIENT,
        payload: {...value}
    }
}

export const clearCurrentIngredient = () => {
    return {
        type: CLEAR_CURRENT_INGREDIENT,
    }
}

export const setCategoryIngredients = (value) => {
    return {
        type: SET_CATEGORY_INGREDIENTS,
        payload : {...value}
    }
}

export const increaseCounter = (value) => {
    return {
        type: INCREASE_COUNTER,
        payload : {...value}
    }
}

export const reduceCounter = (value) => {
    return {
        type: REDUCE_COUNTER,
        payload : {...value}
    }
}

export const clearBunsCounter = (value) => {
    return {
        type: CLEAR_BUNS_COUNTER,
        payload : {...value}
    }
}

export const clearAllCounter = () => {
    return {
        type: CLEAR_ALL_COUNTER,
    }
}


