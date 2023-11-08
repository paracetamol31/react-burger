import { accessTokenRequest } from "../../utils/api";
import { accessToken, expires20Minute, getCookie, refreshToken, setCookie } from "../../utils/cookie";
import { IOrderHistoryItemParams } from "../reducers/orderHistory";
import { AppDispatch, AppThunk } from "../types";

export const WS_ORDER_HISTORY_CONNECTION_START: "WS_ORDER_HISTORY_CONNECTION_START" = "WS_ORDER_HISTORY_CONNECTION_START";
export const WS_ORDER_HISTORY_CONNECTION_END: "WS_ORDER_HISTORY_CONNECTION_END" = "WS_ORDER_HISTORY_CONNECTION_END";
export const WS_ORDER_HISTORY_SEND_MESSAGE: "WS_ORDER_HISTORY_SEND_MESSAGE" = "WS_ORDER_HISTORY_SEND_MESSAGE";
export const WS_ORDER_HISTORY_CONNECTION_SUCCESS: "WS_ORDER_HISTORY_CONNECTION_SUCCESS" = "WS_ORDER_HISTORY_CONNECTION_SUCCESS";
export const WS_ORDER_HISTORY_CONNECTION_ERROR: "WS_ORDER_HISTORY_CONNECTION_ERROR" = "WS_ORDER_HISTORY_CONNECTION_ERROR";
export const WS_ORDER_HISTORY_GET_MESSAGE: "WS_ORDER_HISTORY_GET_MESSAGE" = "WS_ORDER_HISTORY_GET_MESSAGE";
export const WS_ORDER_HISTORY_CONNECTION_CLOSED: "WS_ORDER_HISTORY_CONNECTION_CLOSED" = "WS_ORDER_HISTORY_CONNECTION_CLOSED";

export interface IWcOrderHistoryConnectionStartAction {
    readonly type: typeof WS_ORDER_HISTORY_CONNECTION_START;
    payload: IWcOrderHistoryConnectionStartPayload
}

export interface IWcOrderHistoryConnectionStartPayload {
    url: string;
    token?: string;
}

export interface IWsOrderHistoryEndAction {
    readonly type: typeof WS_ORDER_HISTORY_CONNECTION_END;
}

export interface IWsOrderHistorySendMessageAction {
    readonly type: typeof WS_ORDER_HISTORY_SEND_MESSAGE;
    readonly payload: Object | string | number;
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

export const wcConnectionStart = (payload: IWcOrderHistoryConnectionStartPayload): IWcOrderHistoryConnectionStartAction => {
    return {
        type: WS_ORDER_HISTORY_CONNECTION_START,
        payload
    }
}

export const wcConnectionEnd = (): IWsOrderHistoryEndAction => {
    return {
        type: WS_ORDER_HISTORY_CONNECTION_END
    }
}


export const wsSendMessage = (payload: Object | string | number): IWsOrderHistorySendMessageAction => {
    return {
        type: WS_ORDER_HISTORY_SEND_MESSAGE,
        payload
    }
}

export interface IParamsInitWSConnectionOrderHistory {
    url: string
}

export const initWSConnectionOrderHistory: AppThunk = (params: IParamsInitWSConnectionOrderHistory) => {
    return async (dispatch: AppDispatch) => {
        const makeOrderRequestCallback: Function = () =>
            dispatch(wcConnectionStart({ url: params.url, token: getCookie(accessToken) }));

        if (!getCookie(accessToken)) {
            accessTokenRequest().then(response => {
                setCookie(accessToken, response.accessToken.split('Bearer ')[1], { expires: expires20Minute });
                setCookie(refreshToken, response.refreshToken)
            }).then(() => {
                makeOrderRequestCallback();
            }).catch((e) => {
                console.error(e);
            })
        } else {
            makeOrderRequestCallback();
        }
    }
}

export type TWsOrderHistorySendMessageActions =
    IWcOrderHistoryConnectionStartAction
    | IWsOrderHistoryEndAction
    | IWsOrderHistorySendMessageAction
    | IWsOrderHistoryConnectionSuccessAction
    | IWsOrderHistoryConnectionErrorAction
    | IWsOrderHistoryGetMessageAction
    | IWsOrderHistoryConnectionClosedAction;