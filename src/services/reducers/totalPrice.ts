import { IConstructorItemStateParams } from "../actions/burgerConstructor";
import { COUNT_TOTAL_PRICE, TTotalPriceActions } from "../actions/totalPrice";

export interface ITotalPriceState {
    totalPrice: number;
}

export const initialState: ITotalPriceState = {
    totalPrice: 0
}

export const totalPrice = ((state = initialState, action: TTotalPriceActions): ITotalPriceState => {
    switch (action.type) {
        case COUNT_TOTAL_PRICE: {
            if (action.payload.burgerConstructor.isDragStart) {
                return state;
            }
            return {
                ...state,
                totalPrice: action.payload.burgerConstructor.constructorItems.reduce(
                    (accumulator: number, currentItem: IConstructorItemStateParams) => accumulator + (currentItem.price || 0), 0
                )
                    + (action.payload.burgerConstructor.bun?.price || 0) * 2
            }
        }
        default:
            return state;
    }
});