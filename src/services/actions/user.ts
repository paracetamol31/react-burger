import {
    registerRequest,
    loginRequest,
    userInfoRequest,
    accessTokenRequest,
    logoutRequest,
    forgotPasswordRequest,
    resetPasswordRequest
} from "../../utils/api";
import {
    setCookie,
    expires20Minute,
    accessToken,
    refreshToken,
    deleteCookie,
    getCookie
} from "../../utils/cookie";
import {
    clearInputValue
} from "../../services/actions/authorizationInputFields";
import {
    startedPasswordReset,
    clearRoutingState
} from "./routing";
import { clearHeaderState } from "../../services/actions/header";
import { AppDispatch, AppThunk } from "../types";

export const SET_USER_INFO: "SET_USER_INFO" = "SET_USER_INFO";
export const USER_INFO_LOADED: "USER_INFO_LOADED" = "USER_INFO_LOADED";
export const CLEAR_USER_INFO: "CLEAR_USER_INFO" = "CLEAR_USER_INFO";

export interface IUserInfo {
    email?: string;
    password?: string;
    name?: string;
}

export interface ISetUserInfoAction {
    readonly type: typeof SET_USER_INFO;
    readonly payload: ISetUserInfoPayload;
}

export interface ISetUserInfoPayload {
    userInfo: IUser;
}

export interface IUserInfoLoadedAction {
    readonly type: typeof USER_INFO_LOADED;
    readonly payload: IUserInfoLoadedPayload;
}

export interface IUserInfoLoadedPayload {
    value: boolean
}

export interface IClearUserInfoAction {
    readonly type: typeof CLEAR_USER_INFO;
}

export const setUserInfo = (payload: ISetUserInfoPayload): ISetUserInfoAction => {
    return {
        type: SET_USER_INFO,
        payload
    }
}

export const userInfoLoaded = (payload: IUserInfoLoadedPayload): IUserInfoLoadedAction => {
    return {
        type: USER_INFO_LOADED,
        payload
    }
}

export const clearUserInfo = (): IClearUserInfoAction => {
    return {
        type: CLEAR_USER_INFO
    }
}

export const register: AppThunk = (userInfo: IUserInfo, callBack: Function) => {
    return async (dispatch: AppDispatch) => {
        registerRequest(userInfo).then(response => {
            setCookie(accessToken, response.accessToken.split('Bearer ')[1], { expires: expires20Minute });
            setCookie(refreshToken, response.refreshToken);
            dispatch(setUserInfo({ userInfo: response.user }));
            dispatch(clearInputValue());
            callBack();
        }).catch(e => {
            console.error(e);
        });
    }
}

export const login: AppThunk = (userInfo: IUserInfo, callBack: Function) => {
    return async (dispatch: AppDispatch) => {
        loginRequest(userInfo).then(response => {
            setCookie(accessToken, response.accessToken.split('Bearer ')[1], { expires: expires20Minute });
            setCookie(refreshToken, response.refreshToken);
            dispatch(setUserInfo({ userInfo: response.user }));
            dispatch(clearInputValue());
            callBack();
        }).catch(e => {
            console.error(e);
        });
    }
}

export const getUserInfo: AppThunk = () => {
    return async (dispatch: AppDispatch) => {
        const userInfoRequestCallback: Function = () => 
            userInfoRequest().then(response => {
                dispatch(setUserInfo({ userInfo: response.user }));
            }).finally(() => {
                dispatch(userInfoLoaded({ value: true }));
            });

        if (!getCookie(accessToken)) {
            accessTokenRequest().then(response => {
                setCookie(accessToken, response.accessToken.split('Bearer ')[1], { expires: expires20Minute });
                setCookie(refreshToken, response.refreshToken)
            }).then(() => {
                userInfoRequestCallback();
            }).catch(()=> {
                dispatch(userInfoLoaded({ value: true }));
            })
        } else {
            userInfoRequestCallback();
        }
    }
}

export const logout: AppThunk = (callBack: Function) => {
    return async (dispatch: AppDispatch) => {
        logoutRequest().catch(e => {
            console.error(e);
        }).finally(() => {
            deleteCookie(accessToken);
            deleteCookie(refreshToken);
            dispatch(clearUserInfo());
            dispatch(clearHeaderState());
            dispatch(clearRoutingState());
            callBack();
        });
    }
}

export const forgotPassword: AppThunk = (email: string, callBack: Function) => {
    return async (dispatch: AppDispatch) => {
        forgotPasswordRequest(email).then(() => {
            dispatch(startedPasswordReset());
            callBack();
        }).catch(e => {
            console.error(e);
        });
    }
}

export const resetPassword: AppThunk = (password: string, code: string, callBack: Function) => {
    return async (dispatch: AppDispatch) => {
        resetPasswordRequest(password, code).then(() => {
            callBack();
        }).catch(e => {
            console.error(e);
        });
    }
}

export type TUserActions =
    ISetUserInfoAction
    | IUserInfoLoadedAction
    | IClearUserInfoAction;
