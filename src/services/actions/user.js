import {
    registerRequest,
    loginRequest
} from "../../utils/api";
import {
    setCookie,
    expires20Minut,
    accessToken,
    refreshToken
} from "../../utils/cookieHelper";

export const SET_USER_INFO = "SET_USER_INFO";

export const setUserInfo = (userInfo) => {
    return {
        type: SET_USER_INFO,
        payload: userInfo
    }
}

export const register = (userInfo) => {
    return async (dispatch) => {
        registerRequest(userInfo).then(response => {
            setCookie(accessToken, response.accessToken.split('Bearer ')[1], { expires: expires20Minut });
            setCookie(refreshToken, response.accessToken);
            dispatch(setUserInfo(response.user));
        }).catch(e => {
            console.error(e);
        });
    }
}

export const login = (userInfo) => {
    return async (dispatch) => {
        loginRequest(userInfo).then(response => {
            setCookie(accessToken, response.accessToken.split('Bearer ')[1], { expires: expires20Minut });
            setCookie(refreshToken, response.accessToken);
            dispatch(setUserInfo(response.user));
        }).catch(e => {
            console.error(e);
        });
    }
}