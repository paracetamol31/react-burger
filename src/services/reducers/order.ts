import {
    APPLY_ORDER_ID_REQUEST,
    APPLY_ORDER_ID_SUCCESS,
    APPLY_ORDER_ID_FAILED,
    CLEAR_ORDER_INFO,
    TOrderActions
} from "../actions/order";

export interface IOrderState {
    orderId: number | null,
    orderIdRequest: boolean,
    orderIdFailed: boolean
}

export const initialState: IOrderState = {
    orderId: null,
    orderIdRequest: false,
    orderIdFailed: false
}

export const orderReducer = ((state = initialState, action: TOrderActions): IOrderState => {
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
                orderId: action.payload.orderNumber
            }
        case APPLY_ORDER_ID_FAILED:
            return {
                ...state,
                orderIdRequest: false,
                orderIdFailed: true
            }
        case CLEAR_ORDER_INFO:
            return {
                ...initialState
            }
        default:
            return state;
    }
});