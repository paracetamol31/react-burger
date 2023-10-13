import {
    TWsOrderFeedSendMessageActions,
    WS_ORDER_FEED_CONNECTION_CLOSED,
    WS_ORDER_FEED_CONNECTION_ERROR,
    WS_ORDER_FEED_CONNECTION_SUCCESS,
    WS_ORDER_FEED_GET_MESSAGE
} from "../actions/orderFeed";
import { IOrderParams } from "./orderHistory";

export interface IOrderFeedItemParams {
    orders: Array<IOrderParams>
    success: boolean;
    total: number;
    totalToday: number;
}

export interface IOrderFeedState {
    orderData: IOrderFeedItemParams | null;
    wsConnected: boolean;
    error?: Event;
}

const initialState: IOrderFeedState = {
    orderData: null,
    wsConnected: false
}

export const orderFeedReducer = (state = initialState, action: TWsOrderFeedSendMessageActions): IOrderFeedState => {
    switch (action.type) {
        case WS_ORDER_FEED_CONNECTION_SUCCESS:
            return {
                ...state,
                error: undefined,
                wsConnected: true
            };
        case WS_ORDER_FEED_CONNECTION_ERROR:
            return {
                ...state,
                error: action.payload,
                wsConnected: false
            };

        case WS_ORDER_FEED_CONNECTION_CLOSED:
            return {
                ...state,
                error: undefined,
                wsConnected: false
            };

        case WS_ORDER_FEED_GET_MESSAGE:
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