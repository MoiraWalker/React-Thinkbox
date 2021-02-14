import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Login, Project, Projects, Admin, Register, Account, Post } from '../../pages';
import { PrivateRoute } from "../privateRoute";
import { PrivateRouteAdmin } from "../privateRouteAdmin";

export const Routes = () => {
    return (
        <Switch>
            <PrivateRoute exact path="/">
                <Projects/>,
            </PrivateRoute>
            <PrivateRoute exact path="/account">
                <Account/>,
            </PrivateRoute>
            <PrivateRoute exact path="/projects">
                <Projects/>,
            </PrivateRoute>
            <PrivateRoute exact path="/project:id">
                <Project/>,
            </PrivateRoute>
            <PrivateRoute exact path="/post:id">
                <Post/>,
            </PrivateRoute>
            <PrivateRouteAdmin exact path="/admin">
                <Admin/>,
            </PrivateRouteAdmin>
            <Route path="/register" component={Register}></Route>
            <Route path="/login" component={Login}></Route>
        </Switch>
    );
}
