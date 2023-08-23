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

/** TODO: Reducer получился слишком громоздким, когда буду вносить правки, разобью его на несколько.   */
export const orderReducer = ((state = initialState, action) => {
    switch (action.type) {
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
                orderId: action.value
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