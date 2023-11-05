import { IOrderFeedItemParams } from "../reducers/orderFeed";

export const WS_ORDER_FEED_CONNECTION_START: "WS_ORDER_FEED_CONNECTION_START" = "WS_ORDER_FEED_CONNECTION_START";
export const WS_ORDER_FEED_CONNECTION_END: "WS_ORDER_FEED_CONNECTION_END" = "WS_ORDER_FEED_CONNECTION_END";
export const WS_ORDER_FEED_SEND_MESSAGE: "WS_ORDER_FEED_SEND_MESSAGE" = "WS_ORDER_FEED_SEND_MESSAGE";
export const WS_ORDER_FEED_CONNECTION_SUCCESS: "WS_ORDER_FEED_CONNECTION_SUCCESS" = "WS_ORDER_FEED_CONNECTION_SUCCESS";
export const WS_ORDER_FEED_CONNECTION_ERROR: "WS_ORDER_FEED_CONNECTION_ERROR" = "WS_ORDER_FEED_CONNECTION_ERROR";
export const WS_ORDER_FEED_GET_MESSAGE: "WS_ORDER_FEED_GET_MESSAGE" = "WS_ORDER_FEED_GET_MESSAGE";
export const WS_ORDER_FEED_CONNECTION_CLOSED: "WS_ORDER_FEED_CONNECTION_CLOSED" = "WS_ORDER_FEED_CONNECTION_CLOSED";

export interface IWcOrderFeedConnectionStartAction {
    readonly type: typeof WS_ORDER_FEED_CONNECTION_START;
    payload: IWcOrderFeedConnectionStartPayload
}

export interface IWcOrderFeedConnectionStartPayload {
    url: string;
    token?: string;
}

export interface IWsOrderFeedEndAction {
    readonly type: typeof WS_ORDER_FEED_CONNECTION_END;
}

export interface IWsOrderFeedSendMessageAction {
    readonly type: typeof WS_ORDER_FEED_SEND_MESSAGE;
    readonly payload: Object | string | number;
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

export const wcConnectionStart = (payload: IWcOrderFeedConnectionStartPayload): IWcOrderFeedConnectionStartAction => {
    return {
        type: WS_ORDER_FEED_CONNECTION_START,
        payload
    }
}

export const wcConnectionEnd = (): IWsOrderFeedEndAction => {
    return {
        type: WS_ORDER_FEED_CONNECTION_END
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
    | IWsOrderFeedEndAction
    | IWsOrderFeedSendMessageAction
    | IWsOrderFeedConnectionSuccessAction
    | IWsOrderFeedConnectionErrorAction
    | IWsOrderFeedGetMessageAction
    | IWsOrderFeedConnectionClosedAction;