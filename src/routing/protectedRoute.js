import React from "react";
import {Route, Redirect} from "react-router-dom";
import {store} from "../redux/store";

export const ProtectedRoute = ({component: Component, ...props}) =>
    <Route {...props}
           render={({match}) => (store.getState().auth.isLoggedIn ?
               <Component id={match.params.id}/> :
               <Redirect to="/sign-in"/>)}/>;