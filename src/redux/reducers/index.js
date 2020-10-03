import {combineReducers} from "redux";

// import reducers
import auth from "./auth";
import utils from "./utils";
import messages from "./messages";
import notifications from "./notifications";
import user from "./user";
import countries from "./countries";
import product from "./product";
import general from './general';



export default combineReducers({
    auth,
    user,
    messages,
    notifications,
    product,
    countries,
    general,
    utils,
});
