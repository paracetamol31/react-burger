import {
    SET_USER_INFO,
    USER_INFO_LOADED
} from "../actions/user";

const initialState = {
    userInfo: null,
    userInfoLoaded: false
}

export const userReducer = ((state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_USER_INFO:
            return {
                ...state,
                userInfo: {
                    ...state.userInfoLoaded,
                    email: payload.email,
                    name: payload.name
                }
            }
        case USER_INFO_LOADED:
            return {
                ...state,
                userInfoLoaded: true
            }
        default:
            return state;
    }
});