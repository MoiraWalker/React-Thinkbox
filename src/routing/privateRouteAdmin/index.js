import React from 'react';
import {AuthContext, useAuthState} from '../../context/authContextProvider'
import {Redirect, Route} from 'react-router-dom';
import {useContext} from 'react';

export const PrivateRouteAdmin = ({children, ...rest}) => {
    const {isAuthenticated} = useAuthState();
    const {getAdmin} = useContext(AuthContext);

    const admin = getAdmin();

    return (
        <Route {...rest} render={() => {
            return isAuthenticated && admin ? children : <Redirect to="/login"/>
        }}/>
    );
}

