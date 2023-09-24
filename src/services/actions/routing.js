export const START_PASSWORD_RESET = "START_PASSWORD_RESET";
export const OVER_PASSWORD_RESET = "OVER_PASSWORD_RESET";
export const SET_SAVED_LOCATION = "SET_SAVED_LOCATION";
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

export const setSavedLocation = (location) => {
    return {
        type: SET_SAVED_LOCATION,
        payload: { location }
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


