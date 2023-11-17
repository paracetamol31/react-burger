import { CHANGE_INPUT_VALUE, CLEAR_INPUT_VALUE, CLEAR_RESET_PASSWORD_VALUE } from "../actions/authorizationInputFields";
import {
    authorizationInputFields as reducer,
    initialState,
    registrationPage,
    nameInput,
    emailInput,
    passwordInput,
    loginPage,
    forgotPasswordPage,
    resetPasswordPage,
    codeInput,
} from "./authorizationInputFields";

describe("Redex::authorizationInputFields", () => {
    test("CHANGE_INPUT_VALUE::registrationPage", () => {
        const expectedData = {
            inputName: "expectedName",
            emailInput: "expectedEmail",
            passwordInput: "expectedPassword"
        }

        expect(reducer(initialState, {
            type: CHANGE_INPUT_VALUE,
            payload: {
                pageName: registrationPage,
                inputName: nameInput,
                value: expectedData.inputName
            }
        })).toEqual({
            ...initialState,
            registrationPage: { ...initialState.registrationPage, name: expectedData.inputName }
        });

        expect(reducer(initialState, {
            type: CHANGE_INPUT_VALUE,
            payload: {
                pageName: registrationPage,
                inputName: emailInput,
                value: expectedData.emailInput
            }
        })).toEqual({
            ...initialState,
            registrationPage: { ...initialState.registrationPage, email: expectedData.emailInput }
        });

        expect(reducer(initialState, {
            type: CHANGE_INPUT_VALUE,
            payload: {
                pageName: registrationPage,
                inputName: passwordInput,
                value: expectedData.passwordInput
            }
        })).toEqual({
            ...initialState,
            registrationPage: { ...initialState.registrationPage, password: expectedData.passwordInput }
        });
    });

    test("CHANGE_INPUT_VALUE::loginPage", () => {
        const expectedData = {
            emailInput: "expectedEmail",
            passwordInput: "expectedPassword"
        }

        expect(reducer(initialState, {
            type: CHANGE_INPUT_VALUE,
            payload: {
                pageName: loginPage,
                inputName: emailInput,
                value: expectedData.emailInput
            }
        })).toEqual({
            ...initialState,
            loginPage: { ...initialState.loginPage, email: expectedData.emailInput }
        });

        expect(reducer(initialState, {
            type: CHANGE_INPUT_VALUE,
            payload: {
                pageName: loginPage,
                inputName: passwordInput,
                value: expectedData.passwordInput
            }
        })).toEqual({
            ...initialState,
            loginPage: { ...initialState.loginPage, password: expectedData.passwordInput }
        });
    });

    test("CHANGE_INPUT_VALUE::forgotPasswordPage", () => {
        const expectedData = {
            emailInput: "expectedEmail",
        }

        expect(reducer(initialState, {
            type: CHANGE_INPUT_VALUE,
            payload: {
                pageName: forgotPasswordPage,
                inputName: emailInput,
                value: expectedData.emailInput
            }
        })).toEqual({
            ...initialState,
            forgotPasswordPage: { ...initialState.forgotPasswordPage, email: expectedData.emailInput }
        });
    });

    test("CHANGE_INPUT_VALUE::resetPasswordPage", () => {
        const expectedData = {
            passwordInput: "expectedPassword",
            codeInput: "expectedCode"
        }

        expect(reducer(initialState, {
            type: CHANGE_INPUT_VALUE,
            payload: {
                pageName: resetPasswordPage,
                inputName: passwordInput,
                value: expectedData.passwordInput
            }
        })).toEqual({
            ...initialState,
            resetPasswordPage: { ...initialState.resetPasswordPage, password: expectedData.passwordInput }
        });

        expect(reducer(initialState, {
            type: CHANGE_INPUT_VALUE,
            payload: {
                pageName: resetPasswordPage,
                inputName: codeInput,
                value: expectedData.codeInput
            }
        })).toEqual({
            ...initialState,
            resetPasswordPage: { ...initialState.resetPasswordPage, code: expectedData.codeInput }
        });
    });

    test("CLEAR_RESET_PASSWORD_VALUE", () => {
        expect(reducer({ ...initialState, resetPasswordPage: { password: "password", code: "code" } }, {
            type: CLEAR_RESET_PASSWORD_VALUE
        })).toEqual(initialState);
    });

    test("CLEAR_INPUT_VALUE", () => {
        expect(reducer({
            ...initialState,
            registrationPage: { email: "email", name: "name", password: "password" },
            loginPage: { email: "email", password: "password" },
            resetPasswordPage: { password: "password", code: "code" },
            forgotPasswordPage: {email: "email"}
        }, {
            type: CLEAR_INPUT_VALUE
        })).toEqual(initialState);
    });
});