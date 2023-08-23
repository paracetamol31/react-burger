import {makeRequestIngredients} from "../../utils/api";

export const APPLY_INGREDIENTS_REQUEST = "APPLY_INGREDIENTS_REQUEST";
export const APPLY_INGREDIENTS_SUCCESS = "APPLY_INGREDIENTS_SUCCESS";
export const APPLY_INGREDIENTS_FAILED = "APPLY_INGREDIENTS_FAILED";

export const SET_CURRENT_INGREDIENT = "SET_CURRENT_INGREDIENT";
export const CLEAR_CURRENT_INGREDIENT = "CLEAR_CURRENT_INGREDIENT";

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