import { IOrderFeedItemParams } from "../reducers/orderFeed";

export const WS_ORDER_FEED_CONNECTION_START: "WS_ORDER_FEED_CONNECTION_START" = "WS_ORDER_FEED_CONNECTION_START";
export const WS_ORDER_FEED_CONNECTION_SUCCESS: "WS_ORDER_FEED_CONNECTION_SUCCESS" = "WS_ORDER_FEED_CONNECTION_SUCCESS";
export const WS_ORDER_FEED_CONNECTION_ERROR: "WS_ORDER_FEED_CONNECTION_ERROR" = "WS_ORDER_FEED_CONNECTION_ERROR";
export const WS_ORDER_FEED_GET_MESSAGE: "WS_ORDER_FEED_GET_MESSAGE" = "WS_ORDER_FEED_GET_MESSAGE";
export const WS_ORDER_FEED_CONNECTION_CLOSED: "WS_ORDER_FEED_CONNECTION_CLOSED" = "WS_ORDER_FEED_CONNECTION_CLOSED";
export const WS_ORDER_FEED_SEND_MESSAGE: "WS_ORDER_FEED_SEND_MESSAGE" = "WS_ORDER_FEED_SEND_MESSAGE";

export interface IWcOrderFeedConnectionStartAction {
    readonly type: typeof WS_ORDER_FEED_CONNECTION_START;
    payload: IWcOrderFeedConnectionStartPayload
}

export interface IWcOrderFeedConnectionStartPayload {
    url: string;
    token?: string;
}

export interface IWsOrderFeedConnectionSuccessAction {
    readonly type: typeof WS_ORDER_FEED_CONNECTION_SUCCESS;
    readonly payload: Event;
}

export interface IWsOrderFeedConnectionErrorAction {
    readonly type: typeof WS_ORDER_FEED_CONNECTION_ERROR;
    readonly payload: Event;
}

export interface IWsOrderFeedGetMessageAction {
    readonly type: typeof WS_ORDER_FEED_GET_MESSAGE;
    readonly payload: IOrderFeedItemParams | null;
}

export interface IWsOrderFeedConnectionClosedAction {
    readonly type: typeof WS_ORDER_FEED_CONNECTION_CLOSED;
    readonly payload: Event;
}

export interface IWsOrderFeedSendMessageAction {
    readonly type: typeof WS_ORDER_FEED_SEND_MESSAGE;
    readonly payload: Object | string | number;
}

export const wcConnectionStart = (payload: IWcOrderFeedConnectionStartPayload): IWcOrderFeedConnectionStartAction => {
    return {
        type: WS_ORDER_FEED_CONNECTION_START,
        payload
    }
}

export const wsConnectionSuccess = (payload: Event): IWsOrderFeedConnectionSuccessAction => {
    return {
        type: WS_ORDER_FEED_CONNECTION_SUCCESS,
        payload
    }
}

export const wsConnectionError = (payload: Event): IWsOrderFeedConnectionErrorAction => {
    return {
        type: WS_ORDER_FEED_CONNECTION_ERROR,
        payload
    }
}

export const wsGetMessage = (payload: string): IWsOrderFeedGetMessageAction => {
    let data: IOrderFeedItemParams | null = null;
    try {
        data = JSON.parse(payload);
    } catch {
        data = null;
    }
    return {
        type: WS_ORDER_FEED_GET_MESSAGE,
        payload: data
    }
}

export const wsConnectionClosed = (payload: Event): IWsOrderFeedConnectionClosedAction => {
    return {
        type: WS_ORDER_FEED_CONNECTION_CLOSED,
        payload
    }
}

export const wsSendMessage = (payload: Object | string | number): IWsOrderFeedSendMessageAction => {
    return {
        type: WS_ORDER_FEED_SEND_MESSAGE,
        payload
    }
}

export type TWsOrderFeedSendMessageActions =
    IWcOrderFeedConnectionStartAction
    | IWsOrderFeedConnectionSuccessAction
    | IWsOrderFeedConnectionErrorAction
    | IWsOrderFeedGetMessageAction
    | IWsOrderFeedConnectionClosedAction
    | IWsOrderFeedSendMessageAction;