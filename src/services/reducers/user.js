import {
    SET_USER_INFO,
    USER_INFO_LOADED,
    CLEAR_USER_INFO
} from "../actions/user";

const initialState = {
    userInfo: null,
    isUserInfoLoaded: false
}

export const userReducer = ((state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_USER_INFO:
            return {
                ...state,
                userInfo: {
                    ...state.isUserInfoLoaded,
                    email: payload.email,
                    name: payload.name
                }
            }
        case USER_INFO_LOADED:
            return {
                ...state,
                isUserInfoLoaded: payload.value
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