import { IOrderParams } from "../reducers/orderHistory";
import { AppDispatch, AppThunk } from "../types";

export const APPLY_DISPLAYED_ORDER_INFO_REQUEST: "APPLY_DISPLAYED_ORDER_INFO_REQUEST" = "APPLY_DISPLAYED_ORDER_INFO_REQUEST";
export const APPLY_DISPLAYED_ORDER_INFO_SUCCESS: "APPLY_DISPLAYED_ORDER_INFO_SUCCESS" = "APPLY_DISPLAYED_ORDER_INFO_SUCCESS";
export const APPLY_DISPLAYED_ORDER_INFO_FAILED: "APPLY_DISPLAYED_ORDER_INFO_FAILED" = "APPLY_DISPLAYED_ORDER_INFO_FAILED";
export const CLEAR_DISPLAYED_ORDER_INFO: "CLEAR_DISPLAYED_ORDER_INFO" = "CLEAR_DISPLAYED_ORDER_INFO";

export interface IApplyDisplayedOrderInfoRequestAction {
    readonly type: typeof APPLY_DISPLAYED_ORDER_INFO_REQUEST
}

export interface IApplyDisplayedOrderInfoSuccessAction {
    readonly type: typeof APPLY_DISPLAYED_ORDER_INFO_SUCCESS,
    readonly payload: IApplyDisplayedOrderInfoSuccessPayload
}

export interface IApplyDisplayedOrderInfoSuccessPayload {
    readonly displayedOrderInfo: IOrderParams
}

export interface IApplyDisplayedOrderInfoFailedAction {
    readonly type: typeof APPLY_DISPLAYED_ORDER_INFO_FAILED
}

export interface IClearDisplayedOrderInfoAction {
    readonly type: typeof CLEAR_DISPLAYED_ORDER_INFO
}

export const applyDisplayedOrderInfoRequest = (): IApplyDisplayedOrderInfoRequestAction => {
    return {
        type: APPLY_DISPLAYED_ORDER_INFO_REQUEST
    }
}

export const applyDisplayedOrderInfoSuccess = (payload: IApplyDisplayedOrderInfoSuccessPayload): IApplyDisplayedOrderInfoSuccessAction => {
    return {
        type: APPLY_DISPLAYED_ORDER_INFO_SUCCESS,
        payload
    }
}

export const applyDisplayedOrderInfoFailed = (): IApplyDisplayedOrderInfoFailedAction => {
    return {
        type: APPLY_DISPLAYED_ORDER_INFO_FAILED
    }
}

export const clearDisplayedOrderInfo = (): IClearDisplayedOrderInfoAction => {
    return {
        type: CLEAR_DISPLAYED_ORDER_INFO
    }
}

// export const requestOrderInfoByNumber: AppThunk = (number: number) => {
//     return async (dispatch: AppDispatch) => {
//         dispatch(applyDisplayedOrderInfoRequest());
//         accessTokenRequest().then(response => {
//             setCookie(accessToken, response.accessToken.split('Bearer ')[1], { expires: expires20Minute });
//             setCookie(refreshToken, response.refreshToken)
//         }).then(() => {
//             makeOrderRequestCallback();
//         }).catch((e) => {
//             console.error(e);
//             dispatch(applyOrderIdFailed());
//         })
//     }
// }

export type DisplayedOrderActions =
    IApplyDisplayedOrderInfoRequestAction
    | IApplyDisplayedOrderInfoSuccessAction
    | IApplyDisplayedOrderInfoFailedAction
    | IClearDisplayedOrderInfoAction;