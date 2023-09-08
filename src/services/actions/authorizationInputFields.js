export const CHANGE_INPUT_VALUE = "CHANGE_INPUT_VALUE";
export const CLEAR_INPUT_VALUE = "CLEAR_INPUT_VALUE";

export const changeInputValue = (params) => {
    return {
        type: CHANGE_INPUT_VALUE,
        payload: params
    }
}

export const clearInputValue = () => {
    return {
        type: CLEAR_INPUT_VALUE
    }
} 