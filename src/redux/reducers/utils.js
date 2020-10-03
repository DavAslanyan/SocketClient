import {UTIL_CONSTS, AUTH_CONSTS} from "../constants";
import {NOTIFICATION_ROW_MODES} from "../../constants/constTypes";

export const initialState = {
    requestLoading: false,
    notificationRowData: {
        visible: false,
        text: '',
        disappear:false,
        mode: NOTIFICATION_ROW_MODES.INFO,
    },
    metaTags: {
        title: '',
        description: '',
        image:''
    },
};

export default (state = initialState, action) => {
    switch (action.type) {
        case UTIL_CONSTS.START_LOADING:
            return {
                ...state,
                requestLoading: true
            };
        case UTIL_CONSTS.END_LOADING:
            return {
                ...state,
                requestLoading: false
            };
        case UTIL_CONSTS.TOGGLE_NOTIFICATION_ROW:
            const nData = state.notificationRowData;
            return {
                ...state,
                notificationRowData: {
                    visible: action.payload.visible ?? nData.visible,
                    text: action.payload.text ?? nData.text,
                    mode: action.payload.mode ?? nData.mode,
                    disappear: action.payload.disappear ?? false
                },
            };
        case UTIL_CONSTS.SET_META_DATA:
            return {
                ...state,
                metaTags: {
                    title: action.payload.title || "",
                    description: action.payload.description || "",
                    image: action.payload.image || "",
                }
            };
        case UTIL_CONSTS.CLEAR_META_DATA:
            return {
                ...state,
                metaTags: initialState.metaTags
            };
        case AUTH_CONSTS.LOG_OUT:
            return {...initialState};
        default:
            return state;
    }
}
