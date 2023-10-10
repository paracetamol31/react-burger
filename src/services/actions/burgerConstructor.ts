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

export interface IConstructorItemParams {
    image: string,
    price: number,
    id: string,
    name: string,
    itemType: string,
    index: number
}

export interface IAddConstructorItemAction {
    readonly type: typeof ADD_CONSTRUCTOR_ITEM;
    readonly payload: any;
}
export interface IRemoveConstructorItemAction {
    readonly type: typeof REMOVE_CONSTRUCTOR_ITEM;
    readonly payload: any;
}

export interface ISetDragAction {
    readonly type: typeof SET_DRAG;
    readonly payload: any;
}

export interface ICreateEmptyItemAction {
    readonly type: typeof CREATE_EMPTY_ITEM;
    readonly payload: any;
}

export interface ISetEmptyItemAction {
    readonly type: typeof SET_EMPTY_ITEM;
    readonly payload: any;
}

export interface IClearIndexEmptyItemAction {
    readonly type: typeof CLEAR_INDEX_EMPTY_ITEM;
}

export interface ISaveStartDragPositionAction {
    readonly type: typeof SAVE_START_DRAG_POSITION;
    readonly payload: any;
}

export interface IClearStartDragPositionAction {
    readonly type: typeof CLEAR_START_DRAG_POSITION;
}

export interface IClearBurgerConstructorAction {
    readonly type: typeof CLEAR_BURGER_CONSTRUCTOR;
}


export const addConstructorItem = (item: any): IAddConstructorItemAction => {
    return {
        type: ADD_CONSTRUCTOR_ITEM,
        payload: {
            ...item,
            uuid: uuidv4()
        }
    }
}

export const removeConstructorItem = (index: any): IRemoveConstructorItemAction => {
    return {
        type: REMOVE_CONSTRUCTOR_ITEM,
        payload: {
            index
        }
    }
}

export const setDrag = (isDrag: any): ISetDragAction => {
    return {
        type: SET_DRAG,
        payload: { ...isDrag }
    }
}

export const createEmptyItem = (item: any): ICreateEmptyItemAction => {
    return {
        type: CREATE_EMPTY_ITEM,
        payload: {
            ...item,
            uuid: uuidv4()
        }
    }
}

export const setEmptyItem = (item: any): ISetEmptyItemAction => {
    return {
        type: SET_EMPTY_ITEM,
        payload: {
            ...item,
            uuid: uuidv4()
        }
    }
}

export const clearIndexEmptyItem = () => {
    return {
        type: CLEAR_INDEX_EMPTY_ITEM,
    }
}

export const saveStartDragPosition = (item: any) => {
    return {
        type: SAVE_START_DRAG_POSITION,
        payload: { ...item }
    }
}

export const clearStartDragPosition = () => {
    return {
        type: CLEAR_START_DRAG_POSITION
    }
}

export const clearBurgerConstructor = () => {
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
