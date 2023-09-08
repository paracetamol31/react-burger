import {
    registerRequest,
    loginRequest,
    userInfoRequest,
    accessTokenRequest
} from "../../utils/api";
import {
    setCookie,
    expires20Minut,
    accessToken,
    refreshToken
} from "../../utils/cookie";

export const SET_USER_INFO = "SET_USER_INFO";
export const USER_INFO_LOADED = "USER_INFO_LOADED";

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

export const register = (userInfo, callBack) => {
    return async (dispatch) => {
        registerRequest(userInfo).then(response => {
            setCookie(accessToken, response.accessToken.split('Bearer ')[1], { expires: expires20Minut });
            setCookie(refreshToken, response.refreshToken);
            dispatch(setUserInfo(response.user));
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
