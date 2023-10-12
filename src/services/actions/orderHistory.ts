import { IOrderHistoryItemParams } from "../reducers/orderHistory";

export const WS_ORDER_HISTORY_CONNECTION_START: "WS_ORDER_HISTORY_CONNECTION_START" = "WS_ORDER_HISTORY_CONNECTION_START";
export const WS_ORDER_HISTORY_CONNECTION_SUCCESS: "WS_ORDER_HISTORY_CONNECTION_SUCCESS" = "WS_ORDER_HISTORY_CONNECTION_SUCCESS";
export const WS_ORDER_HISTORY_CONNECTION_ERROR: "WS_ORDER_HISTORY_CONNECTION_ERROR" = "WS_ORDER_HISTORY_CONNECTION_ERROR";
export const WS_ORDER_HISTORY_GET_MESSAGE: "WS_ORDER_HISTORY_GET_MESSAGE" = "WS_ORDER_HISTORY_GET_MESSAGE";
export const WS_ORDER_HISTORY_CONNECTION_CLOSED: "WS_ORDER_HISTORY_CONNECTION_CLOSED" = "WS_ORDER_HISTORY_CONNECTION_CLOSED";
export const WS_ORDER_HISTORY_SEND_MESSAGE: "WS_ORDER_HISTORY_SEND_MESSAGE" = "WS_ORDER_HISTORY_SEND_MESSAGE";

export interface IWcOrderHistoryConnectionStartAction {
    readonly type: typeof WS_ORDER_HISTORY_CONNECTION_START;
    payload: IWcOrderHistoryConnectionStartPayload
}

export interface IWcOrderHistoryConnectionStartPayload {
    url: string;
    token?: string;
}

export interface IWsOrderHistoryConnectionSuccessAction {
    readonly type: typeof WS_ORDER_HISTORY_CONNECTION_SUCCESS;
    readonly payload: Event;
}

export interface IWsOrderHistoryConnectionErrorAction {
    readonly type: typeof WS_ORDER_HISTORY_CONNECTION_ERROR;
    readonly payload: Event;
}

export interface IWsOrderHistoryGetMessageAction {
    readonly type: typeof WS_ORDER_HISTORY_GET_MESSAGE;
    readonly payload: IOrderHistoryItemParams | null;
}

export interface IWsOrderHistoryConnectionClosedAction {
    readonly type: typeof WS_ORDER_HISTORY_CONNECTION_CLOSED;
    readonly payload: Event;
}

export interface IWsOrderHistorySendMessageAction {
    readonly type: typeof WS_ORDER_HISTORY_SEND_MESSAGE;
    readonly payload: Object | string | number;
}

export const wcConnectionStart = (payload: IWcOrderHistoryConnectionStartPayload): IWcOrderHistoryConnectionStartAction => {
    return {
        type: WS_ORDER_HISTORY_CONNECTION_START,
        payload
    }
}

export const wsConnectionSuccess = (payload: Event): IWsOrderHistoryConnectionSuccessAction => {
    return {
        type: WS_ORDER_HISTORY_CONNECTION_SUCCESS,
        payload
    }
}

export const wsConnectionError = (payload: Event): IWsOrderHistoryConnectionErrorAction => {
    return {
        type: WS_ORDER_HISTORY_CONNECTION_ERROR,
        payload
    }
}

export const wsGetMessage = (payload: string): IWsOrderHistoryGetMessageAction => {
    let data: IOrderHistoryItemParams | null = null;
    try {
        data = JSON.parse(payload);
    } catch {
        data = null;
    }
    return {
        type: WS_ORDER_HISTORY_GET_MESSAGE,
        payload: data
    }
}

export const wsConnectionClosed = (payload: Event): IWsOrderHistoryConnectionClosedAction => {
    return {
        type: WS_ORDER_HISTORY_CONNECTION_CLOSED,
        payload
    }
}

export const wsSendMessage = (payload: Object | string | number): IWsOrderHistorySendMessageAction => {
    return {
        type: WS_ORDER_HISTORY_SEND_MESSAGE,
        payload
    }
}

export type TWsOrderHistorySendMessageActions =
    IWcOrderHistoryConnectionStartAction
    | IWsOrderHistoryConnectionSuccessAction
    | IWsOrderHistoryConnectionErrorAction
    | IWsOrderHistoryGetMessageAction
    | IWsOrderHistoryConnectionClosedAction
    | IWsOrderHistorySendMessageAction;