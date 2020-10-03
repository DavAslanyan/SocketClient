import {stringify} from "query-string";
import {_urlOauth, _urlUsers, ClientEncoded, request} from "../api";
import {store} from "../store";
import {history} from "../../configs/history";
import {AUTH_CONSTS, UTIL_CONSTS} from "../constants";
import {socketMessageConnection} from "../../socket/api/socketMessageConnection";
import {socketNotificationConnection} from "../../socket/api/socketNotificationConnection";
import {getUserWithSubscriptionState} from "../../utils/getUserWithSubscriptionState";


export const LoginUser = (loginCreds, redirectTo = '/') => {

    const requestData = {
        url: `${_urlOauth}/token`,
        method: "POST",
        data: stringify(loginCreds),
        customHeaders: {
            "Content-Type": "application/x-www-form-urlencoded",
            "authorization": "Basic " + ClientEncoded,
        }
    };
    return dispatch => {
        dispatch({
            type: UTIL_CONSTS.START_LOADING
        });
        return request(requestData)
            .then((res) => {
                const loginData = res?.data;
                // console.log('loginData', loginData);
                return GetLoggedInUser(loginData?.accessToken).then(async (loggedInUser) => {
                    // console.log('user', data);
                    //   console.log('redirectTo',redirectTo)
                    await dispatch({
                        type: AUTH_CONSTS.LOG_IN,
                        payload: {
                            ...loginData,
                            user: loggedInUser,
                        }
                    });
                    //  console.log('redirectTo',redirectTo)
                    history.push(redirectTo);
                })
            }).finally(() => {
                dispatch({
                    type: UTIL_CONSTS.END_LOADING
                });
            })
    }
};

export const SocialSignIn = (socialToken, socialName, redirectTo = '/') => {
    const requestData = {
        url: `${_urlOauth}/${socialName}`,
        method: "POST",
        data: stringify({"socialToken": socialToken}),
        customHeaders: {
            "Content-Type": "application/x-www-form-urlencoded",
            "authorization": "Basic " + ClientEncoded,
        }
    };

    return dispatch => {
        return request(requestData).then(async (res) => {
            //  console.log(`logged-in user by ${socialName}`, res.data);
            GetLoggedInUser(res.data.accessToken).then(async (loggedInUser) => {
                //  console.log('user', data);
                await dispatch({
                    type: AUTH_CONSTS.LOG_IN,
                    payload: {
                        ...res.data,
                        user: loggedInUser,
                    }
                });
                history.push(redirectTo);
            });

        })
    }
};

export const RefreshToken = () => {

    const refToken = store.getState().auth.refreshToken;
   // console.log('start-refreshing-function');
    const requestData = {
        url: `${_urlOauth}/refresh-token`,
        method: "POST",
        data: stringify({
            grant_type: "refresh_token",
            refresh_token: refToken
        }),
        customHeaders: {
            "Content-Type": "application/x-www-form-urlencoded",
            "authorization": "Basic " + ClientEncoded,
        }
    };
    // console.log(RefreshToken.startRefreshing);
    if (!RefreshToken.startRefreshing) {
        RefreshToken.startRefreshing = true;
        // console.log('start-refreshing-request');
        RefreshToken.promise = request(requestData).then(async (response) => {
            //    console.log(response);
            response && await store.dispatch({
                type: AUTH_CONSTS.REFRESH_TOKEN,
                payload: response.data
            });
            return response && response.data && response.data.accessToken;
        }).finally(() => {
            //   console.log('end-refreshing-request-finally');
            RefreshToken.startRefreshing = false;
        });
    }
    console.log('end-refreshing-function');
    return RefreshToken.promise;
};
RefreshToken.startRefreshing = false;
RefreshToken.promise = null;

export const TokenValidation = () => {
    const AccessToken = store.getState().auth.accessToken;
    const requestData = {
        url: `${_urlOauth}/authenticate`,
        method: "GET",
        customHeaders: {
            "Accept": "application/json",
            "authorization": "Bearer " + AccessToken,
        }
    };
    return dispatch => {
        return request(requestData)
            .then(() => {
                //console.log('token-validation-success');
                return true;
            })
            .catch(() => {
                //console.log('error in auth-validation');
                dispatch({
                    type: AUTH_CONSTS.LOG_OUT
                });
                return false;
            })
    }
};

export const LogOut = () => {
    //console.log("logout");
    if (socketMessageConnection.instance) {
        socketMessageConnection.instance.disconnect();
        socketMessageConnection.instance = null;
    }
    if (socketNotificationConnection.instance) {
        socketNotificationConnection.instance.disconnect();
        socketNotificationConnection.instance = null;
    }
    return async dispatch => {
        await dispatch({
            type: AUTH_CONSTS.LOG_OUT
        });
        history.push('/');
    }
};


export const GetLoggedInUser = async (newToken) => {
    // console.log('newToken', newToken);
    const requestData = {
        url: `${_urlUsers}/current`,
        token: true,
        newToken
    };
    return request(requestData).then((res) => {
        return getUserWithSubscriptionState(res?.data)
    })
};
