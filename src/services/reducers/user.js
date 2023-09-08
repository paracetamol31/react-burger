import {
    SET_USER_INFO,
    USER_INFO_LOADED,
    CLEAR_USER_INFO
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
        case CLEAR_USER_INFO:
            return {
                ...state,
                ...initialState
            }
        default:
            return state;
    }
});