import {COUNTRIES_CONSTS} from "../constants";
import {request} from "../api";
import {_urlCountry} from "../api/urls";


export const GetCountries = () => {
    const requestData = {
        url: _urlCountry,
        method: "GET",
    };

    return dispatch => {
        return request(requestData)
            .then((res) => {
                const data = res && res.data;
                data && dispatch({
                    type: COUNTRIES_CONSTS.GET_COUNTRIES,
                    payload: data
                });
                return data;
            }).catch(() => {

            })
    };
};

export const GetCities = ({
                              countryId,
                              reset=true,
                              offset = 0,
                              limit = 20,
                              text = ''
}={}) => {

    const requestData = {
        url: `${_urlCountry}/${countryId}/cities?offset=${offset}&limit=${limit}`,
        method: "Get",
    };
    text && (requestData.url += '&text=' + text);

    return dispatch => {
        return request(requestData)
            .then(async ({data}) => {
                await dispatch({
                    type: COUNTRIES_CONSTS.GET_CITIES,
                    payload: {
                        data,
                        reset,
                        text,
                        hasMore: data.length === limit
                    }
                })
            }).catch(() => {

            })
    };
};

export const ClearCities = () => {
    return dispatch => {
        dispatch({
            type: COUNTRIES_CONSTS.CLEAR_CITIES
        })
    }
};
