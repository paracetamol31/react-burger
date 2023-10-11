import { v4 as uuidv4 } from 'uuid';

export const ADD_CONSTRUCTOR_ITEM: "ADD_CONSTRUCTOR_ITEM" = "ADD_CONSTRUCTOR_ITEM";
export const REMOVE_CONSTRUCTOR_ITEM: "REMOVE_CONSTRUCTOR_ITEM" = "REMOVE_CONSTRUCTOR_ITEM";

export const SET_DRAG: "SET_DRAG" = "SET_DRAG";

export const CREATE_EMPTY_ITEM: "CREATE_EMPTY_ITEM" = "CREATE_EMPTY_ITEM";
export const SET_EMPTY_ITEM: "SET_EMPTY_ITEM" = "SET_EMPTY_ITEM";
export const CLEAR_INDEX_EMPTY_ITEM: "CLEAR_INDEX_EMPTY_ITEM" = "CLEAR_INDEX_EMPTY_ITEM";

export const SAVE_START_DRAG_POSITION: "CREATE_START_DRAG_POSITION" = "CREATE_START_DRAG_POSITION";
export const CLEAR_START_DRAG_POSITION: "CLEAR_START_DRAG_POSITION" = "CLEAR_START_DRAG_POSITION";

export const CLEAR_BURGER_CONSTRUCTOR: "CLEAR_BURGER_CONSTRUCTOR" = "CLEAR_BURGER_CONSTRUCTOR";

export interface IAddConstructorItemAction {
    readonly type: typeof ADD_CONSTRUCTOR_ITEM;
    readonly payload: IConstructorItemStateParams;
}
export interface IAddConstructorItemPayload {
    readonly itemType: string;
    readonly image: string;
    readonly price: number;
    readonly id: string;
    readonly name: string;
    readonly index: number | null;
}

export interface IConstructorItemStateParams extends IAddConstructorItemPayload {
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

export interface ISetEmptyItemAction {
    readonly type: typeof SET_EMPTY_ITEM;
    readonly payload: ICreateEmptyItemStateParams;
}


export interface ISetEmptyItemPayload {
    index: number;
    yPoint: number;
}

export interface ICreateEmptyItemStateParams extends ISetEmptyItemPayload {
    readonly uuid: string;
}

export interface IClearIndexEmptyItemAction {
    readonly type: typeof CLEAR_INDEX_EMPTY_ITEM;
}

export interface ISaveStartDragPositionAction {
    readonly type: typeof SAVE_START_DRAG_POSITION;
    readonly payload: ISaveStartDragPositionPayload;
}

export interface ISaveStartDragPositionPayload {
    index: number
}

export interface IClearStartDragPositionAction {
    readonly type: typeof CLEAR_START_DRAG_POSITION;
}

export interface IClearBurgerConstructorAction {
    readonly type: typeof CLEAR_BURGER_CONSTRUCTOR;
}



export const addConstructorItem = (payload: IAddConstructorItemPayload): IAddConstructorItemAction => {
    return {
        type: ADD_CONSTRUCTOR_ITEM,
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

export const setEmptyItem = (item: ISetEmptyItemPayload): ISetEmptyItemAction => {
    return {
        type: SET_EMPTY_ITEM,
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

export const saveStartDragPosition = (payload: ISaveStartDragPositionPayload): ISaveStartDragPositionAction => {
    return {
        type: SAVE_START_DRAG_POSITION,
        payload
    }
}

export const clearStartDragPosition = (): IClearStartDragPositionAction => {
    return {
        type: CLEAR_START_DRAG_POSITION
    }
}

export const clearBurgerConstructor = (): IClearBurgerConstructorAction => {
    return {
        type: CLEAR_BURGER_CONSTRUCTOR
    }
}

export type TBurgerConstructorActions =
    IAddConstructorItemAction
    | IRemoveConstructorItemAction
    | ISetDragAction
    | ICreateEmptyItemAction
    | ISetEmptyItemAction
    | IClearIndexEmptyItemAction
    | ISaveStartDragPositionAction
    | IClearStartDragPositionAction
    | IClearBurgerConstructorAction
