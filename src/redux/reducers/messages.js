import {ACTION_TYPES, MESSAGE_TYPES} from "../../socket/constants";
import {AUTH_CONSTS, MESSAGE_CONSTS} from "../constants";

export const initialState = {
    socketMessageConnected: false,
    nonOpenedRoomCount: 0,
    roomList: [],
    roomListHasMore: false,
    activeRoom: {
        msgList: [],
        hasMore: false,
    },
    tempMsgs: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.M_AUTHENTICATED:
            return {
                ...state,
                socketMessageConnected: true
            };
        case ACTION_TYPES.M_UNAUTHORIZED:
            return {
                ...state,
                socketMessageConnected: false
            };
        case  MESSAGE_CONSTS.GET_ROOMS:
            return {
                ...state,
                roomList: action.payload.reset ? action.payload.data
                    : this.state.roomList.concat(action.payload.data),
                roomListHasMore: action.payload.hasMore
            };
        case MESSAGE_CONSTS.GET_MESSAGES_BY_ROOM_ID:
            return {
                ...state,
                activeRoom: action.payload.reset ?
                    {
                        msgList: action.payload.data,
                        hasMore: action.payload.hasMore
                    }
                    :
                    {
                        msgList: [...state.activeRoom.msgList, ...action.payload.data],
                        hasMore: action.payload.hasMore,
                    },
                roomList: state.roomList && state.roomList.map(room =>
                    room.id !== action.payload.roomId ? room : {
                        ...room,
                        unSeenCount: 0
                    }
                )
            };
        case MESSAGE_TYPES.ADD_MESSAGE:
        case ACTION_TYPES.NEW_MESSAGE:

            let changedRoom = state.roomList && state.roomList.find(room => room.id === action.payload.roomId);
            changedRoom = {
                ...changedRoom,
                lastMessage: {
                    ...action.payload.message,
                    writer: action.payload.message.writer
                },
                unSeenCount: action.inCurrentRoom ? changedRoom.unSeenCount : changedRoom.unSeenCount + 1
            };

            return {
                ...state,
                activeRoom: action.inCurrentRoom ? {
                        ...state.activeRoom,
                        msgList: [action.payload.message, ...state.activeRoom.msgList],
                    } :
                    state.activeRoom,
                roomList: [changedRoom, ...state.roomList.filter(room => room.id !== action.payload.roomId)],
            };
        case MESSAGE_CONSTS.GET_ROOM_BY_USER_ID:
            return {
                ...state,
                roomList: state.roomList.find(room => room.id === action.payload.id) ?
                    state.roomList : [action.payload, ...state.roomList]

            };
        case MESSAGE_CONSTS.BLOCK_ROOM:
            return {
                ...state,
                roomList: state.roomList.map(room => room.id === action.payload.roomId
                    ? {
                        ...room,
                        blockedBy: [...room?.blockedBy, action.payload?.userId]
                    } : room)

            };
        case MESSAGE_CONSTS.UNBLOCK_ROOM:
            return {
                ...state,
                roomList: state.roomList.map(room => room.id === action.payload.roomId
                    ? {
                        ...room,
                        blockedBy: room?.blockedBy?.filter(userId => userId !== action.payload.userId)
                    } : room)

            };
        case ACTION_TYPES.SAVE_TEMP_MSG:
            return {
                ...state,
                tempMsgs: {
                    ...state.tempMsgs,
                    [action.payload.roomId]: action.payload.message
                }
            };
        case MESSAGE_CONSTS.DELETE_ROOM:
            return {
                ...state,
                roomList: state.roomList && state.roomList.filter(room => room.id !== action.payload),
                activeRoom: initialState.activeRoom
            };
        case MESSAGE_TYPES.GET_NON_OPEN_ROOMS_COUNT:
            return {
                ...state,
                nonOpenedRoomCount: action.payload
            };
        case MESSAGE_TYPES.SET_ALL_ROOMS_OPENED:
            return {
                ...state,
                nonOpenedRoomCount: 0
            };
        case MESSAGE_CONSTS.CLEAR_ACTIVE_ROOM_LIST:
            return {
                ...state,
                activeRoom: initialState.activeRoom
            };
        case AUTH_CONSTS.LOG_OUT:
            return initialState;
        default:
            return state;
    }
}
