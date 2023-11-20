
import {
    constructorItemBun,
    constructorItemsTestData
} from "../../tests/testsData/constructorItemsTestData";
import { IConstructorItemStateParams } from "../actions/burgerConstructor";
import { COUNT_TOTAL_PRICE } from "../actions/totalPrice";
import {
    totalPrice as reducer,
    initialState
} from "./totalPrice";

describe("Redex::totalPriceReducer", () => {
    test("COUNT_TOTAL_PRICE", () => {
        const expectedTotalPrice = constructorItemsTestData.reduce(
            (accumulator: number, currentItem: IConstructorItemStateParams) => accumulator + currentItem.price,
            constructorItemBun.price * 2
        );

        expect(reducer(
            initialState,
            {
                type: COUNT_TOTAL_PRICE,
                payload: {
                    burgerConstructor: {
                        bun: constructorItemBun,
                        constructorItems: constructorItemsTestData,
                        indexEmptyItem: 999,
                        isDragStart: false,
                        startYPointEmptyItem: 999
                    }
                }
            }
        )).toEqual({ ...initialState, totalPrice: expectedTotalPrice });
    });
});