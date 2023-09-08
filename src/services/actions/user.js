import {
    registerRequest,
    loginRequest,
    userInfoRequest,
    accessTokenRequest,
    logoutRequest
} from "../../utils/api";
import {
    setCookie,
    expires20Minut,
    accessToken,
    refreshToken,
    deleteCookie
} from "../../utils/cookie";
import { clearInputValue } from "../../services/actions/authorizationInputFields";

export const SET_USER_INFO = "SET_USER_INFO";
export const USER_INFO_LOADED = "USER_INFO_LOADED";
export const CLEAR_USER_INFO = "CLEAR_USER_INFO";

export const setUserInfo = (userInfo) => {
    return {
        type: SET_USER_INFO,
        payload: userInfo
    }
}

export const userInfoLoaded = () => {
    return {
        type: USER_INFO_LOADED
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
            setCookie(accessToken, response.accessToken.split('Bearer ')[1], { expires: expires20Minut });
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
            setCookie(accessToken, response.accessToken.split('Bearer ')[1], { expires: expires20Minut });
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
            dispatch(userInfoLoaded());
        }).catch(e => {

            accessTokenRequest().then(response => {
                setCookie(accessToken, response.accessToken.split('Bearer ')[1], { expires: expires20Minut });
                setCookie(refreshToken, response.refreshToken)
            }).then(() => {

                userInfoRequest().then(response => {
                    dispatch(setUserInfo(response.user));
                }).catch(e => console.error(e)).finally(() => dispatch(userInfoLoaded()));

            }).catch(e => {
                console.error(e);
                dispatch(userInfoLoaded());
            })

        })
    }
}

export const logout = (callBack) => {
    return async (dispatch) => {
        logoutRequest().then(() => {
            deleteCookie(accessToken);
            deleteCookie(refreshToken);
            dispatch(clearUserInfo());
            callBack();
        }).catch(e => {
            console.error(e);
        });
    }
}
