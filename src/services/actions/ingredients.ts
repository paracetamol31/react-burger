import { makeRequestIngredients } from "../../utils/api";
import { IIngredientItem } from "../reducers/ingredients";
import { AppDispatch, AppThunk } from "../types";

export const APPLY_INGREDIENTS_REQUEST: "APPLY_INGREDIENTS_REQUEST" = "APPLY_INGREDIENTS_REQUEST";
export const APPLY_INGREDIENTS_SUCCESS: "APPLY_INGREDIENTS_SUCCESS" = "APPLY_INGREDIENTS_SUCCESS";
export const APPLY_INGREDIENTS_FAILED: "APPLY_INGREDIENTS_FAILED" = "APPLY_INGREDIENTS_FAILED";

export const SET_CURRENT_INGREDIENT: "SET_CURRENT_INGREDIENT" = "SET_CURRENT_INGREDIENT";
export const CLEAR_CURRENT_INGREDIENT: "CLEAR_CURRENT_INGREDIENT" = "CLEAR_CURRENT_INGREDIENT";

export const SET_CATEGORY_INGREDIENTS: "SET_CATEGORY_INGREDIENTS" = "SET_CATEGORY_INGREDIENTS";

export const INCREASE_COUNTER: "INCREASE_COUNTER" = "INCREASE_COUNTER";
export const REDUCE_COUNTER: "REDUCE_COUNTER" = "REDUCE_COUNTER";
export const CLEAR_BUNS_COUNTER: "CLEAR_BUNS_COUNTER" = "CLEAR_BUNS_COUNTER";
export const CLEAR_ALL_COUNTER: "CLEAR_ALL_COUNTER" = "CLEAR_ALL_COUNTER";

export interface IApplyIngredientsRequestAction {
    readonly type: typeof APPLY_INGREDIENTS_REQUEST;
}

export interface IApplyIngredientsSuccessPayload {
    ingredients: Map<string, IIngredientItem>
}

export interface IApplyIngredientsSuccessAction {
    readonly type: typeof APPLY_INGREDIENTS_SUCCESS;
    readonly payload: IApplyIngredientsSuccessPayload
}

export interface IApplyIngredientsFailedAction {
    readonly type: typeof APPLY_INGREDIENTS_FAILED;
}

export interface ISetCurrentIngredientAction {
    readonly type: typeof SET_CURRENT_INGREDIENT;
    readonly payload: ISetCurrentIngredientPayload
}

export interface ISetCurrentIngredientPayload {
    id: string
}

export interface ISetCurrentIngredientActions {
    readonly type: typeof CLEAR_CURRENT_INGREDIENT;
}

export interface ISetCategoryIngredientsAction {
    readonly type: typeof SET_CATEGORY_INGREDIENTS;
    readonly payload: ISetCategoryIngredientsPayload
}

export interface ISetCategoryIngredientsPayload {
    value: number
}

export interface IIncreaseCounterAction {
    readonly type: typeof INCREASE_COUNTER;
    readonly payload: IIncreaseCounterPayload
}

export interface IIncreaseCounterPayload {
    id: string
}

export interface IReduceCounterAction {
    readonly type: typeof REDUCE_COUNTER;
    readonly payload: IReduceCounterPayload
}

export interface IReduceCounterPayload {
    id: string
}

export interface IClearBunsCounterAction {
    readonly type: typeof CLEAR_BUNS_COUNTER;
    readonly payload: IClearBunsCounterPayload;
}

export interface IClearBunsCounterPayload {
    id: string
}

export interface IClearAllCounterAction {
    readonly type: typeof CLEAR_ALL_COUNTER;
}

export const applyIngredients: AppThunk = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(applyIngredientsRequest())
        makeRequestIngredients().then(response => {
            dispatch(
                applyIngredientsSuccess({ ingredients: new Map(response.data.map(item => { return [item._id, { ...item, count: 0 }] })) })
            )
        }).catch(e => {
            console.error(e);
            dispatch(applyIngredientsFailed())
        });
    }
}

export const applyIngredientsRequest = (): IApplyIngredientsRequestAction => {
    return {
        type: APPLY_INGREDIENTS_REQUEST
    }
}

export const applyIngredientsSuccess = (payload: IApplyIngredientsSuccessPayload): IApplyIngredientsSuccessAction => {
    return {
        type: APPLY_INGREDIENTS_SUCCESS,
        payload
    }
}

export const applyIngredientsFailed = (): IApplyIngredientsFailedAction => {
    return {
        type: APPLY_INGREDIENTS_FAILED,
    }
}

export const setCurrentIngredient = (payload: ISetCurrentIngredientPayload): ISetCurrentIngredientAction => {
    return {
        type: SET_CURRENT_INGREDIENT,
        payload
    }
}

export const clearCurrentIngredient = (): ISetCurrentIngredientActions => {
    return {
        type: CLEAR_CURRENT_INGREDIENT,
    }
}

export const setCategoryIngredients = (payload: ISetCategoryIngredientsPayload): ISetCategoryIngredientsAction => {
    return {
        type: SET_CATEGORY_INGREDIENTS,
        payload
    }
}

export const increaseCounter = (payload: IIncreaseCounterPayload): IIncreaseCounterAction => {
    return {
        type: INCREASE_COUNTER,
        payload
    }
}

export const reduceCounter = (payload: IReduceCounterPayload): IReduceCounterAction => {
    return {
        type: REDUCE_COUNTER,
        payload
    }
}

export const clearBunsCounter = (payload: IClearBunsCounterPayload): IClearBunsCounterAction => {
    return {
        type: CLEAR_BUNS_COUNTER,
        payload
    }
}

export const clearAllCounter = (): IClearAllCounterAction => {
    return {
        type: CLEAR_ALL_COUNTER,
    }
}

export type TIngredientsActions =
    IApplyIngredientsRequestAction
    | IApplyIngredientsSuccessAction
    | IApplyIngredientsFailedAction
    | ISetCurrentIngredientAction
    | ISetCurrentIngredientActions
    | ISetCategoryIngredientsAction
    | IIncreaseCounterAction
    | IReduceCounterAction
    | IClearBunsCounterAction
    | IClearAllCounterAction;
