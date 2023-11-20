import {
    INSERT_CONSTRUCTOR_ITEM,
    REMOVE_CONSTRUCTOR_ITEM,
    REPLACE_EMPTY_ITEM,
    SET_DRAG,
    CLEAR_INDEX_EMPTY_ITEM,
    CREATE_EMPTY_ITEM,
    CLEAR_BURGER_CONSTRUCTOR,
    TBurgerConstructorActions,
    IConstructorItemStateParams
} from "../../services/actions/burgerConstructor";
export interface IBurgerConstructorReducerState {
    constructorItems: Array<IConstructorItemStateParams>;
    bun: IConstructorItemStateParams | null;
    isDragStart: boolean,
    indexEmptyItem: number | null,
    startYPointEmptyItem: number | null
}

export const emptyItem = {
    itemType: "empty",
    uuid: "",
    id: "",
    image: "",
    index: null,
    name: "",
    price: -1
}

export const initialState: IBurgerConstructorReducerState = {
    constructorItems: [],
    bun: null,
    isDragStart: false,
    indexEmptyItem: null,
    startYPointEmptyItem: null
}

export const burgerConstructorReducer = ((state = initialState, action: TBurgerConstructorActions): IBurgerConstructorReducerState => {
    switch (action.type) {
        case CREATE_EMPTY_ITEM: {
            const copyConstructorItems = [...state.constructorItems];
            copyConstructorItems.splice(action.payload.index, 1, {
                ...emptyItem,
                uuid: action.payload.uuid
            })

            return {
                ...state,
                constructorItems: copyConstructorItems,
                indexEmptyItem: action.payload.index,
                startYPointEmptyItem: action.payload.yPoint
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
                startYPointEmptyItem: null
            }
        }
        case REPLACE_EMPTY_ITEM: {
            if (action.payload.index === state.indexEmptyItem
                || state.indexEmptyItem === null
                || action.payload.index < 0
                || action.payload.index > state.constructorItems.length - 1) {
                return state;
            }
            const copyConstructorItems = [...state.constructorItems];
            copyConstructorItems.splice(state.indexEmptyItem, 1); 
            copyConstructorItems.splice(action.payload.index, 0, {
                ...emptyItem,
                uuid: action.payload.uuid
            });
            return {
                ...state,
                constructorItems: copyConstructorItems,
                indexEmptyItem: action.payload.index,
                startYPointEmptyItem: action.payload.yPoint
            }
        }
        case INSERT_CONSTRUCTOR_ITEM: {
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
            const copyConstructorItems = [...state.constructorItems];
            copyConstructorItems.splice(action.payload.index ?? copyConstructorItems.length, 0, {
                image: action.payload.image,
                price: action.payload.price,
                id: action.payload.id,
                name: action.payload.name,
                itemType: action.payload.itemType,
                uuid: action.payload.uuid,
                index: action.payload.index || copyConstructorItems.length
            });
            return {
                ...state,
                constructorItems: copyConstructorItems
            }
        }
        case REMOVE_CONSTRUCTOR_ITEM: {
            const copyConstructorItems = [...state.constructorItems];
            copyConstructorItems.splice(action.payload.index, 1);
            return {
                ...state,
                constructorItems: copyConstructorItems
            }
        }
        case CLEAR_BURGER_CONSTRUCTOR: {
            return initialState;
        }
        default:
            return state;
    }
});