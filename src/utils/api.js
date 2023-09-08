import {
    accessToken,
    getCookie,
    refreshToken
} from "./cookie";

const BASE_URL = "https://norma.nomoreparties.space/api"
const urlRequestIngredients = `${BASE_URL}/ingredients`;
const urlRequestMakeOrder = `${BASE_URL}/orders`;
const urlRequestLogin = `${BASE_URL}/auth/login`; //эндпоинт для авторизации
const urlRequestRegister = `${BASE_URL}/auth/register`; //эндпоинт для регистрации пользователя
const urlRequestLogout = `${BASE_URL}/auth/logout`; //эндпоинт для выхода из системы
const urlRequestToken = `${BASE_URL}/auth/token`; //эндпоинт обновления токена
const urlRequestUserInfo = `${BASE_URL}/auth/user`; //эндпоинт запроса данных о пользователе

const makeRequest = async (url, method = "GET", headers, body) => {
    const response = await fetch(url, {
        headers: { ...{ "Content-Type": "application/json" }, ...headers },
        method: method,
        body: body
    });
    if (!response.ok) {
        throw new Error("Ошибка запроса!");
    }
    return await response.json();
}

export const makeRequestIngredients = async () => {
    return makeRequest(urlRequestIngredients);
}

export const makeOrderRequest = async (idItems) => {
    return await makeRequest(
        urlRequestMakeOrder,
        "POST",
        {},
        JSON.stringify({
            ingredients: idItems.map(item => item)
        })
    );
}

export const registerRequest = async (userInfo) => {
    return await makeRequest(
        urlRequestRegister,
        "POST",
        {},
        JSON.stringify(userInfo)
    );
}

export const loginRequest = async (userInfo) => {
    return await makeRequest(
        urlRequestLogin,
        "POST",
        {},
        JSON.stringify(userInfo)
    );
}

export const userInfoRequest = async () => {
    return await makeRequest(
        urlRequestUserInfo,
        "GET",
        { Authorization: 'Bearer ' + getCookie(accessToken) }
    );
}

export const accessTokenRequest = async () => {
    return await makeRequest(
        urlRequestToken,
        "POST",
        {},
        JSON.stringify({ token: getCookie(refreshToken) })
    );
}

export const logoutRequest = async () => {
    return await makeRequest(
        urlRequestLogout,
        "POST",
        {},
        JSON.stringify({ token: getCookie(refreshToken) })
    );
}