import {ClientEncodedPayPal, request,_urlSubscribe} from "../api";
import {stringify} from "query-string";

export const PayPalVerify = (data) => {
    const requestData = {
        url: `${_urlSubscribe}/paypal/verify`,
        method: "POST",
        token:true,
        data,
    };
    return dispatch => {
        return request(requestData)
    };
};
export const PayPalSuspend = (data) => {
    const requestData = {
        url: `${_urlSubscribe}/paypal/suspend`,
        method: "POST",
        token:true,
        data,
    };
    return dispatch => {
        return request(requestData)
    };
};

export const PayPalActivate = (data) => {
    const requestData = {
        url: `${_urlSubscribe}/paypal/activate`,
        method: "POST",
        token:true,
        data,
    };
    return dispatch => {
        return request(requestData)
    };
};

export const PayPalCancel = (data) => {
    const requestData = {
        url: `${_urlSubscribe}/paypal/cancel`,
        method: "POST",
        token:true,
        data,
    };
    return dispatch => {
        return request(requestData)
    };
};

