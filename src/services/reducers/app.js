import { INIT_START_ROUT } from "../actions/app";

const initialState = {
    isSelectedStartRout: false
}

export const app = ((state = initialState, action) => {
    const { type } = action;
    switch (type) {
        case INIT_START_ROUT: {
            return { ...state, isSelectedStartRout: true }
        }
        default:
            return state;
    }
});