import {store} from "../../redux/store";
import {socketMessageConnection} from "./socketMessageConnection";
import {socketNotificationConnection} from "./socketNotificationConnection";

export const isMessagesConnected = () => {
    return store.getState().messages.socketMessageConnected && socketMessageConnection.instance;
};
export const isNotificationsConnected = () => {
    return store.getState().notifications.notificationSocketConnected && socketNotificationConnection.instance;
};