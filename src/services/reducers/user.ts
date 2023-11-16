import {
    SET_USER_INFO,
    USER_INFO_LOADED,
    CLEAR_USER_INFO,
    TUserActions,
    IUserInfo
} from "../actions/user";

export interface IUserState {
    userInfo: IUserInfo | null,
    isUserInfoLoaded: boolean
}

const initialState: IUserState = {
    userInfo: null,
    isUserInfoLoaded: false
}

export const userReducer = ((state = initialState, action: TUserActions): IUserState => {
    switch (action.type) {
        case SET_USER_INFO:
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    email: action.payload.userInfo.email,
                    name: action.payload.userInfo.name
                }
            }
        case USER_INFO_LOADED:
            return {
                ...state,
                isUserInfoLoaded: action.payload.value
            }
        case CLEAR_USER_INFO:
            return {
                ...state,
                ...initialState
            }
        default:
            return state;
    }
});