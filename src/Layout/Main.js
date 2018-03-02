import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import Dashboard from '../Dashboard';
import Bows from '../Equipment/Bows';
import PracticesPage from '../Practicing/PracticesPage';
import EquipmentPage from '../Equipment/EquipmentPage';

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Dashboard} />
            <PrivateRoute path='/practices' component={PracticesPage} />
            <PrivateRoute path='/bows' component={EquipmentPage} />
        </Switch>
    </main>
)

export default Main;