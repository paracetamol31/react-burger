import { CHANGE_INPUT_VALUE } from "../actions/authorizationInputFields";

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

const initialState = {
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

export const authorizationInputFields = ((state = initialState, action) => {
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
    }
    return state;
});