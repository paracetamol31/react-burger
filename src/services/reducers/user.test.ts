import { userInfoTestData } from "../../tests/testsData/userInfoTestData";
import { CLEAR_USER_INFO, SET_USER_INFO, USER_INFO_LOADED } from "../actions/user";
import {
    userReducer as reducer,
    initialState
} from "./user";

describe("Redex::userReducer", () => {
    test("SET_USER_INFO", () => {
        expect(reducer(initialState, {
            type: SET_USER_INFO,
            payload: {
                userInfo: {
                    email: userInfoTestData.email,
                    name: userInfoTestData.name
                }
            }
        }
        )).toEqual({
            ...initialState,
            userInfo: userInfoTestData
        });
    });

    test("USER_INFO_LOADED", () => {
        expect(reducer(initialState, { type: USER_INFO_LOADED, payload: { value: true } })).toEqual({
            ...initialState,
            isUserInfoLoaded: true
        });
    });

    test("CLEAR_USER_INFO", () => {
        expect(reducer(
            {
                ...initialState,
                isUserInfoLoaded: true,
                userInfo: userInfoTestData
            },
            {
                type: CLEAR_USER_INFO,

            })).toEqual(initialState);
    });
});