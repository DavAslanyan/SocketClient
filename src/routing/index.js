// Import packages
import React, {Component} from "react";
import {Route, Switch, Router, Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import {mapStateToProps} from "../redux/mapStateToProps";


// Import utils
import {history} from "../configs/history";

// Import pages

import Layout from "../containers/Layout";
import Profile from "../containers/Profile";
import NotFound from "../containers/NotFound";

class Routes extends Component {
    render() {

        return <Router history={history}>
            <Layout>
                <Redirect from={'/'} to={'/profile'}/>
                <Switch>
                    <Route path="/profile/:pageName?/:id?/:userId?" component={Profile}/>
                    <Route exact path="*" component={NotFound}/>
                </Switch>
            </Layout>
        </Router>
    }
}

export default connect(mapStateToProps)(Routes)
