import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {AuthContext, useAuthState} from '../../context/authContextProvider'
import {useContext} from 'react';

export const PrivateRouteAdmin = ({children, ...rest}) => {
    const {isAuthenticated} = useAuthState();
    const {getAdmin} = useContext(AuthContext);

    return (
        <Route {...rest} render={() => {
            return isAuthenticated && getAdmin() ? children : <Redirect to="/login"/>
        }}/>
    );
}

