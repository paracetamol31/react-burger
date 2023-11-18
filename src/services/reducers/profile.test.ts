import {
    menuItemProfile
} from "../../components/profile-panel/profile-panel";
import { SET_CURRENT_MENU_PROFILE_PANEL } from "../actions/profile";
import {
    profileReducer as reducer,
    initialState,
} from "./profile";

describe("Redex::displayedOrderReducer", () => {
    test("SET_CURRENT_MENU_PROFILE_PANEL", () => {
        const expectedData = {
            footerText: "expectedFooterText",
            currentItem: menuItemProfile
        };
        expect(reducer(initialState, {
            type: SET_CURRENT_MENU_PROFILE_PANEL,
            payload: {
                menuItem: expectedData.currentItem,
                footerText: expectedData.footerText
            }
        })).toEqual({ ...initialState, ...expectedData });
    });
});