import { COUNT_TOTAL_PRICE } from "../actions/totalPrice";

const initialState = {
    totalPrice: 0
}

export const totalPrice = ((state = initialState, action) => {
    switch (action.type) {
        case COUNT_TOTAL_PRICE: {
            if(action.burgerConstructor.isDragStart){
                return state;
            }
            return {
                ...state,
                totalPrice: action.burgerConstructor.constructorItems.reduce((accumulator, currentItem) => accumulator + currentItem?.price || 0, 0)
                    + (action.burgerConstructor.bun?.price || 0) * 2
            }
        }
        default:
            return state;
    }
});