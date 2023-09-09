import {
    START_PASSWORD_RESET,
    OVER_PASSWORD_RESET,
    SET_SAVED_PATHNAME,
    CLEAR_SAVED_PATHNAME,
    CLEAR_ROUTING_STATE
} from "../actions/routing";

const initialState = {
    isStartedPasswordReset: false,
    savedPathname: "/"
}

export const routingReducer = ((state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case START_PASSWORD_RESET:
            return {
                ...state,
                isStartedPasswordReset: true
            }
        case OVER_PASSWORD_RESET:
            return {
                ...state,
                isStartedPasswordReset: false
            }
        case SET_SAVED_PATHNAME:
            return {
                ...state,
                savedPathname: payload.pathname
            }
        case CLEAR_SAVED_PATHNAME:
            return {
                ...state,
                savedPathname: "/"
            }
        case CLEAR_ROUTING_STATE: {
            return {
                ...state,
                ...initialState
            }
        }
        default:
            return state;
    }
});