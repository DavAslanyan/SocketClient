// import React from "react";
import {_urlNotification, request} from "../api";
import {history} from "../../configs/history";
import {store} from "../store";


//import utils
import {notificationSound} from "../../utils/notificationSound";
import {ACTION_TYPES, NOTIFICATION_TYPES} from "../../socket/constants";
import {UTIL_CONSTS} from "../constants";
import {GetNonOpenedNotificationsCount, SetAllNotificationsAsOpened} from "../../socket/emitters";
import {checkBrowserTabNotVisible} from "../../utils/checkBrowserTabNotVisible";
import {NOTIFICATION_Types} from "../../constants/constTypes";

export const GetNotifications = ({
                                     offset = 0,
                                     limit = 20,
                                     reset = true,
                                 } = {}) => {
    const requestData = {
        url: `${_urlNotification}/?offset=${offset}&limit=${limit}`,
        method: "GET",
        token: true,
        languageFlag: true,
    };

    return dispatch => {
        dispatch({type: UTIL_CONSTS.START_LOADING});
        return request(requestData)
            .then((res) => {
                const data = res && res.data;
                data && dispatch({
                    type: NOTIFICATION_TYPES.GET_NOTIFICATION_LIST,
                    payload: {
                        data,
                        reset,
                        hasMore: data?.length === limit
                    }
                });
                return data;
            }).catch(() => {

            }).finally(() => {
                dispatch({type: UTIL_CONSTS.END_LOADING});
            })
    };
};

export const newNotification = (notification) => {
   // console.log('new Notif', notification);
    if(notification?.type === NOTIFICATION_Types.NEW_MESSAGE){
        return;
    }
    let path = history?.location?.pathname;
    let inNotificationPage = path && path.startsWith('/profile/notifications');
    store.dispatch({
        type: ACTION_TYPES.NEW_NOTIFICATION,
        payload: notification
    });
   // console.log(inNotificationPage, history.location.pathname)

    if (!inNotificationPage || checkBrowserTabNotVisible()) {
        const sound = notificationSound();
        !sound.playing && sound.play(true);
        GetNonOpenedNotificationsCount();
    } else {
        SetAllNotificationsAsOpened();
    }
};


