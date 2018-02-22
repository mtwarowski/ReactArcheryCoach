import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import Dashboard from '../Dashboard';
import Bows from '../Equipment/Bows';
import PracticesPage from '../Practicing/PracticesPage';

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Dashboard} />
            <PrivateRoute path='/Practices' component={PracticesPage} />
            <PrivateRoute path='/Bows' component={Bows} />
        </Switch>
    </main>
)

export default Main;