import {AUTH_CONSTS, USER_CONSTS} from "../constants";

export const initialState = {
    loggedInUser: {},
    userSubscriptions:{
        list:[],
        hasMore:false,
    },
    isLoggedIn: true,
    /*im@*/ accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNzVkZDRlMGQ2OTFiYzkwNTBkOTk4NiIsImlhdCI6MTYwMTcyNzMwNywiZXhwIjoxNjAxODEzNzA3fQ.dZYnhO0XNEE201h3wam9_voexoC-L22obWCVZLJTug0',
    // accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNzVkZDI1MGQ2OTFiYzkwNTBkOTk2ZSIsImlhdCI6MTYwMTYyMjcyNywiZXhwIjoxNjAxNzA5MTI3fQ.ELLbQBOYo2yCWKXnU7rqpnHEe47qa7HZYpk7h-CPNVk',
    refreshToken: null,
    userId: '5f634abd4f1e8c1a200f2c22',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTH_CONSTS.LOG_IN:
           // console.log(action.payload);
            return {
                ...state,
                isLoggedIn: true,
                refreshToken: action.payload.refreshToken,
                accessToken: action.payload.accessToken,
                loggedInUser: action.payload.user,
                userId: action.payload.userId
            };
        case AUTH_CONSTS.LOG_OUT:
            return initialState;
        case AUTH_CONSTS.REFRESH_TOKEN:
            return {
                ...state,
                refreshToken: action.payload.refreshToken,
                accessToken: action.payload.accessToken,
            };
        case USER_CONSTS.GET_CURRENT_USER:
            return {
                ...state,
                loggedInUser: action.payload,
            };
        case USER_CONSTS.GET_SUBSCRIPTIONS:
            return {
                ...state,
                userSubscriptions: {
                    ...state.userSubscriptions,
                    list: action.payload.reset ? action.payload.data : [...state.userSubscriptions.list, ...action.payload.data],
                    hasMore: action.payload.hasMore
                }
            };
        case USER_CONSTS.UPDATE_CURRENT_USER:
            return {
                ...state,
                loggedInUser: {
                    ...action.payload,
                    profilePicturePath: {
                        ...action.payload?.profilePicturePath,
                        path: `${action.payload.profilePicturePath?.path}?date=${Date.now()}`
                    }
                }
            };
        default:
            return state;
    }
}
