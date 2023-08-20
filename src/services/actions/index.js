import {
    makeRequestIngredients,
    makeOrderRequest
} from "../../utils/api";

export const SHOW_INGREDIENT_MODAL = "SHOW_INGREDIENT_MODAL";
export const CLOSE_INGREDIENT_MODAL = "CLOSE_INGREDIENT_MODAL";

export const SHOW_ORDER_MODAL = "SHOW_ORDER_MODAL";
export const CLOSE_ORDER_MODAL = "CLOSE_ORDER_MODAL";

export const APPLY_INGREDIENTS_REQUEST = "APPLY_INGREDIENTS_REQUEST";
export const APPLY_INGREDIENTS_SUCCESS = "APPLY_INGREDIENTS_SUCCESS";
export const APPLY_INGREDIENTS_FAILED = "APPLY_INGREDIENTS_FAILED";

export const SET_CURRENT_INGREDIENT = "SET_CURRENT_INGREDIENT";
export const CLEAR_CURRENT_INGREDIENT = "CLEAR_CURRENT_INGREDIENT";

export const APPLY_ORDER_ID_REQUEST = "APPLY_ORDER_ID_REQUEST";
export const APPLY_ORDER_ID_SUCCESS = "APPLY_ORDER_ID_SUCCESS";
export const APPLY_ORDER_ID_FAILED = "APPLY_ORDER_ID_FAILED";

export const ADD_CONSTRUCTOR_ITEM = "ADD_CONSTRUCTOR_ITEM";
export const REMOVE_CONSTRUCTOR_ITEM = "REMOVE_CONSTRUCTOR_ITEM";

export const applayIngredients = () => {
    return async (dispatch) => {
        dispatch({ type: APPLY_INGREDIENTS_REQUEST })
        makeRequestIngredients().then(response => {
            dispatch({
                type: APPLY_INGREDIENTS_SUCCESS,
                value: response.data.map(item => { return { ...item, count: 0 } })
            })
        }).catch(e => {
            console.error(e);
            dispatch({ type: APPLY_INGREDIENTS_FAILED })
        });
    }
}

export const applayOrderId = (ingredientsData) => {
    return async (dispatch) => {
        dispatch({ type: APPLY_ORDER_ID_REQUEST })
        makeOrderRequest(ingredientsData).then(response => {
            dispatch({
                type: APPLY_ORDER_ID_SUCCESS,
                value: response.order.number
            })
        }).catch(e => {
            console.error(e);
            dispatch({ type: APPLY_ORDER_ID_FAILED })
        });
    }
}