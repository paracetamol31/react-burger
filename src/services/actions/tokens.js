import {
    registerRequest,
    loginRequest
} from "../../utils/api";

const SET_REFRESH_TOKEN = "SET_REFRESH_TOKEN";
const GET_REFRESH_TOKEN = "GET_REFRESH_TOKEN";
const DELETE_REFRESH_TOKEN = "DELETE_REFRESH_TOKEN";

const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN";
const GET_ACCESS_TOKEN = "GET_ACCESS_TOKEN";
const DELETE_ACCESS_TOKEN = "DELETE_ACCESS_TOKEN";


export const register = (userInfo) => {
    return async (dispatch) => {
        registerRequest(userInfo).then(response => {
        }).catch(e => {
            console.error(e);
        });
    }
}

export const login = (userInfo) => {
    return async (dispatch) => {
        loginRequest(userInfo).then(response => {
        }).catch(e => {
            console.error(e);
        });
    }
}