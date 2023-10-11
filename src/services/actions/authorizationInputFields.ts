export const CHANGE_INPUT_VALUE: "CHANGE_INPUT_VALUE" = "CHANGE_INPUT_VALUE";
export const CLEAR_INPUT_VALUE: "CLEAR_INPUT_VALUE" = "CLEAR_INPUT_VALUE";
export const CLEAR_RESET_PASSWORD_VALUE: "CLEAR_RESET_PASSWORD_VALUE" = "CLEAR_RESET_PASSWORD_VALUE";

export interface IChangeInputValuePayload {
    pageName: string;
    inputName: string;
    value: string;
}

export interface IChangeInputValueAction {
    readonly type: typeof CHANGE_INPUT_VALUE;
    readonly payload: IChangeInputValuePayload;
}

export interface IClearInputValueAction {
    readonly type: typeof CLEAR_INPUT_VALUE;
}

export interface IClearResetPasswordValueAction {
    readonly type: typeof CLEAR_RESET_PASSWORD_VALUE;
}

export const changeInputValue = (params: IChangeInputValuePayload): IChangeInputValueAction => {
    return {
        type: CHANGE_INPUT_VALUE,
        payload: params
    }
}

export const clearInputValue = (): IClearInputValueAction => {
    return {
        type: CLEAR_INPUT_VALUE
    }
}

export const clearResetPasswordValue = (): IClearResetPasswordValueAction => {
    return {
        type: CLEAR_RESET_PASSWORD_VALUE
    }
}

export type TAuthorizationInputFieldsActions =
    IChangeInputValueAction
    | IClearInputValueAction
    | IClearResetPasswordValueAction;