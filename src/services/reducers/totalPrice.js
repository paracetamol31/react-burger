import { COUNT_TOTAL_PRICE } from "../actions/totalPrice";

const initialState = {
    totalPrice: 0
}

export const totalPrice = ((state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case COUNT_TOTAL_PRICE: {
            if (payload.burgerConstructor.isDragStart) {
                return state;
            }
            return {
                ...state,
                totalPrice: payload.burgerConstructor.constructorItems.reduce((accumulator, currentItem) => accumulator + currentItem?.price || 0, 0)
                    + (payload.burgerConstructor.bun?.price || 0) * 2
            }
        }
        default:
            return state;
    }
});