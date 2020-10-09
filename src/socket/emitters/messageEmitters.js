import { socketMessageConnection } from "../api/socketMessageConnection";
import { isMessagesConnected } from "../api/isConnected";
import { MESSAGE_TYPES } from "../constants";
import { store } from "../../redux/store";
import { history } from "../../configs/history";

export const GetNonOpenedRoomsCount = () => {

    isMessagesConnected() && socketMessageConnection.instance.emit(MESSAGE_TYPES.GET_NON_OPEN_ROOMS_COUNT, (err, data) => {
        data && store.dispatch({
            type: MESSAGE_TYPES.GET_NON_OPEN_ROOMS_COUNT,
            payload: data.count
        });
        console.log('count...', data.count);
    })
};

export const SetAllRoomsAsOpened = () => {

    isMessagesConnected() && socketMessageConnection.instance.emit(MESSAGE_TYPES.SET_ALL_ROOMS_OPENED, (err, data) => {
        data && store.dispatch({
            type: MESSAGE_TYPES.SET_ALL_ROOMS_OPENED,
        });
        console.log('SetAllRoomsAsOpened...', data);
    })
};

export const DeleteRoomById = (roomId) => {
    const payload = {roomId};
    isMessagesConnected() && socketMessageConnection.instance.emit(MESSAGE_TYPES.DELETE_ROOM_BY_ID, payload,
        async (error, result) => {
            console.log('delete-room-by-user-id...', error, result)
            if (result) {
                await store.dispatch({
                    type: MESSAGE_TYPES.DELETE_ROOM_BY_ID,
                    payload: roomId
                });
                history.push(`/profile/messages/:0`)
            }
        })
};

export const AddMessage = (roomId, text, filePath = true) => {
    const payload = {
        roomId,
    };
    !!text && (payload.text = text);
    payload.fileIds = ['5f7c4ad1dd910713eceb5af6', '5f7c4ad1dd910713eceb5af5'];
    //!!filePath && (payload.filePaths = ['5f7c4ad1dd910713eceb5af6', '5f7c4ad1dd910713eceb5af5']);
    console.log('payload->', payload);

    isMessagesConnected() && socketMessageConnection.instance.emit(MESSAGE_TYPES.ADD_MESSAGE, payload,
            (error, data) => {
                console.log('add-message...', error, data);
                if ( data ) {
                    store.dispatch({
                        type: MESSAGE_TYPES.ADD_MESSAGE,
                        payload: data,
                        inCurrentRoom: true
                    });
            }
        })
};

export const SetMessageSeen = (roomId, messageId) => {
    const payload = {roomId, messageId};

    isMessagesConnected() && socketMessageConnection.instance.emit(MESSAGE_TYPES.SET_MESSAGE_SEEN, payload,
        (error, data) => {
            console.log('set-message-seen...', error, data)
        })
};

export const StartTyping = (roomId) => {
    // const payload = {roomId};
    // isMessagesConnected() && socketMessageConnection.instance.emit(MESSAGE_TYPES.START_TYPING, payload,
    //     (error, data) => {
    //        // console.log('start-typing...', error, data)
    //     })
};
export const StopTyping = (roomId) => {
    // const payload = {roomId};

    // isMessagesConnected() && socketMessageConnection.instance.emit(MESSAGE_TYPES.STOP_TYPING, payload,
    //     (error, data) => {
    //        // console.log('stop-typing...', error, data)
    //     })
};


