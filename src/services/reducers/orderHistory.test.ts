import { orderShortInfoTestData } from "../../tests/testsData/orderShortInfoTestData";
import {
    WS_ORDER_HISTORY_CONNECTION_CLOSED,
    WS_ORDER_HISTORY_CONNECTION_ERROR,
    WS_ORDER_HISTORY_CONNECTION_SUCCESS,
    WS_ORDER_HISTORY_GET_MESSAGE
} from "../actions/orderHistory";
import {
    orderHistoryReducer as reducer,
    initialState,
    IOrderHistoryItemParams
} from "./orderHistory";

describe("Redex::orderHistoryReducer", () => {
    test("WS_ORDER_FEED_CONNECTION_SUCCESS", () => {
        expect(reducer(initialState, {
            type: WS_ORDER_HISTORY_CONNECTION_SUCCESS,
            payload: new Event("anyEvent")
        })).toEqual({ ...initialState, wsConnected: true });
    });

    test("WS_ORDER_HISTORY_CONNECTION_ERROR", () => {
        const expectedEvent: Event = new Event("anyEvent");
        expect(reducer(initialState, {
            type: WS_ORDER_HISTORY_CONNECTION_ERROR,
            payload: expectedEvent
        })).toEqual({ ...initialState, error: expectedEvent, wsConnected: false });
    });

    test("WS_ORDER_HISTORY_CONNECTION_CLOSED", () => {
        expect(reducer(initialState, {
            type: WS_ORDER_HISTORY_CONNECTION_CLOSED,
            payload: new Event("anyEvent")
        })).toEqual({ ...initialState, wsConnected: false });
    });

    test("WS_ORDER_HISTORY_GET_MESSAGE", () => {
        const expectedOrderData: IOrderHistoryItemParams = {
            orders: orderShortInfoTestData,
            success: true,
            total: 9999,
            totalToday: 999
        }
        expect(reducer(initialState, {
            type: WS_ORDER_HISTORY_GET_MESSAGE,
            payload: Object.assign(expectedOrderData)
        })).toEqual({ ...initialState, orderData: expectedOrderData });
    });
});