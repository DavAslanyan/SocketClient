import {COUNTRIES_CONSTS, AUTH_CONSTS} from "../constants";

export const initialState = {
    countriesList: [],
    citiesList: {
        list: [],
        text: '',
        hasMore: true
    },
};

export default (state = initialState, action) => {
    switch (action.type) {
        case COUNTRIES_CONSTS.GET_COUNTRIES:
            return {
                ...state,
                countriesList: action.payload
            };
        case COUNTRIES_CONSTS.GET_CITIES:
           // console.log("GET_CITIES",action.payload.data)
            const newList = {
                list: action.payload.reset ? action.payload.data : [...state.citiesList.list, ...action.payload.data],
                text: action.payload.text,
                hasMore: action.payload.hasMore
            };

            return {
                ...state,
                citiesList: newList
            };
        case AUTH_CONSTS.LOG_OUT:
        case COUNTRIES_CONSTS.CLEAR_CITIES:
            return {
                ...state,
                citiesList:initialState.citiesList,
            };
        default:
            return state;
    }
}
