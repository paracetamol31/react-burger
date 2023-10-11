import { Location } from "react-router-dom";
import {
    START_PASSWORD_RESET,
    OVER_PASSWORD_RESET,
    SET_SAVED_LOCATION,
    CLEAR_SAVED_PATHNAME,
    CLEAR_ROUTING_STATE,
    TRoutingActions
} from "../actions/routing";

export interface IRoutingState {
    isStartedPasswordReset: boolean,
    isResetPassword: boolean,
    savedLocation: Location
}

const initialState: IRoutingState = {
    isStartedPasswordReset: false,
    isResetPassword: false,
    savedLocation: {
        pathname: "/",
        hash: "",
        key: "",
        search: "",
        state: ""
    }
}

export const routingReducer = ((state = initialState, action: TRoutingActions): IRoutingState => {
    switch (action.type) {
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
                savedLocation: action.payload.location
            }
        case CLEAR_SAVED_PATHNAME:
            return {
                ...state,
                savedLocation: {
                    pathname: "",
                    hash: "",
                    key: "",
                    search: "",
                    state: ""
                }
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