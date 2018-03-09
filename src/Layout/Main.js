import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import Dashboard from '../Dashboard';
import Arrows from '../Equipment/Arrows';
import PracticesPage from '../Practicing/PracticesPage';
import EquipmentPage from '../Equipment/EquipmentPage';

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Dashboard} />
            <PrivateRoute path='/Practices' component={PracticesPage} />
            <PrivateRoute path='/Bows' component={EquipmentPage} />
            <PrivateRoute path='/Arrows' component={EquipmentPage} />
        </Switch>
    </main>
)

export default Main;