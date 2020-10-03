import {ACTION_TYPES} from "../../socket/constants";
import {SetMessageSeen, GetNonOpenedRoomsCount} from "../../socket/emitters";
import {history} from "../../configs/history";
import {store} from "../store";
import {_urlMessage, _urlRoom, request} from "../api";
import {MESSAGE_CONSTS} from "../constants";
import {notificationSound} from "../../utils/notificationSound";
import {checkBrowserTabNotVisible} from "../../utils/checkBrowserTabNotVisible";

//--------------- MESSAGE API CALLS-------------

export const GetMessagesByRoomId = (roomId, {offset = 0, limit = 40, reset = true,} = {}) => {
    const requestData = {
        url: `${_urlMessage}/${roomId}?offset=${offset}&limit=${limit}`,
        method: "GET",
        token: true,
    };

    return dispatch => {
        reset && dispatch({type: MESSAGE_CONSTS.CLEAR_ACTIVE_ROOM_LIST})
        return request(requestData)
            .then(async (res) => {
                const data = (res && Array.isArray(res.data)) ? res.data : [];

                const path = history?.location?.pathname;
                const currentRoomId = path?.slice(path?.lastIndexOf('/') + 1);
                currentRoomId === roomId &&
                await dispatch({
                    type: MESSAGE_CONSTS.GET_MESSAGES_BY_ROOM_ID,
                    payload: {
                        roomId,
                        data,
                        reset,
                        hasMore: data.length === limit
                    }
                });
                console.log('messages [', offset, ', ', limit, ']', data)

            }).catch(() => {

            })
    };
};


export const GetRooms = ({offset = 0, limit = 40, reset = true, text = ''} = {}) => {
    const requestData = {
        url: `${_urlRoom}?offset=${offset}&limit=${limit}`,
        method: "GET",
        token: true,
    };
    text && (requestData.url += `&text=${text}`)
    return dispatch => {
        return request(requestData)
            .then(async (res) => {
                const data = (res && Array.isArray(res.data)) ? res.data : [];
                await dispatch({
                    type: MESSAGE_CONSTS.GET_ROOMS,
                    payload: {
                        data,
                        text,
                        reset,
                        hasMore: data.length === limit
                    }
                });
                console.log('rooms', data)
            }).catch(() => {
            })
    };
};

export const GetRoomByUserId = (userId, redirectToRoom = true) => {
    const requestData = {
        url: `${_urlRoom}/getOrCreateRoom/${userId}`,
        method: "GET",
        token: true,
    };
    return dispatch => {
        return request(requestData)
            .then(async (res) => {
                const data = res?.data;
                await dispatch({
                    type: MESSAGE_CONSTS.GET_ROOM_BY_USER_ID,
                    payload: data
                });
               console.log('room By User Id', data)
                //Օգտագործվում է երբ կա նոր նամակ բայց համապատասխան Room գոյություն չունի
                redirectToRoom && history.push(`/profile/messages/${data.id}`)
            }).catch(() => {
            })
    };
};

export const DeleteRoom = (roomId) => {
    const requestData = {
        url: `${_urlRoom}/${roomId}`,
        method: "DELETE",
        token: true,
    };
    return dispatch => {
        return request(requestData)
            .then((res) => {
                dispatch({
                    type: MESSAGE_CONSTS.DELETE_ROOM,
                    payload: roomId
                });
                history.push(`/profile/messages/:0`)
            }).catch(() => {

            })
    };
};
export const BlockRoom = (roomId, userId) => {
    const requestData = {
        url: `${_urlRoom}/${roomId}/block`,
        method: "PUT",
        token: true,
    };
    return dispatch => {
        return request(requestData)
            .then((res) => {
                dispatch({
                    type: MESSAGE_CONSTS.BLOCK_ROOM,
                    payload: {roomId, userId}
                });
            }).catch(() => {

            })
    };
};

export const UnBlockRoom = (roomId, userId) => {
    const requestData = {
        url: `${_urlRoom}/${roomId}/unblock`,
        method: "PUT",
        token: true,
    };
    return dispatch => {
        return request(requestData)
            .then((res) => {
                dispatch({
                    type: MESSAGE_CONSTS.UNBLOCK_ROOM,
                    payload: {roomId, userId}
                });
            }).catch(() => {

            })
    };
};


export const newMessage = (newMessage) => {
    let path = history?.location?.pathname;
    let inChattingPage = path && path.startsWith('/profile/messages');
    const currentRoomId = inChattingPage && path.slice(path.lastIndexOf('/') + 1);
    const currentUserId = store.getState()?.auth?.userId;

    console.log("newMessage", newMessage);
   // console.log("inChattingPage", inChattingPage);
    if (currentUserId !== newMessage?.writer?.id) {

    if (!inChattingPage || checkBrowserTabNotVisible()) {
        const sound = notificationSound();
      //  console.log("sound.playing", sound.playing);
        !sound.playing && sound.play(true);
        GetNonOpenedRoomsCount()
    }
}
    if (newMessage?.roomId === currentRoomId) {
        store.dispatch({
            type: ACTION_TYPES.NEW_MESSAGE,
            payload: newMessage,
            inCurrentRoom: true
        })
        SetMessageSeen(newMessage?.roomId, newMessage?.message?.id);
    } else {
        const listRooms = store?.getState()?.messages?.roomList;
        if (listRooms && listRooms.find(room => room.id === newMessage.roomId)) {
            store.dispatch({
                type: ACTION_TYPES.NEW_MESSAGE,
                payload: newMessage,
                inCurrentRoom: false
            })
        } else {
            GetRoomByUserId(newMessage.requesterId, false)(store.dispatch);
        }

    }
};

export const saveTempMsg = (roomId, message) => {
    return dispatch => {
        dispatch({
            type: ACTION_TYPES.SAVE_TEMP_MSG,
            payload: {roomId, message}
        })
    }
};

export const clearActiveRoomList = () => {
    return dispatch => {
        dispatch({
            type: MESSAGE_CONSTS.CLEAR_ACTIVE_ROOM_LIST,
        })
    }
};

