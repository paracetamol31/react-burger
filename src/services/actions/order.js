import {makeOrderRequest} from "../../utils/api";

export const APPLY_ORDER_ID_REQUEST = "APPLY_ORDER_ID_REQUEST";
export const APPLY_ORDER_ID_SUCCESS = "APPLY_ORDER_ID_SUCCESS";
export const APPLY_ORDER_ID_FAILED = "APPLY_ORDER_ID_FAILED";

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