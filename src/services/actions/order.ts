import { accessTokenRequest, makeOrderRequest } from "../../utils/api";
import { clearBurgerConstructor } from "../../services/actions/burgerConstructor";
import { clearAllCounter } from "../../services/actions/ingredients";
import { AppDispatch, AppThunk } from "../types";
import { accessToken, expires20Minute, getCookie, refreshToken, setCookie } from "../../utils/cookie";

export const APPLY_ORDER_ID_REQUEST: "APPLY_ORDER_ID_REQUEST" = "APPLY_ORDER_ID_REQUEST";
export const APPLY_ORDER_ID_SUCCESS: "APPLY_ORDER_ID_SUCCESS" = "APPLY_ORDER_ID_SUCCESS";
export const APPLY_ORDER_ID_FAILED: "APPLY_ORDER_ID_FAILED" = "APPLY_ORDER_ID_FAILED";
export const CLEAR_ORDER_INFO: "CLEAR_ORDER_INFO" = "CLEAR_ORDER_INFO";

export interface IApplyOrderIdRequestAction {
    readonly type: typeof APPLY_ORDER_ID_REQUEST;
}

export interface IApplyOrderIdSuccessAction {
    readonly type: typeof APPLY_ORDER_ID_SUCCESS;
    readonly payload: IApplyOrderIdSuccessPayload;
}

export interface IApplyOrderIdSuccessPayload {
    orderNumber: number
}

export interface IApplyOrderIdFailedAction {
    readonly type: typeof APPLY_ORDER_ID_FAILED;
}

export interface IClearOrderInfo {
    readonly type: typeof CLEAR_ORDER_INFO;
}

export const applyOrderId: AppThunk = (ingredientsData: Array<string>) => {
    return async (dispatch: AppDispatch) => {
        dispatch(applyOrderIdRequest());
        const makeOrderRequestCallback: Function = () =>
            makeOrderRequest(ingredientsData).then(response => {
                dispatch(applyOrderIdSuccess({
                    orderNumber: response.order.number
                }));
                dispatch(clearBurgerConstructor());
                dispatch(clearAllCounter());
            }).catch(e => {
                console.error(e);
                dispatch(applyOrderIdFailed());
            });

        if (!getCookie(accessToken)) {
            accessTokenRequest().then(response => {
                setCookie(accessToken, response.accessToken.split('Bearer ')[1], { expires: expires20Minute });
                setCookie(refreshToken, response.refreshToken)
            }).then(() => {
                makeOrderRequestCallback();
            }).catch((e) => {
                console.error(e);
                dispatch(applyOrderIdFailed());
            })
        } else {
            makeOrderRequestCallback();
        }
    }
}

export const applyOrderIdRequest = (): IApplyOrderIdRequestAction => {
    return {
        type: APPLY_ORDER_ID_REQUEST
    }
}

export const applyOrderIdSuccess = (payload: IApplyOrderIdSuccessPayload): IApplyOrderIdSuccessAction => {
    return {
        type: APPLY_ORDER_ID_SUCCESS,
        payload
    }
}

export const applyOrderIdFailed = (): IApplyOrderIdFailedAction => {
    return {
        type: APPLY_ORDER_ID_FAILED
    }
}

export const clearOrderInfo = (): IClearOrderInfo => {
    return {
        type: CLEAR_ORDER_INFO
    }
}

export type TOrderActions =
    IApplyOrderIdRequestAction
    | IApplyOrderIdSuccessAction
    | IApplyOrderIdFailedAction
    | IClearOrderInfo;