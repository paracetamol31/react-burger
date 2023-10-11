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
    deleteCookie
} from "../../utils/cookie";
import {
    clearInputValue
} from "../../services/actions/authorizationInputFields";
import {
    startedPasswordReset,
    clearRoutingState
} from "./routing";
import { clearHeaderState } from "../../services/actions/header";

export const SET_USER_INFO = "SET_USER_INFO";
export const USER_INFO_LOADED = "USER_INFO_LOADED";
export const CLEAR_USER_INFO = "CLEAR_USER_INFO";

export const setUserInfo = (userInfo) => {
    return {
        type: SET_USER_INFO,
        payload: userInfo
    }
}

export const userInfoLoaded = (value) => {
    return {
        type: USER_INFO_LOADED,
        payload: { value }
    }
}

export const clearUserInfo = () => {
    return {
        type: CLEAR_USER_INFO
    }
}

export const register = (userInfo, callBack) => {
    return async (dispatch) => {
        registerRequest(userInfo).then(response => {
            setCookie(accessToken, response.accessToken.split('Bearer ')[1], { expires: expires20Minute });
            setCookie(refreshToken, response.refreshToken);
            dispatch(setUserInfo(response.user));
            dispatch(clearInputValue());
            callBack();
        }).catch(e => {
            console.error(e);
        });
    }
}

export const login = (userInfo, callBack) => {
    return async (dispatch) => {
        loginRequest(userInfo).then(response => {
            setCookie(accessToken, response.accessToken.split('Bearer ')[1], { expires: expires20Minute });
            setCookie(refreshToken, response.refreshToken);
            dispatch(setUserInfo(response.user));
            dispatch(clearInputValue());
            callBack();
        }).catch(e => {
            console.error(e);
        });
    }
}

export const getUserInfo = () => {
    return async (dispatch) => {
        userInfoRequest().then(response => {
            dispatch(setUserInfo(response.user));
            dispatch(userInfoLoaded(true));
        }).catch(e => {

            accessTokenRequest().then(response => {
                setCookie(accessToken, response.accessToken.split('Bearer ')[1], { expires: expires20Minute });
                setCookie(refreshToken, response.refreshToken)
            }).then(() => {

                userInfoRequest().then(response => {
                    dispatch(setUserInfo(response.user));
                }).finally(() => dispatch(userInfoLoaded(true)));

            }).catch(e => {
                dispatch(userInfoLoaded(true));
            })

        })
    }
}

export const logout = (callBack) => {
    return async (dispatch) => {
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

export const forgotPassword = (email, callBack) => {
    return async (dispatch) => {
        forgotPasswordRequest(email).then(() => {
            dispatch(startedPasswordReset());
            callBack();
        }).catch(e => {
            console.error(e);
        });
    }
}

export const resetPassword = (password, code, callBack) => {
    return async (dispatch) => {
        resetPasswordRequest(password, code).then(() => {
            callBack();
        }).catch(e => {
            console.error(e);
        });
    }
}