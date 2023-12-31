import {
    APPLY_DISPLAYED_ORDER_INFO_FAILED,
    APPLY_DISPLAYED_ORDER_INFO_REQUEST,
    APPLY_DISPLAYED_ORDER_INFO_SUCCESS,
    CLEAR_DISPLAYED_ORDER_INFO,
    SET_DISPLAYED_ORDER_INFO,
    TDisplayedOrderActions
} from "../actions/displayedOrder";

export interface IDisplayedOrderState {
    displayedOrderInfo: IOrderShortInfo | null,
    displayedOrderIdRequest: boolean,
    displayedOrderIdFailed: boolean
}

export const initialState: IDisplayedOrderState = {
    displayedOrderInfo: null,
    displayedOrderIdRequest: false,
    displayedOrderIdFailed: false
}

export const displayedOrderReducer = ((state = initialState, action: TDisplayedOrderActions): IDisplayedOrderState => {
    switch (action.type) {
        case APPLY_DISPLAYED_ORDER_INFO_REQUEST:
            return {
                ...state,
                displayedOrderIdRequest: true
            }
        case APPLY_DISPLAYED_ORDER_INFO_SUCCESS:
            return {
                ...state,
                displayedOrderIdRequest: false,
                displayedOrderIdFailed: false,
                displayedOrderInfo: action.payload.displayedOrderInfo
            }
        case APPLY_DISPLAYED_ORDER_INFO_FAILED:
            return {
                ...state,
                displayedOrderIdRequest: false,
                displayedOrderIdFailed: true
            }
        case SET_DISPLAYED_ORDER_INFO:
            return {
                ...state,
                displayedOrderIdRequest: false,
                displayedOrderIdFailed: false,
                displayedOrderInfo: action.payload.displayedOrderInfo
            }
        case CLEAR_DISPLAYED_ORDER_INFO:
            return initialState;
        default:
            return state;
    }
});