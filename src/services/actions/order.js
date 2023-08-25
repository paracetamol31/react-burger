import { makeOrderRequest } from "../../utils/api";
import { clearBurgerConstructor} from "../../services/actions/burgerConstructor";
import { clearAllCounter } from "../../services/actions/ingredients";

export const APPLY_ORDER_ID_REQUEST = "APPLY_ORDER_ID_REQUEST";
export const APPLY_ORDER_ID_SUCCESS = "APPLY_ORDER_ID_SUCCESS";
export const APPLY_ORDER_ID_FAILED = "APPLY_ORDER_ID_FAILED";

export const applayOrderId = (ingredientsData) => {
    return async (dispatch) => {
        dispatch(applayOrderIdRequest());
        makeOrderRequest(ingredientsData).then(response => {
            dispatch(applayOrderIdSuccess({
                value: response.order.number
            }));
            dispatch(clearBurgerConstructor());
            dispatch(clearAllCounter());
        }).catch(e => {
            console.error(e);
            dispatch(applayOrderIdFailed());
        });
    }
}

export const applayOrderIdRequest = () => {
    return {
        type: APPLY_ORDER_ID_REQUEST
    }
} 

export const applayOrderIdSuccess = (value) => {
    return {
        type: APPLY_ORDER_ID_SUCCESS,
        payload: {...value}
    }
} 

export const applayOrderIdFailed = () => {
    return {
        type: APPLY_ORDER_ID_FAILED
    }
} 