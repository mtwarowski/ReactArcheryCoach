import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthService from '../Auth/AuthService';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        new AuthService().loggedIn() === true
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
)

export default PrivateRoute;