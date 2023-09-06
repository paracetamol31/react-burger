import { SET_USER_INFO } from "../actions/user";

export const userReducer = ((state = null, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_USER_INFO:
            debugger
            return {
                ...state,
                email: payload.email,
                name: payload.name
            }
        default:
            return state;
    }
});