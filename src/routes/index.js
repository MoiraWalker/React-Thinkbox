import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Login, Project, Projects, Register, User } from '../pages';

export const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={Projects}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/login" component={Project}></Route>
            {/*<Route path="/post:id" component={BlogPost}/>*/}
            <Route path="/user" component={User}></Route>
        </Switch>
    );
}
