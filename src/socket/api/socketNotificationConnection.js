import io from "socket.io-client";
import {store} from "../../redux/store";
import {ACTION_TYPES} from "../constants";
import {_urlSocketNotification} from "../../redux/api";
import {
    GetNonOpenedNotificationsCount,
} from "../emitters";
import {newNotification} from "../../redux/actions";

export const socketNotificationConnection = {
    _instance: null,
    get instance() {
        let {accessToken} = store.getState().auth;
        // console.log(this._instance , accessToken);
        if (!this._instance && accessToken) {
            this.connectToSocket();
        }
        return this._instance;
    },
    set instance(instance) {
        this._instance = instance;
    },
    connectToSocket() {
        //console.log("start connect");

        if (store.getState().auth.accessToken) {
            this._instance = io.connect(_urlSocketNotification, {
                'reconnectionDelay': 5000,
            });
            this._instance.on('connect', () => {
            //    console.log("notif connected");
                let token = store.getState().auth.accessToken;
                this._instance.emit(ACTION_TYPES.AUTHENTICATION, {authorization: `Bearer ${token}`});
            });

            this._instance.on(ACTION_TYPES.AUTHENTICATED, async () => {
            //    console.log('N_AUTHENTICATED');
                await store.dispatch({
                    type: ACTION_TYPES.N_AUTHENTICATED
                });
                GetNonOpenedNotificationsCount();
            });

            this._instance.on(ACTION_TYPES.UNAUTHORIZED, (error) => {
                // handle the error
               // console.log("N_UNAUTHORIZED");
                // console.log(`Authentication error: ${error.message}`);

                store.dispatch({
                    type: ACTION_TYPES.N_UNAUTHORIZED
                })
            });

            this._instance.on(ACTION_TYPES.NEW_NOTIFICATION, (data) => {
                //  console.log('notification...', data);
                newNotification(data);
            });

            this._instance.on('disconnect', (reason) => {
                // console.log(reason);

                if (reason === 'io server disconnect') {
                    let token = store.getState().auth.accessToken;
                    token && this._instance.connect();
                }
                // else the socket will automatically try to reconnect
            });
            this._instance.on('reconnect', (attemptNumber) => {
                //console.log('socket reconnected', attemptNumber);
            });
        }
    }

};
