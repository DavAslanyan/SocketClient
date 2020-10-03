import {initialState as auth} from "../reducers/auth";
import {initialState as countries} from "../reducers/countries";
import {initialState as general} from "../reducers/general";
import {initialState as messages} from "../reducers/messages";
import {initialState as notifications} from "../reducers/notifications";
import {initialState as product} from "../reducers/product";
import {initialState as utils} from "../reducers/utils";
import {initialState as user} from "../reducers/user";

const reducers = {
    auth,
    countries,
    general,
    messages,
    notifications,
    product,
    utils,
    user,
};

export default state => {
    const sData = {};
    Object.keys(reducers).forEach(selectorKey => {
        Object.keys(reducers[selectorKey]).forEach(key => {
            sData[key] = state[selectorKey][key];
        });
    })
    return sData;
};





