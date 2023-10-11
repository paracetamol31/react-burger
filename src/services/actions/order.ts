import { makeOrderRequest } from "../../utils/api";
import { clearBurgerConstructor } from "../../services/actions/burgerConstructor";
import { clearAllCounter } from "../../services/actions/ingredients";

export const APPLY_ORDER_ID_REQUEST: "APPLY_ORDER_ID_REQUEST" = "APPLY_ORDER_ID_REQUEST";
export const APPLY_ORDER_ID_SUCCESS: "APPLY_ORDER_ID_SUCCESS" = "APPLY_ORDER_ID_SUCCESS";
export const APPLY_ORDER_ID_FAILED: "APPLY_ORDER_ID_FAILED" = "APPLY_ORDER_ID_FAILED";

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

export const applyOrderId = (ingredientsData: Array<string>): Function => {
    return async (dispatch: any) => {
        dispatch(applyOrderIdRequest());
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
export type TOrderActions =
    IApplyOrderIdRequestAction
    | IApplyOrderIdSuccessAction
    | IApplyOrderIdFailedAction;