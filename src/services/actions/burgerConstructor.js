import { v4 as uuidv4 } from 'uuid';

export const ADD_CONSTRUCTOR_ITEM = "ADD_CONSTRUCTOR_ITEM";
export const REMOVE_CONSTRUCTOR_ITEM = "REMOVE_CONSTRUCTOR_ITEM";

export const SET_DRAG = "SET_DRAG";

export const CREATE_EMPTY_ITEM = "CREATE_EMPTY_ITEM";
export const SET_EMPTY_ITEM = "SET_EMPTY_ITEM";
export const CLEAR_INDEX_EMPTY_ITEM = "CLEAR_INDEX_EMPTY_ITEM";

export const SAVE_START_DRAG_POSITION = "CREATE_START_DRAG_POSITION";
export const CLEAR_START_DRAG_POSITION = "CLEAR_START_DRAG_POSITION";

export const CLEAR_BURGER_CONSTRUCTOR = "CLEAR_BURGER_CONSTRUCTOR";

export const addConstructorItem = (item) => {
    return {
        type: ADD_CONSTRUCTOR_ITEM,
        payload: {
            ...item,
            uuid: uuidv4()
        }
    }
}

export const removeConstructorItem = (index) => {
    return {
        type: REMOVE_CONSTRUCTOR_ITEM,
        payload: {
            index
        }
    }
}

export const setDrag = (isDrag) => {
    return {
        type: SET_DRAG,
        payload: {...isDrag}
    }
}

export const createEmptyItem = (item) => {
    return {
        type: CREATE_EMPTY_ITEM,
        payload: {
            ...item,
            uuid: uuidv4()
        }
    }
}

export const setEmptyItem = (item) => {
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

export const saveStartDragPosition = (item) => {
    return {
        type: SAVE_START_DRAG_POSITION,
        payload: {...item}
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
