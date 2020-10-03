import {PRODUCT_CONSTS, UTIL_CONSTS} from "../constants";
import {_urlProductSections, request} from "../api";
import {_urlProduct} from "../api/urls";

export const GetSearchedProducts = ({
                                        text = '',
                                        offset = 0,
                                        limit = 20,
                                        reset = true,
                                        userId = null,
                                        years = null,
                                        categoryIds = null,
                                        filterValueIds = null,
                                        carMakeIds = null,
                                        carModelIds = null,
                                    } = {}) => {

    const requestData = {
        url: `${_urlProduct}/news-feed?offset=${offset}&limit=${limit}`,
        method: "GET",
        token: true,
        languageFlag: true,
    };
    text && (requestData.url += `&text=${text}`);
    userId && (requestData.url += `&userId=${userId}`);
    years && (requestData.url += `&years=${years}`);
    categoryIds?.length && (requestData.url += `&categoryIds=${categoryIds}`);
    filterValueIds?.length && (requestData.url += `&filterValueIds=${filterValueIds.join(',')}`);
    carMakeIds && (requestData.url += `&carMakeIds=${carMakeIds}`);
    carModelIds && (requestData.url += `&carModelIds=${carModelIds}`);

    return dispatch => {
        dispatch({type: UTIL_CONSTS.START_LOADING});
        return request(requestData)
            .then((res) => {
                const data = res && res.data;
                data && dispatch({
                    type: PRODUCT_CONSTS.GET_SEARCHED_PRODUCTS,
                    payload: {
                        data: data?.products,
                        count: data?.count,
                        reset,
                        text,
                        carMakeIds,
                        carModelIds,
                        years,
                        categoryIds,
                        filterValueIds,
                        userId,
                        hasMore: data?.products?.length === limit
                    }
                });
                dispatch({type: UTIL_CONSTS.END_LOADING});
            })
    };
};

export const GetFavoriteProducts = ({offset = 0, limit = 10, reset = true} = {}) => {
    const requestData = {
        url: `${_urlProduct}/favorites?offset=${offset}&limit=${limit}`,
        method: "GET",
        token: true,
        languageFlag: true,
    };
    return dispatch => {
        dispatch({type: UTIL_CONSTS.START_LOADING});
        return request(requestData)
            .then((res) => {
                const data = res && res.data;
                data && dispatch({
                    type: PRODUCT_CONSTS.GET_FAVORITE_PRODUCTS,
                    payload: {
                        data: data?.products,
                        reset,
                        hasMore: data?.products?.length === limit
                    }
                })
            }).finally(() => dispatch({type: UTIL_CONSTS.END_LOADING}))
    };
};

export const GetBlockedProducts = ({offset = 0, limit = 10, reset = true} = {}) => {
    const requestData = {
        url: `${_urlProduct}/blocked?offset=${offset}&limit=${limit}`,
        method: "GET",
        token: true,
        languageFlag: true,
    };
    return dispatch => {
        dispatch({type: UTIL_CONSTS.START_LOADING});
        return request(requestData)
            .then((res) => {
                const data = res && res.data;
                data && dispatch({
                    type: PRODUCT_CONSTS.GET_BLOCKED_PRODUCTS,
                    payload: {
                        data: data?.products,
                        reset,
                        hasMore: data?.products?.length === limit
                    }
                })
            }).finally(() => dispatch({type: UTIL_CONSTS.END_LOADING}))
    };
};

export const GetOwnProducts = ({
                                   offset = 0,
                                   limit = 10,
                                   reset = true,
                                   categoryIds = null,
                                   isHidden = null,
                                   price = null,
                                   updatedAt = null,
                               } = {}) => {
    const requestData = {
        url: `${_urlProduct}/?offset=${offset}&limit=${limit}`,
        method: "GET",
        token: true,
        languageFlag: true,
    };
    categoryIds && (requestData.url += `&categoryIds=${categoryIds}`);
    isHidden !== null && (requestData.url += `&isHidden=${isHidden}`);
    if (price || updatedAt) {
        requestData.url += `&sort=${price ? (updatedAt ? price + ',' : price) : ''}${updatedAt ? updatedAt : ''}`;
    }
    return dispatch => {
        dispatch({type: UTIL_CONSTS.START_LOADING});
        return request(requestData)
            .then((res) => {
              //  console.log(requestData, "requestData");
                const data = res && res.data;
                data && dispatch({
                    type: PRODUCT_CONSTS.GET_OWN_PRODUCTS,
                    payload: {
                        data,
                        reset,
                        hasMore: data?.length === limit
                    }
                })
                return data?.length

            }).finally(() => dispatch({type: UTIL_CONSTS.END_LOADING}))
    };
};

export const GetProductSections = () => {
    const requestData = {
        url: `${_urlProductSections}`,
        method: "GET",
        token: true,
        languageFlag: true,
    };
    return dispatch => {
        return request(requestData)
            .then((res) => {
                const data = res && res.data;
                data && dispatch({
                    type: PRODUCT_CONSTS.GET_PRODUCT_SECTIONS,
                    payload: data
                })
            })
    };
};
export const GetHomePageProducts = () => {
    const requestData = {
        url: `${_urlProduct}/news-feed?offset=0&limit=${20}`,
        method: "GET",
        token: true,
        languageFlag: true,
    };
    return dispatch => {
        return request(requestData)
            .then((res) => {
                const data = res && res.data;
                data && dispatch({
                    type: PRODUCT_CONSTS.GET_HOMEPAGE_SECTIONS,
                    payload: data?.products
                })
            })
    };
};

export const GetProductById = (id) => {
    const requestData = {
        url: `${_urlProduct}/${id}`,
        method: "GET",
        token: true,
        languageFlag: true,
    };
    return dispatch => {
        return request(requestData)
            .then((res) => {
                const data = res && res.data;
                data && dispatch({
                    type: PRODUCT_CONSTS.GET_SINGLE_PRODUCT,
                    payload: res.data,
                })
            })
    };
};

export const GetProductsByUserId = (userId, {
    offset = 0,
    limit = 10,
    reset = true,
} = {}) => {
    const requestData = {
        url: `${_urlProduct}/news-feed?userId=${userId}&offset=${offset}&limit=${limit}`,
        method: "GET",
        token: true,
        languageFlag: true,
    };
    return dispatch => {
        return request(requestData)
            .then((res) => {
                const data = res && res.data;
                data && dispatch({
                    type: PRODUCT_CONSTS.GET_PRODUCTS_BY_USER_ID,
                    payload: {
                        data: data?.products,
                        userId,
                        reset,
                        hasMore: data?.products?.length === limit
                    }
                })
            })
    };
};

export const GetProductSuggestions = (text) => {
    const requestData = {
        url: `${_urlProduct}/search-suggestions?text=${text}`,
        method: "GET",
        token: true,
        languageFlag: true,
    };
    return request(requestData).then((res) => {
        return res?.data;
    })

};

export const AddProduct = (data) => {
    const requestData = {
        url: _urlProduct,
        method: "POST",
        token: true,
        languageFlag: true,
        customHeaders: {
            "Content-Type": "multipart/form-data",
        },
        data,
    };

    return dispatch => {
        dispatch({type: UTIL_CONSTS.START_LOADING})
        return request(requestData)
            .then(({data}) => {
               // console.log(data);
                dispatch({
                    type: PRODUCT_CONSTS.ADD_PRODUCT,
                    payload: data
                })
            }).finally(() => {
                dispatch({type: UTIL_CONSTS.END_LOADING})
            })
    };
};

export const UpdateProduct = (id, data) => {
    const requestData = {
        url: `${_urlProduct}/${id}`,
        method: "PATCH",
        token: true,
        languageFlag: true,
        data,
    };

    return dispatch => {
        dispatch({type: UTIL_CONSTS.START_LOADING})
        return request(requestData)
            .then((res) => {
                const data = res && res.data;
              //  console.log(data)
                data && dispatch({
                    type: PRODUCT_CONSTS.UPDATE_PRODUCT,
                    payload: {data, id}
                })
            }).finally(() => {
                dispatch({type: UTIL_CONSTS.END_LOADING})
            })
    };
};


export const LikeProduct = (id) => {
    const requestData = {
        url: `${_urlProduct}/${id}/add-to-favorites`,
        method: "POST",
        token: true,
    };

    return (dispatch) => {
        return request(requestData).then(async () => {
            const likeState = true;
            await dispatch({
                type: PRODUCT_CONSTS.TOGGLE_PRODUCT_LIKE,
                payload: {id, likeState}
            });
        })
    };
};

export const UnLikeProduct = (id) => {
    const requestData = {
        url: `${_urlProduct}/${id}/remove-from-favorites`,
        method: "POST",
        token: true,
    };
    return (dispatch,) => {
        return request(requestData).then(async () => {
            const likeState = false;
            await dispatch({
                type: PRODUCT_CONSTS.TOGGLE_PRODUCT_LIKE,
                payload: {id, likeState}
            });
        })
    };
};

export const BlockProduct = (id) => {
    const requestData = {
        url: `${_urlProduct}/${id}/block`,
        method: "POST",
        token: true,
    };
    return (dispatch,) => {
        return request(requestData).then(async () => {
            await dispatch({
                type: PRODUCT_CONSTS.BLOCK_PRODUCT,
                payload: id
            });
        })
    };
};

export const UnBlockProduct = (id) => {
    const requestData = {
        url: `${_urlProduct}/${id}/unblock`,
        method: "POST",
        token: true,
    };
    return (dispatch,) => {
        return request(requestData).then(async () => {
            await dispatch({
                type: PRODUCT_CONSTS.UN_BLOCK_PRODUCT,
                payload: id
            });
        })
    };
};

export const DeleteProduct = (id) => {
    const requestData = {
        url: `${_urlProduct}/${id}`,
        method: "DELETE",
        token: true,
    };

    return dispatch => {
        return request(requestData)
            .then(({data}) => {
                //console.log(data);
                dispatch({
                    type: PRODUCT_CONSTS.DELETE_PRODUCT,
                    payload: id
                })
            })
    };
};

export const ClearSearchedProducts = () => {
    return async dispatch => {
        await dispatch({
            type: PRODUCT_CONSTS.CLEAR_SEARCHED_PRODUCTS
        })
    };
};

export const ClearSingleProduct = () => {
    return async dispatch => {
        await dispatch({
            type: PRODUCT_CONSTS.CLEAR_SINGLE_PRODUCT
        })
    };
};

