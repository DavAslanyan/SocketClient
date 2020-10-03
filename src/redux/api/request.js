import axios from "axios";
import {store} from "../store";
import {history} from "../../configs/history";
import {AUTH_CONSTS, UTIL_CONSTS} from "../constants";
import {RefreshToken} from "../actions";

export const request = ({url, method = "GET", data = null, token = false, customHeaders = null, languageFlag = false, newToken = null}) => {
    const storeAccessToken = store.getState().auth.accessToken;
    const accessToken =  newToken || storeAccessToken;
    let headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
    };
    customHeaders && (headers={...headers,...customHeaders});
    token && accessToken && (headers["x-access-token"] = accessToken);

    const requestData = {
        url: url,
        method: method,
        headers: headers,
    };

    data && (requestData.data = data);

    return axios.request(requestData)
};

// log user out when token expires

axios.interceptors.response.use(response => response, error => {
        const originalRequest = error.config;

        if (originalRequest.url.slice(-13) === "refresh-token") {
            // if refresh token has been expired
        } else if (error.response && error.response.status === 401) {
            //console.log(originalRequest);
            return RefreshToken().then((accessToken) => {
               // console.log('refresh-success', accessToken);
                if (originalRequest.url.includes("authenticate"))
                    return;
                originalRequest.headers['authorization'] = 'Bearer ' + accessToken;
                return axios(originalRequest);
            }).catch(() => {
               // console.log('refresh-fulfilled');
                // update token fulfilled
                store.dispatch({
                    type: AUTH_CONSTS.LOG_OUT
                });
                store.dispatch({
                    type: UTIL_CONSTS.END_LOADING
                });
                history.push("/");
                return Promise.reject(error);
            });
        } else {
            // interceptors exit
            store.dispatch({
                type: UTIL_CONSTS.END_LOADING
            });
        }
        return Promise.reject(error);
    }
);
