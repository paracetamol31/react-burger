import {
    ADD_CONSTRUCTOR_ITEM,
    REMOVE_CONSTRUCTOR_ITEM,
    SET_EMPTY_ITEM,
    SET_DRAG,
    CLEAR_INDEX_EMPTY_ITEM,
    CREATE_EMPTY_ITEM,
    SAVE_START_DRAG_POSITION,
    CLEAR_START_DRAG_POSITION
} from "../../services/actions/burgerConstructor";

const initialState = {
    constructorItems: [],
    bun: null,
    isDragStart: false,
    indexEmptyItem: null,
    startDragPosition: null,
    yPoint: null
}

/** TODO: Reducer получился слишком громоздким, когда буду вносить правки, разобью его на несколько.   */
export const burgerConstructorReducer = ((state = initialState, action) => {
    switch (action.type) {
        case SAVE_START_DRAG_POSITION: {
            return {
                ...state,
                startDragPosition: action.index
            }
        }
        case CLEAR_START_DRAG_POSITION: {
            return {
                ...state,
                startDragPosition: null
            }
        }
        case CREATE_EMPTY_ITEM: {
            state.constructorItems.splice(action.index, 1, {
                itemType: "empty"
            });
            return {
                ...state,
                constructorItems: [...state.constructorItems],
                indexEmptyItem: action.index,
                yPoint: action.yPoint
            }
        }
        case SET_DRAG: {
            return {
                ...state,
                isDragStart: action.isDrag
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
            if (action.index === state.indexEmptyItem
                || action.index < 0
                || action.index > state.constructorItems.length - 1) {
                return state;
            }
            state.constructorItems.splice(state.indexEmptyItem, 1);
            state.constructorItems.splice(action.index, 0, {
                itemType: "empty"
            });
            return {
                ...state,
                constructorItems: [...state.constructorItems],
                indexEmptyItem: action.index,
                yPoint: action.yPoint
            }
        }
        case ADD_CONSTRUCTOR_ITEM: {
            if (action.itemType === "bun") {
                return {
                    ...state,
                    bun: {
                        image: action.image,
                        price: action.price,
                        id: action.id,
                        name: action.name,
                        itemType: action.itemType
                    }
                }
            }
            state.constructorItems.splice(action.index ?? state.constructorItems.length, 0, {
                image: action.image,
                price: action.price,
                id: action.id,
                name: action.name,
                itemType: action.itemType
            });
            return {
                ...state,
                constructorItems: [...state.constructorItems]
            }
        }
        case REMOVE_CONSTRUCTOR_ITEM: {
            state.constructorItems.splice(action.index, 1);
            return {
                ...state,
                constructorItems: [...state.constructorItems]
            }
        }
        default:
            return state;
    }
});