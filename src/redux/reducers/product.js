import {PRODUCT_CONSTS, AUTH_CONSTS} from "../constants";

export const initialState = {
    singleProduct: null,
    searchedProducts: {
        list: [],
        count: 0,
        text: '',
        carMakeIds: null,
        carModelIds: null,
        years: null,
        categoryIds: null,
        filterValueIds: null,
        userId: null,
        hasMore: false,
    },
    userOwnProducts: {
        list: [],
        hasMore: false,
    },
    userFavoriteProducts: {
        list: [],
        hasMore: false,
    },
    userBlockedProducts: {
        list: [],
        hasMore: false,
    },
    userProducts: {
        list: [],
        userId: null,
        hasMore: false,
    },
    homepageProducts: [],
    productSections: null,
    suggestionsList: [],
};

export default (state = initialState, action) => {
    switch (action.type) {

        case PRODUCT_CONSTS.GET_SEARCHED_PRODUCTS:
            const newProductsList = {
                list: action.payload.reset ? action.payload.data : [...state.searchedProducts.list, ...action.payload.data],
                count: action.payload.count,
                text: action.payload.text,
                carMakeIds: action.payload.carMakeIds,
                carModelIds: action.payload.carModelIds,
                years: action.payload.years,
                categoryIds: action.payload.categoryIds,
                filterValueIds: action.payload.filterValueIds,
                userId: action.payload.userId,
                hasMore: action.payload.hasMore
            };
            return {
                ...state,
                searchedProducts: newProductsList
            };

        case PRODUCT_CONSTS.GET_OWN_PRODUCTS:
            return {
                ...state,
                userOwnProducts: {
                    ...state.userOwnProducts,
                    list: action.payload.reset ? action.payload.data : [...state.userOwnProducts.list, ...action.payload.data],
                    hasMore: action.payload.hasMore
                }
            };
        case PRODUCT_CONSTS.GET_FAVORITE_PRODUCTS:
            return {
                ...state,
                userFavoriteProducts: {
                    list: action.payload.reset ? action.payload.data : [...state.userFavoriteProducts.list, ...action.payload.data],
                    hasMore: action.payload.hasMore
                }
            };
        case PRODUCT_CONSTS.GET_BLOCKED_PRODUCTS:
            return {
                ...state,
                userBlockedProducts: {
                    list: action.payload.reset ? action.payload.data : [...state.userBlockedProducts.list, ...action.payload.data],
                    hasMore: action.payload.hasMore
                }
            };
        case PRODUCT_CONSTS.GET_PRODUCT_SECTIONS:
            return {
                ...state,
                productSections: action.payload
            };
        case PRODUCT_CONSTS.GET_HOMEPAGE_SECTIONS:
            return {
                ...state,
                homepageProducts: action.payload
            };
        case PRODUCT_CONSTS.GET_PRODUCTS_BY_USER_ID:
            return {
                ...state,
                userProducts: {
                    list: action.payload.reset ? action.payload.data : [...state.userProducts.list, ...action.payload.data],
                    userId: action.payload.userId,
                    hasMore: action.payload.hasMore
                }
            };
        case PRODUCT_CONSTS.ADD_PRODUCT:
            return {
                ...state,
                userOwnProducts: {
                    ...state.userOwnProducts,
                    list: [action.payload, ...state.userOwnProducts.list],
                    count: state.userOwnProducts.count + 1
                }
            };
        case PRODUCT_CONSTS.UPDATE_PRODUCT:
            return {
                ...state,
                userOwnProducts: {
                    ...state.userOwnProducts,
                    list: state.userOwnProducts.list.map(p => p.id === action.payload.id ? action.payload?.data : p),
                }
            };
        case PRODUCT_CONSTS.DELETE_PRODUCT:
            return {
                ...state,
                userOwnProducts: {
                    ...state.userOwnProducts,
                    list: state.userOwnProducts.list.filter(p => p.id !== action.payload),
                }
            };
        case PRODUCT_CONSTS.GET_SINGLE_PRODUCT:
            return {
                ...state,
                singleProduct: action.payload
            };

        case PRODUCT_CONSTS.TOGGLE_PRODUCT_LIKE:
            return {
                ...state,
                searchedProducts: {
                    ...state.searchedProducts,
                    list: state.searchedProducts.list.map(item => item.id === action.payload.id ?
                        {
                            ...item,
                            isFavorite: action.payload.likeState
                        } : item
                    )
                },
                userOwnProducts: {
                    ...state.userOwnProducts,
                    list: state.userOwnProducts.list.map(item => item.id === action.payload.id ?
                        {
                            ...item,
                            isFavorite: action.payload.likeState
                        } : item
                    )
                },
                userFavoriteProducts: {
                    ...state.userFavoriteProducts,
                    list: state.userFavoriteProducts.list.filter(item => item.id !== action.payload.id),
                },
                userBlockedProducts: {
                    ...state.userBlockedProducts,
                    list: state.userBlockedProducts.list.filter(item => item.id !== action.payload.id),
                },
                userProducts: {
                    ...state.userProducts,
                    list: state.userProducts.list.map(item => item.id === action.payload.id ?
                        {
                            ...item,
                            isFavorite: action.payload.likeState
                        } : item
                    )
                },
                productSections: state.productSections ? {
                    ...state.productSections,
                    products: state.productSections?.products?.map(item => item.id === action.payload.id ?
                        {
                            ...item,
                            isFavorite: action.payload.likeState
                        } : item
                    )
                } : null,
                homepageProducts: state.homepageProducts?.map(item => item.id === action.payload.id ?
                    {
                        ...item,
                        isFavorite: action.payload.likeState
                    } : item
                ),
                singleProduct: state.singleProduct && {
                    ...state.singleProduct, isFavorite: action.payload.likeState
                }
            };

        case PRODUCT_CONSTS.BLOCK_PRODUCT:
            return {
                ...state,
                searchedProducts: {
                    ...state.searchedProducts,
                    list: state.searchedProducts.list.filter(item => item.id !== action.payload),
                },
                userOwnProducts: {
                    ...state.userOwnProducts,
                    list: state.userOwnProducts.list.filter(item => item.id !== action.payload),
                },
                userFavoriteProducts: {
                    ...state.userFavoriteProducts,
                    list: state.userFavoriteProducts.list.filter(item => item.id !== action.payload),
                },
                userProducts: {
                    ...state.userProducts,
                    list: state.userProducts.list.filter(item => item.id !== action.payload),
                },
                homepageProducts: state.homepageProducts.filter(item => item.id !== action.payload),
                productSections: state.productSections ? {
                    ...state.productSections,
                    products: state.productSections.products.filter(item => item.id !== action.payload),
                } : null,
            };

        case PRODUCT_CONSTS.UN_BLOCK_PRODUCT:
            return {
                ...state,
                userBlockedProducts: {
                    ...state.userBlockedProducts,
                    list: state.userBlockedProducts.list.filter(item => item.id !== action.payload),
                },
            };
        case PRODUCT_CONSTS.CLEAR_SINGLE_PRODUCT:
            return {
                ...state,
                singleProduct: null
            };
        case PRODUCT_CONSTS.CLEAR_SEARCHED_PRODUCTS:
            return {
                ...state,
                searchedProducts: {...initialState.searchedProducts}
            };
        case AUTH_CONSTS.LOG_OUT:
            return {
                ...state,
                userOwnProducts: initialState.userOwnProducts,
                userFavoriteProducts: initialState.userFavoriteProducts,
                userBlockedProducts: initialState.userBlockedProducts,
                userProducts: initialState.userProducts,
            };
        default:
            return state;
    }
}
