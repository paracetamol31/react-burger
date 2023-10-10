import {
    CHANGE_INPUT_VALUE,
    CLEAR_INPUT_VALUE,
    CLEAR_RESET_PASSWORD_VALUE,
    TAuthorizationInputFieldsActions
} from "../actions/authorizationInputFields";

//Константы для имен страниц
export const registrationPage = "registrationPage";
export const loginPage = "loginPage";
export const forgotPasswordPage = "forgotPasswordPage";
export const resetPasswordPage = "resetPasswordPage";

//Константы для имен полей введа
export const nameInput = "nameInput";
export const emailInput = "emailInput";
export const passwordInput = "passwordInput";
export const codeInput = "codeInput";

export interface IRegistrationPageParams {
    name: string;
    email: string;
    password: string;
}

export interface ILoginPageParams {
    email: string;
    password: string;
}

export interface IForgotPasswordPageParams {
    email: string;
}

export interface IResetPasswordPageParams {
    password: string;
    code: string;
}

export interface IAuthorizationInputFieldsSate {
    registrationPage: IRegistrationPageParams,
    loginPage: ILoginPageParams,
    forgotPasswordPage: IForgotPasswordPageParams,
    resetPasswordPage: IResetPasswordPageParams
}

const initialState: IAuthorizationInputFieldsSate = {
    registrationPage: {
        name: "",
        email: "",
        password: ""
    },
    loginPage: {
        email: "",
        password: ""
    },
    forgotPasswordPage: {
        email: "",
    },
    resetPasswordPage: {
        password: "",
        code: ""
    }
}

export const authorizationInputFields = ((state = initialState, action: TAuthorizationInputFieldsActions) => {
    const { type } = action;
    if (type === CHANGE_INPUT_VALUE) {
        const { pageName, inputName, value } = action.payload;
        if (pageName === registrationPage) {
            switch (inputName) {
                case nameInput:
                    return {
                        ...state,
                        registrationPage: {
                            ...state.registrationPage,
                            name: value
                        }
                    }
                case emailInput:
                    return {
                        ...state,
                        registrationPage: {
                            ...state.registrationPage,
                            email: value
                        }
                    }
                case passwordInput:
                    return {
                        ...state,
                        registrationPage: {
                            ...state.registrationPage,
                            password: value
                        }
                    }
                default:
                    return state;
            }
        } else if (pageName === loginPage) {
            switch (inputName) {
                case emailInput:
                    return {
                        ...state,
                        loginPage: {
                            ...state.loginPage,
                            email: value
                        }
                    }
                case passwordInput:
                    return {
                        ...state,
                        loginPage: {
                            ...state.loginPage,
                            password: value
                        }
                    }
                default:
                    return state;
            }
        }
        else if (pageName === forgotPasswordPage) {
            switch (inputName) {
                case emailInput:
                    return {
                        ...state,
                        forgotPasswordPage: {
                            ...state.forgotPasswordPage,
                            email: value
                        }
                    }
                default:
                    return state;
            }
        }
        else if (pageName === resetPasswordPage) {
            switch (inputName) {
                case passwordInput:
                    return {
                        ...state,
                        resetPasswordPage: {
                            ...state.resetPasswordPage,
                            password: value
                        }
                    }
                case codeInput:
                    return {
                        ...state,
                        resetPasswordPage: {
                            ...state.resetPasswordPage,
                            code: value
                        }
                    }
                default:
                    return state;
            }
        }
    } else if (type === CLEAR_RESET_PASSWORD_VALUE) {
        return {
            ...state,
            resetPasswordPage: {
                ...state.resetPasswordPage,
                password: "",
                code: ""
            }
        }
    } else if (type === CLEAR_INPUT_VALUE) {
        return {
            ...state,
            ...initialState
        }
    }
    return state;
});