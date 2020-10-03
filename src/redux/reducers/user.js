import {AUTH_CONSTS, USER_CONSTS} from "../constants";

export const initialState = {
    userViaId: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case USER_CONSTS.GET_SINGLE_USER:
            return {
                ...state,
                userViaId: action.payload
            };
        case USER_CONSTS.CLEAR_SINGLE_USER:
            return {
                ...state,
                userViaId: null
            };

        case AUTH_CONSTS.LOG_OUT:
            return initialState;
        default:
            return state;
    }
}
