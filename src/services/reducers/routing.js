import {
    START_PASSWORD_RESET,
    OVER_PASSWORD_RESET,
    SET_SAVED_LOCATION,
    CLEAR_SAVED_PATHNAME,
    CLEAR_ROUTING_STATE
} from "../actions/routing";

const initialState = {
    isStartedPasswordReset: false,
    isResetPassword: false,
    savedLocation: { pathname: "/" }
}

export const routingReducer = ((state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case START_PASSWORD_RESET:
            return {
                ...state,
                isStartedPasswordReset: true,
                isResetPassword: false
            }
        case OVER_PASSWORD_RESET:
            return {
                ...state,
                isStartedPasswordReset: false,
                isResetPassword: true
            }
        case SET_SAVED_LOCATION:
            return {
                ...state,
                savedLocation: payload.location
            }
        case CLEAR_SAVED_PATHNAME:
            return {
                ...state,
                savedLocation: {}
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