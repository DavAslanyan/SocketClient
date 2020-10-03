import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import Reducer from './reducers';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    "key": 'root',
    storage,
    "whitelist": ['auth', 'countries', 'general']
};

let store;

const persistedReducer = persistReducer(persistConfig, Reducer);

store = createStore(persistedReducer,
    compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : compose)
);

let persistor = persistStore(store);

export {store, persistor};
