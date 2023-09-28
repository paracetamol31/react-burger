import {
    accessToken,
    getCookie,
    refreshToken
} from "./cookie";

const BASE_URL: string = "https://norma.nomoreparties.space/api"
const urlRequestIngredients: string = `${BASE_URL}/ingredients`;
const urlRequestMakeOrder: string = `${BASE_URL}/orders`;
const urlRequestLogin: string = `${BASE_URL}/auth/login`; //эндпоинт для авторизации
const urlRequestRegister: string = `${BASE_URL}/auth/register`; //эндпоинт для регистрации пользователя
const urlRequestLogout: string = `${BASE_URL}/auth/logout`; //эндпоинт для выхода из системы
const urlRequestToken: string = `${BASE_URL}/auth/token`; //эндпоинт обновления токена
const urlRequestUserInfo: string = `${BASE_URL}/auth/user`; //эндпоинт запроса данных о пользователе
const urlRequestPasswordForgot: string = `${BASE_URL}/password-reset`;
const urlRequestPasswordReset: string = `${BASE_URL}/password-reset/reset`;

interface IParamsMakeRequest {
    url: string,
    method?: string,
    headers?: HeadersInit,
    body?: BodyInit
};
interface IResponse {
    success: string
}

interface IResponseMakeRequestIngredients extends IResponse {
    data: Array<IIngredient>
}

interface IResponseUserInfoRequest extends IResponse {
    user: IUser
}
interface IResponseLoginRequest extends IResponseUserInfoRequest {
    accessToken: string,
    refreshToken: string
};

interface IResponseRegisterRequest extends IResponseLoginRequest { };

interface IResponseMakeOrderRequest extends IResponse {
    name: string,
    order: IOrder
}

interface IResponseAccessTokenRequest extends IResponse {
    accessToken: string,
    refreshToken: string
}

interface IResponseLogoutRequest extends IResponse {
    message: string
}

interface IResponseForgotPasswordRequest extends IResponseLogoutRequest { }

interface IResponseResetPasswordRequest extends IResponseLogoutRequest { }


const makeRequest = async <T extends IResponse>({ url, method = "GET", headers = {}, body }: IParamsMakeRequest): Promise<T> => {
    const response: Response = await fetch(url, {
        headers: { ...{ "Content-Type": "application/json" }, ...headers },
        method: method,
        body: body
    });
    if (!response.ok) {
        throw new Error("Ошибка запроса!");
    }
    return await response.json();
}

export const makeRequestIngredients = async (): Promise<IResponseMakeRequestIngredients> => {
    return await makeRequest<IResponseMakeRequestIngredients>({
        url: urlRequestIngredients
    });
}

export const makeOrderRequest = async (idItems: Array<string>): Promise<IResponseMakeOrderRequest> => {
    return await makeRequest<IResponseMakeOrderRequest>({
        url: urlRequestMakeOrder,
        method: "POST",
        headers: { Authorization: 'Bearer ' + getCookie(accessToken) },
        body: JSON.stringify({
            ingredients: idItems.map((item: string) => item)
        })
    });
}

export const registerRequest = async (userInfo: any): Promise<IResponseRegisterRequest> => {
    return await makeRequest<IResponseRegisterRequest>({
        url: urlRequestRegister,
        method: "POST",
        body: JSON.stringify(userInfo)
    });
}

export const loginRequest = async (userInfo: any): Promise<IResponseLoginRequest> => {
    return await makeRequest<IResponseLoginRequest>({
        url: urlRequestLogin,
        method: "POST",
        body: JSON.stringify(userInfo)
    });
}

export const userInfoRequest = async (): Promise<IResponseUserInfoRequest> => {
    return await makeRequest<IResponseUserInfoRequest>({
        url: urlRequestUserInfo,
        headers: { Authorization: 'Bearer ' + getCookie(accessToken) }
    });
}

export const accessTokenRequest = async (): Promise<IResponseAccessTokenRequest> => {
    return await makeRequest<IResponseAccessTokenRequest>({
        url: urlRequestToken,
        method: "POST",
        body: JSON.stringify({ token: getCookie(refreshToken) })
    });
}

export const logoutRequest = async (): Promise<IResponseLogoutRequest> => {
    return await makeRequest<IResponseLogoutRequest>({
        url: urlRequestLogout,
        method: "POST",
        body: JSON.stringify({ token: getCookie(refreshToken) })
    });
}

export const forgotPasswordRequest = async (email: any): Promise<IResponseForgotPasswordRequest> => {
    return await makeRequest<IResponseForgotPasswordRequest>({
        url: urlRequestPasswordForgot,
        method: "POST",
        body: JSON.stringify({ email })
    });
}

export const resetPasswordRequest = async (password: any, token: any): Promise<IResponseResetPasswordRequest> => {
    return await makeRequest<IResponseResetPasswordRequest>({
        url: urlRequestPasswordReset,
        method: "POST",
        body: JSON.stringify({ password, token })
    });
}