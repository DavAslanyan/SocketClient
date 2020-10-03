import io from "socket.io-client";
import {store} from "../../redux/store";
import {ACTION_TYPES} from "../constants";
import {_urlSocketMessage} from "../../redux/api";


import {newMessage} from "../../redux/actions";
import {GetNonOpenedRoomsCount} from "../emitters";

export const socketMessageConnection = {
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
        console.log("start connect");
        if (store.getState().auth.accessToken) {
            // io.set('close timeout', 60 * 60 * 24); // 24h time out
            this._instance = io.connect("http://localhost:3030" || _urlSocketMessage,{
                'reconnectionDelay': 5000,
            });
            this._instance.on('connect', () => {
              console.log("msg connected");
                let token = store.getState().auth.accessToken;
                this._instance.emit(ACTION_TYPES.AUTHENTICATION, {
                    'x-access-token': token
                });
            });

            this._instance.on(ACTION_TYPES.AUTHENTICATED, () => {
                console.log('M_AUTHENTICATED');
                store.dispatch({
                    type: ACTION_TYPES.M_AUTHENTICATED
                });
                GetNonOpenedRoomsCount();
            });
            this._instance.on(ACTION_TYPES.UNAUTHORIZED, (error) => {
                // handle the error
                console.log("M_UNAUTHORIZED");
                console.log(`Authentication error-: ${error.message}`);

                store.dispatch({
                    type: ACTION_TYPES.M_UNAUTHORIZED
                })
            });

            this._instance.on(ACTION_TYPES.NEW_ROOM, (data) => {
                console.log('room...', data); // room
                // store.dispatch({
                //     type: ACTION_TYPES.NEW_ROOM,
                //     payload: data
                // })
            });
            this._instance.on(ACTION_TYPES.NEW_MESSAGE, (data) => {
                console.log('message...', data);
                if (data) {
                    newMessage(data);
                }
            });

            this._instance.on(ACTION_TYPES.START_TYPING, (data) => {
                console.log('USER_START_TYPING...', data);
            });
            this._instance.on(ACTION_TYPES.STOP_TYPING, (data) => {
                console.log('USER_STOP_TYPING...', data);
            });

            this._instance.on('disconnect', (reason) => {
                console.log(reason);

                if (reason === 'io server disconnect') {
                    let token = store.getState().auth.accessToken;
                    token && this._instance.connect();
                }
                // else the socket will automatically try to reconnect
            });

            this._instance.on('reconnect', (attemptNumber) => {
               console.log('socket reconnected', attemptNumber);
            });
        }
    }
};
