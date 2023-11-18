import { orderShortInfoTestData } from "../../tests/testsData/orderShortInfoTestData";
import {
    APPLY_DISPLAYED_ORDER_INFO_FAILED,
    APPLY_DISPLAYED_ORDER_INFO_REQUEST,
    APPLY_DISPLAYED_ORDER_INFO_SUCCESS,
    CLEAR_DISPLAYED_ORDER_INFO,
    SET_DISPLAYED_ORDER_INFO
} from "../actions/displayedOrder";
import {
    displayedOrderReducer as reducer,
    initialState,
} from "./displayedOrder";

describe("Redex::displayedOrderReducer", () => {
    test("APPLY_DISPLAYED_ORDER_INFO_REQUEST", () => {
        expect(reducer(initialState, {
            type: APPLY_DISPLAYED_ORDER_INFO_REQUEST
        })).toEqual({ ...initialState, displayedOrderIdRequest: true });
    });

    test("APPLY_DISPLAYED_ORDER_INFO_SUCCESS", () => {
        const expectedOrderShortInfo = Object.assign(orderShortInfoTestData);
        expect(reducer(initialState, {
            type: APPLY_DISPLAYED_ORDER_INFO_SUCCESS,
            payload: {
                displayedOrderInfo: orderShortInfoTestData[0]
            }
        })).toEqual({
            ...initialState,
            displayedOrderIdFailed: false,
            displayedOrderIdRequest: false,
            displayedOrderInfo: expectedOrderShortInfo[0]
        });
    });

    test("APPLY_DISPLAYED_ORDER_INFO_FAILED", () => {
        expect(reducer(initialState, {
            type: APPLY_DISPLAYED_ORDER_INFO_FAILED
        })).toEqual({ ...initialState, displayedOrderIdFailed: true });
    });

    test("SET_DISPLAYED_ORDER_INFO", () => {
        const expectedOrderShortInfo = Object.assign(orderShortInfoTestData);
        expect(reducer(initialState, {
            type: SET_DISPLAYED_ORDER_INFO,
            payload: {
                displayedOrderInfo: orderShortInfoTestData[0]
            }
        })).toEqual({
            ...initialState,
            displayedOrderIdFailed: false,
            displayedOrderIdRequest: false,
            displayedOrderInfo: expectedOrderShortInfo[0]
        });
    });

    test("CLEAR_DISPLAYED_ORDER_INFO", () => {
        expect(reducer({
            ...initialState,
            displayedOrderIdFailed: true,
            displayedOrderIdRequest: true,
            displayedOrderInfo: orderShortInfoTestData[0]
        }, {
            type: CLEAR_DISPLAYED_ORDER_INFO
        })).toEqual(initialState);
    });
});