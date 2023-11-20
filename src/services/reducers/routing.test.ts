import {
    CLEAR_ROUTING_STATE,
    CLEAR_SAVED_PATHNAME,
    OVER_PASSWORD_RESET,
    SET_SAVED_LOCATION,
    START_PASSWORD_RESET
} from "../actions/routing";
import {
    routingReducer as reducer,
    initialState,
    emptyLocation
} from "./routing";

describe("Redex::routingReducer", () => {
    test("START_PASSWORD_RESET", () => {
        expect(reducer(initialState, { type: START_PASSWORD_RESET })).toEqual({
            ...initialState,
            isStartedPasswordReset: true,
            isResetPassword: false
        });
    });

    test("OVER_PASSWORD_RESET", () => {
        expect(reducer(initialState, { type: OVER_PASSWORD_RESET })).toEqual({
            ...initialState,
            isStartedPasswordReset: false,
            isResetPassword: true
        });
    });

    test("SET_SAVED_LOCATION", () => {
        const expectLocation = emptyLocation;
        expect(reducer(initialState, {
            type: SET_SAVED_LOCATION,
            payload: {
                location: { ...expectLocation }
            }
        })).toEqual({
            ...initialState,
            savedLocation: expectLocation
        });
    });

    test("CLEAR_SAVED_PATHNAME", () => {
        expect(reducer(initialState, {
            type: CLEAR_SAVED_PATHNAME
        })).toEqual({ ...initialState, savedLocation: emptyLocation });
    });

    test("CLEAR_ROUTING_STATE", () => {
        expect(reducer(initialState, {
            type: CLEAR_ROUTING_STATE
        })).toEqual(initialState);
    });
});