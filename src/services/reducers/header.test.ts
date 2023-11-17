import {
    CLEAR_HEADER_STATE,
    SET_CURRENT_MENU_HEADER
} from "../actions/header";
import {
    headerReducer as reducer,
    initialState,
} from "./header";

describe("Redex::headerReducer", () => {
    test("SET_CURRENT_MENU_HEADER", () => {
        const expectedCurrentMenuItem = "orderFeed";
        expect(reducer(initialState, {
            type: SET_CURRENT_MENU_HEADER,
            payload: {
                currentMenuItem: expectedCurrentMenuItem
            }
        })).toEqual({ ...initialState, currentItem: expectedCurrentMenuItem });
    });

    test("CLEAR_HEADER_STATE", () => {
        expect(reducer({ ...initialState, currentItem: "burgerConstructor" }, { type: CLEAR_HEADER_STATE })).toEqual(initialState);
    });
});