import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Login, Project, Projects, Admin, Register, Account } from '../../pages';
import { PrivateRoute } from "../privateRoute";

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
            <PrivateRoute exact path="/project">
                <Project/>,
            </PrivateRoute>
            <PrivateRoute exact path="/admin">
                <Admin/>,
            </PrivateRoute>

            <Route path="/register" component={Register}></Route>
            <Route path="/login" component={Login}></Route>
            {/*<Route path="/post:id" component={BlogPost}/>*/}
        </Switch>
    );
}
