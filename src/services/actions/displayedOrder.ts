import { makeOrderInfoByNumber } from "../../utils/api";
import { AppDispatch, AppThunk } from "../types";

export const APPLY_DISPLAYED_ORDER_INFO_REQUEST: "APPLY_DISPLAYED_ORDER_INFO_REQUEST" = "APPLY_DISPLAYED_ORDER_INFO_REQUEST";
export const APPLY_DISPLAYED_ORDER_INFO_SUCCESS: "APPLY_DISPLAYED_ORDER_INFO_SUCCESS" = "APPLY_DISPLAYED_ORDER_INFO_SUCCESS";
export const APPLY_DISPLAYED_ORDER_INFO_FAILED: "APPLY_DISPLAYED_ORDER_INFO_FAILED" = "APPLY_DISPLAYED_ORDER_INFO_FAILED";
export const CLEAR_DISPLAYED_ORDER_INFO: "CLEAR_DISPLAYED_ORDER_INFO" = "CLEAR_DISPLAYED_ORDER_INFO";
export const SET_DISPLAYED_ORDER_INFO: "SET_DISPLAYED_ORDER_INFO" = "SET_DISPLAYED_ORDER_INFO";

export interface IApplyDisplayedOrderInfoRequestAction {
    readonly type: typeof APPLY_DISPLAYED_ORDER_INFO_REQUEST
}

export interface IApplyDisplayedOrderInfoSuccessAction {
    readonly type: typeof APPLY_DISPLAYED_ORDER_INFO_SUCCESS,
    readonly payload: IApplyDisplayedOrderInfoSuccessPayload
}

export interface IApplyDisplayedOrderInfoSuccessPayload {
    readonly displayedOrderInfo: IOrderShortInfo
}

export interface IApplyDisplayedOrderInfoFailedAction {
    readonly type: typeof APPLY_DISPLAYED_ORDER_INFO_FAILED
}

export interface IClearDisplayedOrderInfoAction {
    readonly type: typeof CLEAR_DISPLAYED_ORDER_INFO
}

export interface ISetDisplayedOrderInfoAction {
    readonly type: typeof SET_DISPLAYED_ORDER_INFO,
    readonly payload: ISetDisplayedOrderInfoPayload
}

export interface ISetDisplayedOrderInfoPayload {
    readonly displayedOrderInfo: IOrderShortInfo
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

export const setDisplayedOrderInfo = (payload: ISetDisplayedOrderInfoPayload): ISetDisplayedOrderInfoAction => {
    return {
        type: SET_DISPLAYED_ORDER_INFO,
        payload
    }
}

export const requestOrderInfoByNumber: AppThunk = (number: number) => {
    return async (dispatch: AppDispatch) => {
        dispatch(applyDisplayedOrderInfoRequest());
        makeOrderInfoByNumber(number).then(response => {
            if (response.success && response.orders[0]) {
                dispatch(applyDisplayedOrderInfoSuccess({ displayedOrderInfo: response.orders[0] }))
            } else {
                dispatch(applyDisplayedOrderInfoFailed());
            }
        }).catch((e) => {
            console.error(e);
            dispatch(applyDisplayedOrderInfoFailed());
        });
    }
}

export type TDisplayedOrderActions =
    IApplyDisplayedOrderInfoRequestAction
    | IApplyDisplayedOrderInfoSuccessAction
    | IApplyDisplayedOrderInfoFailedAction
    | IClearDisplayedOrderInfoAction
    | ISetDisplayedOrderInfoAction;