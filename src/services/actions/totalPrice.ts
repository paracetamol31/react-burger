import { IBurgerConstructorReducerState } from "../reducers/burgerConstructor";

export const COUNT_TOTAL_PRICE: "COUNT_TOTAL_PRICE" = "COUNT_TOTAL_PRICE";

export interface ICountTotalPriceAction {
    readonly type: typeof COUNT_TOTAL_PRICE;
    readonly payload: ICountTotalPricePayload;
}

export interface ICountTotalPricePayload {
    burgerConstructor: IBurgerConstructorReducerState
}

export const countTotalPrice = (payload: ICountTotalPricePayload): ICountTotalPriceAction => {
    return {
        type: COUNT_TOTAL_PRICE,
        payload
    }
}

export type TTotalPriceActions = ICountTotalPriceAction;