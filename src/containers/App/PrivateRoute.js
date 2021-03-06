import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from '../../Auth/AuthService';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        isLoggedIn() === true ? <Component {...props} />
            : <Redirect to='/Login' />
    )} />
)


export const NonPrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        isLoggedIn() !== true ? <Component {...props} />
            : <Redirect to='/' />
    )} />
)