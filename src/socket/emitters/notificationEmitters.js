import {socketNotificationConnection} from "../api/socketNotificationConnection";
import {NOTIFICATION_TYPES} from "../constants";
import {store} from "../../redux/store";
import {isNotificationsConnected} from "../api/isConnected";
import {toggleNotificationRow} from "../../redux/actions";
import {NOTIFICATION_ROW_MODES} from "../../constants/constTypes";

export const GetNonOpenedNotificationsCount = () => {

    isNotificationsConnected() &&
    socketNotificationConnection.instance.emit(NOTIFICATION_TYPES.GET_NON_OPENED_NOTIFICATIONS_COUNT,
        (error, data) => {
            data && store.dispatch({
                type: NOTIFICATION_TYPES.GET_NON_OPENED_NOTIFICATIONS_COUNT,
                payload: data.count
            });
         //  console.log('non-opened-notif-count...', error, data)
        })
};


export const SetAllNotificationsAsOpened = () => {

    isNotificationsConnected() &&
    socketNotificationConnection.instance.emit(NOTIFICATION_TYPES.SET_ALL_NOTIFICATIONS_OPENED,
        (error, data) => {
          //  console.log('set-notificationes-opened...', error, data.success)
            data && store.dispatch({
                type: NOTIFICATION_TYPES.SET_ALL_NOTIFICATIONS_OPENED
            })
        })
};

export const DeleteAllNotifications = () => {
    isNotificationsConnected() &&
    socketNotificationConnection.instance.emit(NOTIFICATION_TYPES.REMOVE_ALL_NOTIFICATIONS,
        (error, data) => {
            //console.log('Delete-all-notifications...', error, data.success)
        })
};


export const DeleteNotification = (notificationId) => {
    const payload = {notificationId};
   // console.log(notificationId);
    isNotificationsConnected() &&
    socketNotificationConnection.instance.emit(NOTIFICATION_TYPES.REMOVE_NOTIFICATION, payload,
        (error, data) => {

            data && store.dispatch({
                type: NOTIFICATION_TYPES.REMOVE_NOTIFICATION,
                payload: notificationId
            });
            toggleNotificationRow({
                visible: true,
                text: 'Notification Successfully deleted!',
                disappear: 2000,
                mode: NOTIFICATION_ROW_MODES.SUCCESS
            })(store.dispatch)
          //  console.log('Delete-notification...', error, data)
        })
};
