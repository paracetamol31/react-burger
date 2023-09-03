import {
    APPLY_ORDER_ID_REQUEST,
    APPLY_ORDER_ID_SUCCESS,
    APPLY_ORDER_ID_FAILED
} from "../actions/order";

const initialState = {
    orderId: null,
    orderIdRequest: false,
    orderIdFailed: false
}

export const orderReducer = ((state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case APPLY_ORDER_ID_REQUEST:
            return {
                ...state,
                orderIdRequest: true
            }
        case APPLY_ORDER_ID_SUCCESS:
            return {
                ...state,
                orderIdRequest: false,
                orderIdFailed: false,
                orderId: payload.value
            }
        case APPLY_ORDER_ID_FAILED:
            return {
                ...state,
                orderIdRequest: false,
                orderIdFailed: true
            }
        default:
            return state;
    }
});