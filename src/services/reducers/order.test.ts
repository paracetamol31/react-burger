import {
    APPLY_ORDER_ID_FAILED,
    APPLY_ORDER_ID_REQUEST,
    APPLY_ORDER_ID_SUCCESS,
    CLEAR_ORDER_INFO
} from "../actions/order";
import {
    orderReducer as reducer,
    initialState
} from "./order";

describe("Redex::orderReducer", () => {
    test("APPLY_ORDER_ID_REQUEST", () => {
        expect(reducer(initialState, { type: APPLY_ORDER_ID_REQUEST })).toEqual({ ...initialState, orderIdRequest: true });
    });

    test("APPLY_ORDER_ID_SUCCESS", () => {
        const expectedOrderNumber: number = 1444;
        expect(reducer(initialState, {
            type: APPLY_ORDER_ID_SUCCESS,
            payload: {
                orderNumber: expectedOrderNumber
            }
        })).toEqual({ ...initialState, orderId: expectedOrderNumber });
    });

    test("APPLY_ORDER_ID_FAILED", () => {
        expect(reducer(initialState, {
            type: APPLY_ORDER_ID_FAILED
        })).toEqual({
            ...initialState,
            orderIdFailed: true,
            orderIdRequest: false
        });
    })

    test("CLEAR_ORDER_INFO", () => {
        expect(reducer(initialState, {
            type: CLEAR_ORDER_INFO
        })).toEqual(initialState);
    })
});