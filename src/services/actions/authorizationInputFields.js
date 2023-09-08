export const CHANGE_INPUT_VALUE = "CHANGE_INPUT_VALUE";

export const changeInputValue = (params) => {
    return {
        type: CHANGE_INPUT_VALUE,
        payload: params
    }
} 