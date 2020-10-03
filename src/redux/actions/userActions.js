import {USER_CONSTS, UTIL_CONSTS} from "../constants";
import {request, _urlUsers, _urlSubscribe} from "../api";
import {getUserWithSubscriptionState} from "../../utils/getUserWithSubscriptionState";

let URLS = {
    addUser: _urlUsers,
    resendActivation: `${_urlUsers}/resend-activation`,
    activateUser: `${_urlUsers}/activation`,
    forgotPassword: `${_urlUsers}/forgot-password`,
    resetPassword: `${_urlUsers}/reset-password`,
    getCurrentUser: `${_urlUsers}/current`,
    updateCurrentUser: `${_urlUsers}/current`,
    updateCurrentUserPassword: `${_urlUsers}/current/password`,
    searchUser: `${_urlUsers}/search`,
    getUserViaId: _urlUsers,
    userSubscriptions: `${_urlSubscribe}`,
};


export const AddUser = userData => {
    const requestData = {
        url: _urlUsers,
        method: "POST",
        data: userData,
    };

    return dispatch => {
        dispatch({
            type: UTIL_CONSTS.START_LOADING
        });
        return request(requestData).finally(() => {
            dispatch({
                type: UTIL_CONSTS.END_LOADING
            });
        })
    };
};

export const ActivateUser = activationData => {
    const requestData = {
        url: URLS.activateUser,
        method: "POST",
        data: activationData,
    };

    return async dispatch => {
        dispatch({
            type: UTIL_CONSTS.START_LOADING
        });
        return await request(requestData).finally(() => {
            dispatch({
                type: UTIL_CONSTS.END_LOADING
            });
        })
    };
};


export const ResendActivation = username => {
    const requestData = {
        url: URLS.resendActivation,
        method: "POST",
        data: {
            "username": username
        },
    };
    return request(requestData);
};


export const GetCurrentUser = () => {
    const requestData = {
        url: URLS.getCurrentUser,
        method: "Get",
        token: true,
    };

    return dispatch => {
        return request(requestData)
            .then(async (res) => {
                const user = res && res.data;
                if (user) {
                    await dispatch({
                        type: USER_CONSTS.GET_CURRENT_USER,
                        payload: getUserWithSubscriptionState(user)
                    });
                }
            }).catch(() => {
            })
    }
};


export const GetUserSubscriptions = ({
                                         offset = 0,
                                         limit = 20,
                                         reset = true,
                                     } = {}) => {
    const requestData = {
        url: `${URLS.userSubscriptions}?offset=${offset}&limit=${limit}`,
        method: "GET",
        token: true,
    };

    return dispatch => {
        return request(requestData).then((res) => {
            const data = res && res.data;
            data && dispatch({
                type: USER_CONSTS.GET_SUBSCRIPTIONS,
                payload: {
                    data,
                    reset,
                    hasMore: data?.length === limit
                }
            });
            dispatch({type: UTIL_CONSTS.END_LOADING});
        })
    }
};


export const UpdateCurrentUser = userData => {
    const requestData = {
        url: URLS.updateCurrentUser,
        method: "PATCH",
        token: true,
        data: userData
    };

    return dispatch => {
        dispatch({
            type: UTIL_CONSTS.START_LOADING
        });
        return request(requestData)
            .then(async (res) => {
                const data = res && res.data;
                data && await dispatch({
                    type: USER_CONSTS.UPDATE_CURRENT_USER,
                    payload: data
                });
            }).finally(() => {
                dispatch({
                    type: UTIL_CONSTS.END_LOADING
                });
            })
    }
};

export const SearchUser = searchData => {
    let requestUrl = URLS.searchUser;

    Object.keys(searchData).forEach((data, index) => {
        requestUrl += `${index > 0 ? "&" : "?"}${[data]}=${searchData[data]}`
    });

    const requestData = {
        url: requestUrl,
        token: true,
    };

    return dispatch => {
        dispatch({
            type: UTIL_CONSTS.START_LOADING
        });
        return request(requestData)
            .then(({data}) => {
                dispatch({
                    type: USER_CONSTS.SEARCH_USERS,
                    payload: data
                })
            }).finally(() => {
                dispatch({
                    type: UTIL_CONSTS.END_LOADING
                });
            })
    }
};

export const GetUserViaId = id => {
    const requestData = {
        url: `${URLS.getUserViaId}/${id}`,
        token: true,
    };

    return dispatch => {
        return request(requestData)
            .then(({data}) => {
                dispatch({
                    type: USER_CONSTS.GET_SINGLE_USER,
                    payload: data
                })
            })
    };
};


export const ForgotUserPassword = username => {
    const requestData = {
        url: URLS.forgotPassword,
        method: "POST",
        data: {
            "username": username
        },
    };
    return async dispatch => {
        dispatch({
            type: UTIL_CONSTS.START_LOADING
        });
        return await request(requestData).finally(() => {
            dispatch({
                type: UTIL_CONSTS.END_LOADING
            });
        })
    };
};

export const ResetCurrentUserPassword = resetData => {
    const requestData = {
        url: URLS.resetPassword,
        method: "POST",
        data: resetData,
    };

    return async dispatch => {
        dispatch({
            type: UTIL_CONSTS.START_LOADING
        });
        return await request(requestData).finally(() => {
            dispatch({
                type: UTIL_CONSTS.END_LOADING
            });
        })
    };
};


export const UpdateCurrentUserPassword = updatedData => {
    const requestData = {
        url: URLS.updateCurrentUserPassword,
        method: "PUT",
        token: true,
        data: updatedData
    };

    return dispatch => {
        return request(requestData)
    }
};

