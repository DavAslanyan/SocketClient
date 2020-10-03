import {request, _urlMedia} from "../api";
import {UTIL_CONSTS} from "../constants";

export const UploadFile = (formData, fileType) => {
    const requestData = {
        url: `${_urlMedia}/${fileType}`,
        token: true,
        method: "POST",
        data: formData,
        customHeaders: {
            "Content-Type": "multipart/form-data",
        }
    };

    return dispatch => {
        dispatch({
            type: UTIL_CONSTS.START_LOADING
        });
        return request(requestData)
            .then(res => res?.data)
            .catch(() => null).finally(() => {
                dispatch({
                    type: UTIL_CONSTS.END_LOADING
                });
            });
    }
};

export const AddProductImage = (data) => {
    const requestData = {
        url: `${_urlMedia}/product-image`,
        token: true,
        method: "POST",
        data,
        customHeaders: {
            "Content-Type": "multipart/form-data",
        }
    };
    return request(requestData).then(res => {
        return res?.data;
    }).catch(() => {});
};
export const ChangeProductMainImage = (productId, mediaId) => {
    const requestData = {
        url: `${_urlMedia}/product-image/${productId}/make-main/${mediaId}`,
        token: true,
        method: "PUT",
    };
    return request(requestData).catch(() => {
    });
};

export const DeleteProductImage = (id, deletedImageIds) => {
    const requestData = {
        url: `${_urlMedia}/product-image/${id}?mediaIds=${deletedImageIds.join(',')}`,
        token: true,
        method: "DELETE",
    };
    return request(requestData).catch(() => {
    });
};
