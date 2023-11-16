import {
    ADD_CONSTRUCTOR_ITEM,
    REMOVE_CONSTRUCTOR_ITEM,
    SET_EMPTY_ITEM,
    SET_DRAG,
    CLEAR_INDEX_EMPTY_ITEM,
    CREATE_EMPTY_ITEM,
    SAVE_START_DRAG_POSITION,
    CLEAR_START_DRAG_POSITION,
    CLEAR_BURGER_CONSTRUCTOR,
    TBurgerConstructorActions,
    IConstructorItemStateParams
} from "../../services/actions/burgerConstructor";
export interface IBurgerConstructorReducerState {
    constructorItems: Array<IConstructorItemStateParams>;
    bun: IConstructorItemStateParams | null;
    isDragStart: boolean,
    startDragPosition: number | null,
    indexEmptyItem: number | null,
    yPoint: number | null
}

const initialState: IBurgerConstructorReducerState = {
    constructorItems: [],
    bun: null,
    isDragStart: false,
    indexEmptyItem: null,
    startDragPosition: null,
    yPoint: null
}

export const burgerConstructorReducer = ((state = initialState, action: TBurgerConstructorActions): IBurgerConstructorReducerState => {
    switch (action.type) {
        case SAVE_START_DRAG_POSITION: {
            return {
                ...state,
                startDragPosition: action.payload.index
            }
        }
        case CLEAR_START_DRAG_POSITION: {
            return {
                ...state,
                startDragPosition: null
            }
        }
        case CREATE_EMPTY_ITEM: {
            state.constructorItems.splice(action.payload.index, 1, {
                itemType: "empty",
                uuid: action.payload.uuid,
                id: "",
                image: "",
                index: null,
                name: "",
                price: -1
            });
            return {
                ...state,
                constructorItems: [...state.constructorItems],
                indexEmptyItem: action.payload.index,
                yPoint: action.payload.yPoint
            }
        }
        case SET_DRAG: {
            return {
                ...state,
                isDragStart: action.payload.isDrag
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
            if (action.payload.index === state.indexEmptyItem
                || state.indexEmptyItem === null
                || action.payload.index < 0
                || action.payload.index > state.constructorItems.length - 1) {
                return state;
            }
            state.constructorItems.splice(state.indexEmptyItem, 1);
            state.constructorItems.splice(action.payload.index, 0, {
                itemType: "empty",
                uuid: action.payload.uuid,
                id: "",
                image: "",
                index: null,
                name: "",
                price: -1
            });
            return {
                ...state,
                constructorItems: [...state.constructorItems],
                indexEmptyItem: action.payload.index,
                yPoint: action.payload.yPoint
            }
        }
        case ADD_CONSTRUCTOR_ITEM: {
            if (action.payload.itemType === "bun") {
                return {
                    ...state,
                    bun: {
                        image: action.payload.image,
                        price: action.payload.price,
                        id: action.payload.id,
                        name: action.payload.name,
                        itemType: action.payload.itemType,
                        uuid: action.payload.uuid,
                        index: null
                    }
                }
            }
            state.constructorItems.splice(action.payload.index ?? state.constructorItems.length, 0, {
                image: action.payload.image,
                price: action.payload.price,
                id: action.payload.id,
                name: action.payload.name,
                itemType: action.payload.itemType,
                uuid: action.payload.uuid,
                index: action.payload.index
            });
            return {
                ...state,
                constructorItems: [...state.constructorItems]
            }
        }
        case REMOVE_CONSTRUCTOR_ITEM: {
            state.constructorItems.splice(action.payload.index, 1);
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