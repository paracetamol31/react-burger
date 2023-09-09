export const START_PASSWORD_RESET = "START_PASSWORD_RESET";
export const OVER_PASSWORD_RESET = "OVER_PASSWORD_RESET";
export const SET_SAVED_PATHNAME = "SET_SAVED_PATHNAME";
export const CLEAR_SAVED_PATHNAME = "CLEAR_SAVED_PATHNAME";
export const CLEAR_ROUTING_STATE = "CLEAR_ROUTING_STATE";

export const startedPasswordReset = () => {
    return {
        type: START_PASSWORD_RESET
    }
}

export const overPasswordReset = () => {
    return {
        type: OVER_PASSWORD_RESET
    }
}

export const setSavedPathname = (pathname) => {
    return {
        type: SET_SAVED_PATHNAME,
        payload: { pathname }
    }
}

export const clearSavedPathname = () => {
    return {
        type: CLEAR_SAVED_PATHNAME
    }
}

export const clearRoutingState = () => {
    return {
        type: CLEAR_ROUTING_STATE
    }
}


