import {
    request,
    _urlCategory, _urlFilter, _urlCarMakes,_urlCustomPage,
    _urlContact, _urlSendEmail, _urlSlider,_urlStaticTexts
} from "../api";
import {GENERAL_CONSTS, UTIL_CONSTS} from "../constants";

export const GetStaticTexts = () => {
    const requestData = {
        url: `${_urlStaticTexts}`,
        method: "GET",
    };

    return dispatch => {
        return request(requestData)
            .then((res) => {
                const data = res && res.data;
                data && dispatch({
                    type: GENERAL_CONSTS.GET_STATIC_TEXTS,
                    payload:data
                })
            })
    };
};

export const GetCategories = () => {
    const requestData = {
        url: `${_urlCategory}`,
        method: "GET",
        languageFlag: true,
    };

    return dispatch => {
        return request(requestData)
            .then((res) => {
                const data = res && res.data;
                data && dispatch({
                    type: GENERAL_CONSTS.GET_CATEGORIES,
                    payload:data
                })
            })
    };
};

export const GetFilters = () => {
    const requestData = {
        url: `${_urlFilter}`,
        method: "GET",
        languageFlag: true,
    };

    return dispatch => {
        return request(requestData)
            .then((res) => {
                const data = res && res.data;
                data && dispatch({
                    type: GENERAL_CONSTS.GET_FILTERS,
                    payload: data
                })
            })
    };
};

export const GetCarMakes = (text = '') => {
    const requestData = {
        url: `${_urlCarMakes}`,
        method: "GET",
    };
    text && (requestData.url += `?text=${text.slice(0, 50)}`);
    return dispatch => {
        return request(requestData)
            .then((res) => {
                const data = res && res.data;
                data && dispatch({
                    type: GENERAL_CONSTS.GET_CAR_MAKES,
                    payload: {data, text}
                })
            })
    };
};


export const GetCarModels = (carMakeId, text = '') => {
    const requestData = {
        url: `${_urlCarMakes}/${carMakeId}/models`,
        method: "GET",
    };
    text && (requestData.url += `?text=${text.slice(0, 50)}`);
    return dispatch => {
        return request(requestData)
            .then((res) => {
                const data = res && res.data;
                data && dispatch({
                    type: GENERAL_CONSTS.GET_CAR_MODELS,
                    payload: {data, text}
                })
            })
    };
};


export const ClearCarModels = () => {
    return dispatch => {
        dispatch({
            type: GENERAL_CONSTS.CLEAR_CAR_MODELS,
        })
    };
};


export const GetMainSlider = () => {
    const requestData = {
        url: `${_urlSlider}`,
        method: "GET",
        languageFlag: true,
    };

    return dispatch => {
        return request(requestData)
            .then((res) => {
                const data = res && res.data;
                data && dispatch({
                    type: GENERAL_CONSTS.GET_MAIN_SLIDER,
                    payload: data
                })
            }).catch(() => {

            })
    };
};


export const GetContact = () => {
    const requestData = {
        url: _urlContact,
        method: "GET",
        languageFlag: true,
    };
    return dispatch => {
        return request(requestData)
            .then(res => {
                dispatch({
                    type: GENERAL_CONSTS.SET_CONTACT,
                    payload: res.data
                })
            })
            .catch(() => {

            })
    }
};


export const GetCustomPage = (slug) => {
    const requestData = {
        url: `${_urlCustomPage}/${slug}`,
        method: "GET",
        languageFlag: true,
    };
    return dispatch => {
        return request(requestData)
            .then(res => {
               return res?.data
            })
    }
};

export const SendContactsEmail = (data) => {
    const requestData = {
        url: _urlSendEmail,
        method: "POST",
        data
    };
    return dispatch => {
        dispatch({type:UTIL_CONSTS.START_LOADING})
        return request(requestData).finally(()=>{
            dispatch({type:UTIL_CONSTS.END_LOADING})
        })
    }
};

export const ToggleBrowserTabVisibility = (state) => {
    // console.log('tab visible change', state)
    return dispatch => {
        dispatch({
            type:GENERAL_CONSTS.TOGGLE_BROWSER_TAB_VISIBILITY,
            payload:state
        })

    }
};
