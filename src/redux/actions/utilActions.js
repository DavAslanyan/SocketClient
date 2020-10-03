import {UTIL_CONSTS} from "../constants";

export const toggleNotificationRow = (data) => {
    return dispatch => {
        dispatch({
            type: UTIL_CONSTS.TOGGLE_NOTIFICATION_ROW,
            payload: data
        })
    }
};

export const SetMetaData = (data) => {
    return dispatch => {
        dispatch({
            type: UTIL_CONSTS.SET_META_DATA,
            payload: data
        })
    }
};
export const ClearMetaData = () => {
    return dispatch => {
        dispatch({
            type: UTIL_CONSTS.CLEAR_META_DATA,
        })
    }
};
