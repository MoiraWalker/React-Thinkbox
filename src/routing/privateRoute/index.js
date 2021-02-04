import React from 'react';
import { useAuthState } from '../../context/authContextProvider'
import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute = ({ children, ...rest }) => {
  const { isAuthenticated } = useAuthState();

  return (
    <Route {...rest} render={() => {
      return isAuthenticated ? children : <Redirect to="/login"/>
    }}/>
  );
}

