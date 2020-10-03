import {ACTION_TYPES, NOTIFICATION_TYPES} from "../../socket/constants";
import {AUTH_CONSTS} from "../constants";

export  const initialState = {
    notificationSocketConnected: false,
    notificationsList: [],
    notificationHasMore: false,
    nonOpenedNotificationCount: 0,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.N_AUTHENTICATED:
            return {
                ...state,
                notificationSocketConnected: true
            };
        case ACTION_TYPES.N_UNAUTHORIZED:
            return {
                ...state,
                notificationSocketConnected: false
            };
        case ACTION_TYPES.NEW_NOTIFICATION:
            return {
                ...state,
                notificationsList: [action.payload, ...state.notificationsList]
            };
        case NOTIFICATION_TYPES.GET_NOTIFICATION_LIST:
            return {
                ...state,
                notificationHasMore: action.payload.hasMore,
                notificationsList: action.payload.reset ? action.payload.data :
                    [...action.payload.data, ...state.notificationsList]
            };
        case NOTIFICATION_TYPES.GET_NON_OPENED_NOTIFICATIONS_COUNT:
            return {
                ...state,
                nonOpenedNotificationCount: action.payload
            };
        case NOTIFICATION_TYPES.REMOVE_NOTIFICATION:
            return {
                ...state,
                notificationsList: state.notificationsList.filter(item => item.id !== action.payload)
            };

        case NOTIFICATION_TYPES.REMOVE_ALL_NOTIFICATIONS:
            return {
                ...state,
                notificationsList: [],
                nonOpenedNotificationCount: 0,
            };

        case NOTIFICATION_TYPES.SET_ALL_NOTIFICATIONS_OPENED:
            return {
                ...state,
                notificationsList: state.notificationsList.map(item => {
                    return {
                        ...item,
                        opened: true
                    }
                }),
                nonOpenedNotificationCount: 0
            };
        case AUTH_CONSTS.LOG_OUT:
            return initialState;
        default:
            return state;
    }
}
