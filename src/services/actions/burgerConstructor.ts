import { v4 as uuidv4 } from 'uuid';

export const INSERT_CONSTRUCTOR_ITEM: "INSERT_CONSTRUCTOR_ITEM" = "INSERT_CONSTRUCTOR_ITEM";
export const REMOVE_CONSTRUCTOR_ITEM: "REMOVE_CONSTRUCTOR_ITEM" = "REMOVE_CONSTRUCTOR_ITEM";

export const SET_DRAG: "SET_DRAG" = "SET_DRAG";

export const CREATE_EMPTY_ITEM: "CREATE_EMPTY_ITEM" = "CREATE_EMPTY_ITEM";
export const REPLACE_EMPTY_ITEM: "REPLACE_EMPTY_ITEM" = "REPLACE_EMPTY_ITEM";
export const CLEAR_INDEX_EMPTY_ITEM: "CLEAR_INDEX_EMPTY_ITEM" = "CLEAR_INDEX_EMPTY_ITEM";

export const CLEAR_BURGER_CONSTRUCTOR: "CLEAR_BURGER_CONSTRUCTOR" = "CLEAR_BURGER_CONSTRUCTOR";

export interface IInsertConstructorItemAction {
    readonly type: typeof INSERT_CONSTRUCTOR_ITEM;
    readonly payload: IConstructorItemStateParams;
}
export interface IInsertConstructorItemPayload {
    readonly itemType: string;
    readonly image: string;
    readonly price: number;
    readonly id: string;
    readonly name: string;
    readonly index: number | null;
}

export interface IConstructorItemStateParams extends IInsertConstructorItemPayload {
    readonly uuid: string;
}

export interface IRemoveConstructorItemAction {
    readonly type: typeof REMOVE_CONSTRUCTOR_ITEM;
    readonly payload: IRemoveConstructorItemPayload;
}

export interface IRemoveConstructorItemPayload {
    index: number;
}
export interface ISetDragAction {
    readonly type: typeof SET_DRAG;
    readonly payload: ISetDragPayload;
}

export interface ISetDragPayload {
    isDrag: boolean
}

export interface ICreateEmptyItemAction {
    readonly type: typeof CREATE_EMPTY_ITEM;
    readonly payload: ICreateEmptyItemStateParams;
}

export interface ICreateEmptyItemPayload {
    index: number,
    yPoint: number
}

export interface ICreateEmptyItemStateParams extends ICreateEmptyItemPayload {
    readonly uuid: string;
}

export interface IReplaceEmptyItemAction {
    readonly type: typeof REPLACE_EMPTY_ITEM;
    readonly payload: ICreateEmptyItemStateParams;
}

export interface IReplaceEmptyItemPayload {
    index: number;
    yPoint: number;
}

export interface ICreateEmptyItemStateParams extends IReplaceEmptyItemPayload {
    readonly uuid: string;
}

export interface IClearIndexEmptyItemAction {
    readonly type: typeof CLEAR_INDEX_EMPTY_ITEM;
}

export interface IClearBurgerConstructorAction {
    readonly type: typeof CLEAR_BURGER_CONSTRUCTOR;
}



export const insertConstructorItem = (payload: IInsertConstructorItemPayload): IInsertConstructorItemAction => {
    return {
        type: INSERT_CONSTRUCTOR_ITEM,
        payload: {
            ...payload,
            uuid: uuidv4()
        }
    }
}

export const removeConstructorItem = (payload: IRemoveConstructorItemPayload): IRemoveConstructorItemAction => {
    return {
        type: REMOVE_CONSTRUCTOR_ITEM,
        payload
    }
}

export const setDrag = (payload: ISetDragPayload): ISetDragAction => {
    return {
        type: SET_DRAG,
        payload
    }
}

export const createEmptyItem = (payload: ICreateEmptyItemPayload): ICreateEmptyItemAction => {
    return {
        type: CREATE_EMPTY_ITEM,
        payload: {
            ...payload,
            uuid: uuidv4()
        }
    }
}

export const replaceEmptyItem = (item: IReplaceEmptyItemPayload): IReplaceEmptyItemAction => {
    return {
        type: REPLACE_EMPTY_ITEM,
        payload: {
            ...item,
            uuid: uuidv4()
        }
    }
}

export const clearIndexEmptyItem = (): IClearIndexEmptyItemAction => {
    return {
        type: CLEAR_INDEX_EMPTY_ITEM,
    }
}

export const clearBurgerConstructor = (): IClearBurgerConstructorAction => {
    return {
        type: CLEAR_BURGER_CONSTRUCTOR
    }
}

export type TBurgerConstructorActions =
    IInsertConstructorItemAction
    | IRemoveConstructorItemAction
    | ISetDragAction
    | ICreateEmptyItemAction
    | IReplaceEmptyItemAction
    | IClearIndexEmptyItemAction
    | IClearBurgerConstructorAction
