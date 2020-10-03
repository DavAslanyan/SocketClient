import React, {Component} from 'react';
import {BrowserRouter} from "react-router-dom";
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from "react-redux";
// import Routes from "../src/routing/lazyRout";
import Routes from "../src/routing";
import {store, persistor} from "./redux/store";

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <BrowserRouter>
                        <Routes/>
                    </BrowserRouter>
                </PersistGate>
            </Provider>
        );
    }
}

export default App;
