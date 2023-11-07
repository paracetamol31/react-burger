import {
    APPLY_DISPLAYED_ORDER_INFO_FAILED,
    APPLY_DISPLAYED_ORDER_INFO_REQUEST,
    APPLY_DISPLAYED_ORDER_INFO_SUCCESS,
    CLEAR_DISPLAYED_ORDER_INFO,
    DisplayedOrderActions
} from "../actions/displayedOrder";
import { IOrderParams } from "./orderHistory";

export interface IDisplayedOrderState {
    displayedOrderInfo: IOrderParams | null,
    displayedOrderIdRequest: boolean,
    displayedOrderIdFailed: boolean
}

const initialState: IDisplayedOrderState = {
    displayedOrderInfo: null,
    displayedOrderIdRequest: false,
    displayedOrderIdFailed: false
}

export const displayedOrderReducer = ((state = initialState, action: DisplayedOrderActions): IDisplayedOrderState => {
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
        case CLEAR_DISPLAYED_ORDER_INFO:
            return {
                ...initialState
            }
        default:
            return state;
    }
});