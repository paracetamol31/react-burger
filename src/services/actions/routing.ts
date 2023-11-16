import { Location } from "react-router-dom";

export const START_PASSWORD_RESET: "START_PASSWORD_RESET" = "START_PASSWORD_RESET";
export const OVER_PASSWORD_RESET: "OVER_PASSWORD_RESET" = "OVER_PASSWORD_RESET";
export const SET_SAVED_LOCATION: "SET_SAVED_LOCATION" = "SET_SAVED_LOCATION";
export const CLEAR_SAVED_PATHNAME: "CLEAR_SAVED_PATHNAME" = "CLEAR_SAVED_PATHNAME";
export const CLEAR_ROUTING_STATE: "CLEAR_ROUTING_STATE" = "CLEAR_ROUTING_STATE";

export interface IStartedPasswordResetAction {
    readonly type: typeof START_PASSWORD_RESET;
}

export interface IOverPasswordResetAction {
    readonly type: typeof OVER_PASSWORD_RESET;
}

export interface ISetSavedLocationAction {
    readonly type: typeof SET_SAVED_LOCATION;
    readonly payload: ISetSavedLocationPayload
}

export interface ISetSavedLocationPayload {
    location: Location
}

export interface IClearSavedPathnameAction {
    readonly type: typeof CLEAR_SAVED_PATHNAME;
}

export interface IClearRoutingStateAction {
    readonly type: typeof CLEAR_ROUTING_STATE;
}

export const startedPasswordReset = (): IStartedPasswordResetAction => {
    return {
        type: START_PASSWORD_RESET
    }
}

export const overPasswordReset = (): IOverPasswordResetAction => {
    return {
        type: OVER_PASSWORD_RESET
    }
}

export const setSavedLocation = (payload: ISetSavedLocationPayload): ISetSavedLocationAction => {
    return {
        type: SET_SAVED_LOCATION,
        payload
    }
}
export const clearSavedPathname = (): IClearSavedPathnameAction => {
    return {
        type: CLEAR_SAVED_PATHNAME
    }
}

export const clearRoutingState = (): IClearRoutingStateAction => {
    return {
        type: CLEAR_ROUTING_STATE
    }
}

export type TRoutingActions =
    IStartedPasswordResetAction
    | IOverPasswordResetAction
    | ISetSavedLocationAction
    | IClearSavedPathnameAction
    | IClearRoutingStateAction;



