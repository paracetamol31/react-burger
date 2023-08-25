import {
    ADD_CONSTRUCTOR_ITEM,
    REMOVE_CONSTRUCTOR_ITEM,
    SET_EMPTY_ITEM,
    SET_DRAG,
    CLEAR_INDEX_EMPTY_ITEM,
    CREATE_EMPTY_ITEM,
    SAVE_START_DRAG_POSITION,
    CLEAR_START_DRAG_POSITION,
    CLEAR_BURGER_CONSTRUCTOR
} from "../../services/actions/burgerConstructor";

const initialState = {
    constructorItems: [],
    bun: null,
    isDragStart: false,
    indexEmptyItem: null,
    startDragPosition: null,
    yPoint: null
}

export const burgerConstructorReducer = ((state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case SAVE_START_DRAG_POSITION: {
            return {
                ...state,
                startDragPosition: payload.index
            }
        }
        case CLEAR_START_DRAG_POSITION: {
            return {
                ...state,
                startDragPosition: null
            }
        }
        case CREATE_EMPTY_ITEM: {
            state.constructorItems.splice(payload.index, 1, {
                itemType: "empty",
                uuid: payload.uuid
            });
            return {
                ...state,
                constructorItems: [...state.constructorItems],
                indexEmptyItem: payload.index,
                yPoint: payload.yPoint
            }
        }
        case SET_DRAG: {
            return {
                ...state,
                isDragStart: payload.isDrag
            }
        }
        case CLEAR_INDEX_EMPTY_ITEM: {
            return {
                ...state,
                constructorItems: [...state.constructorItems.filter(item => item.itemType !== "empty")],
                indexEmptyItem: null,
                yPoint: null
            }
        }
        case SET_EMPTY_ITEM: {
            if (payload.index === state.indexEmptyItem
                || payload.index < 0
                || payload.index > state.constructorItems.length - 1) {
                return state;
            }
            state.constructorItems.splice(state.indexEmptyItem, 1);
            state.constructorItems.splice(payload.index, 0, {
                itemType: "empty",
                uuid: payload.uuid
            });
            return {
                ...state,
                constructorItems: [...state.constructorItems],
                indexEmptyItem: payload.index,
                yPoint: payload.yPoint
            }
        }
        case ADD_CONSTRUCTOR_ITEM: {
            if (payload.itemType === "bun") {
                return {
                    ...state,
                    bun: {
                        image: payload.image,
                        price: payload.price,
                        id: payload.id,
                        name: payload.name,
                        itemType: payload.itemType,
                        uuid: payload.uuid
                    }
                }
            }
            state.constructorItems.splice(payload.index ?? state.constructorItems.length, 0, {
                image: payload.image,
                price: payload.price,
                id: payload.id,
                name: payload.name,
                itemType: payload.itemType,
                uuid: payload.uuid
            });
            return {
                ...state,
                constructorItems: [...state.constructorItems]
            }
        }
        case REMOVE_CONSTRUCTOR_ITEM: {
            state.constructorItems.splice(payload.index, 1);
            return {
                ...state,
                constructorItems: [...state.constructorItems]
            }
        }
        case CLEAR_BURGER_CONSTRUCTOR: {
            return {
                constructorItems: [],
                bun: null,
                isDragStart: false,
                indexEmptyItem: null,
                startDragPosition: null,
                yPoint: null
            }
        }
        default:
            return state;
    }
});