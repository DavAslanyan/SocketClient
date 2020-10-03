import {GENERAL_CONSTS} from "../constants";
import {StaticTexts} from "../../constants/staticTexts";

export const initialState = {
    categories: [],
    filters: [],
    carMakes: {
        list: [],
        text: ''
    },
    carModels: {
        list: [],
        text: ''
    },
    mainSlider: [],
    contacts: null,
    browserTabVisible: null,
    staticTexts: StaticTexts.en
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GENERAL_CONSTS.GET_STATIC_TEXTS:
            return {
                ...state,
                staticTexts: action.payload?.en || StaticTexts.en
            };
        case GENERAL_CONSTS.TOGGLE_BROWSER_TAB_VISIBILITY:
            return {
                ...state,
                browserTabVisible: action.payload
            };
        case GENERAL_CONSTS.GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            };
        case GENERAL_CONSTS.GET_FILTERS:
            return {
                ...state,
                filters: action.payload
            };

        case GENERAL_CONSTS.GET_CAR_MAKES:
            return {
                ...state,
                carMakes: {
                    list: action.payload.data,
                    text: action.payload.text
                }
            };

        case GENERAL_CONSTS.GET_CAR_MODELS:
            return {
                ...state,
                carModels: {
                    list: action.payload.data,
                    text: action.payload.text
                }
            };

        case GENERAL_CONSTS.CLEAR_CAR_MODELS:
            return {
                ...state,
                carModels: {
                    list: [],
                    text: ''
                }
            };

        case GENERAL_CONSTS.GET_MAIN_SLIDER:
            return {
                ...state,
                mainSlider: action.payload
            };
        case GENERAL_CONSTS.SET_CONTACT:
            return {
                ...state,
                contacts: action.payload
            };

        default:
            return state;
    }
}
