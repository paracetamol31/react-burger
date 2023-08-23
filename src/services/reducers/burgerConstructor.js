import {
    ADD_CONSTRUCTOR_ITEM,
    REMOVE_CONSTRUCTOR_ITEM
} from "../../services/actions/burgerConstructor";

const initialState = {
    constructorItems: [],
    bun: null
}

/** TODO: Reducer получился слишком громоздким, когда буду вносить правки, разобью его на несколько.   */
export const burgerConstructorReducer = ((state = initialState, action) => {
    switch (action.type) {
        case ADD_CONSTRUCTOR_ITEM:
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
            return {
                ...state,
                constructorItems: [...state.constructorItems, ...[{
                    image: action.image,
                    price: action.price,
                    id: action.id,
                    name: action.name,
                    itemType: action.itemType
                }]]
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