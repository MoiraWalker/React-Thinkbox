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
            <PrivateRoute path="/home">
                <Projects/>,
            </PrivateRoute>
            <PrivateRoute path="/account">
                <Account/>,
            </PrivateRoute>
            <PrivateRoute path="/projects">
                <Projects/>,
            </PrivateRoute>
            <PrivateRoute path="/project:id">
                <Project/>,
            </PrivateRoute>
            <PrivateRoute path="/post:id">
                <Post/>,
            </PrivateRoute>
            <PrivateRouteAdmin path="/admin">
                <Admin/>,
            </PrivateRouteAdmin>
            <Route path="/register" component={Register}></Route>
            <Route path="/login" component={Login}></Route>
        </Switch>
    );
}
