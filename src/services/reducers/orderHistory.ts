
import {
    TWsOrderHistorySendMessageActions,
    WS_ORDER_HISTORY_CONNECTION_CLOSED,
    WS_ORDER_HISTORY_CONNECTION_ERROR,
    WS_ORDER_HISTORY_CONNECTION_SUCCESS,
    WS_ORDER_HISTORY_GET_MESSAGE
} from "../actions/orderHistory";

export interface IOrderParams {
    ingredients: Array<string>,
    _id: string,
    status: string,
    number: number,
    createdAt: string,
    updatedAt: string
}

export interface IOrderHistoryItemParams {
    orders: Array<IOrderParams>
    success: boolean;
    total: number;
    totalToday: number;
}

export interface IOrderHistoryState {
    orderData: IOrderHistoryItemParams | null;
    wsConnected: boolean;
    error?: Event;
}

const initialState: IOrderHistoryState = {
    orderData: null,
    wsConnected: false
}

export const orderHistoryReducer = (state = initialState, action: TWsOrderHistorySendMessageActions): IOrderHistoryState => {
    switch (action.type) {
        case WS_ORDER_HISTORY_CONNECTION_SUCCESS:
            return {
                ...state,
                error: undefined,
                wsConnected: true
            };
        case WS_ORDER_HISTORY_CONNECTION_ERROR:
            return {
                ...state,
                error: action.payload,
                wsConnected: false
            };

        case WS_ORDER_HISTORY_CONNECTION_CLOSED:
            return {
                ...state,
                error: undefined,
                wsConnected: false
            };

        case WS_ORDER_HISTORY_GET_MESSAGE:
            return action.payload
                ? {
                    ...state,
                    error: undefined,
                    orderData: action.payload
                }
                : {
                    ...state,
                    orderData: null
                };
        default:
            return state;
    }
}