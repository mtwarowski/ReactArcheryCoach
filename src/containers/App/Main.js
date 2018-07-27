import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import Dashboard from './Dashboard';
import PracticesPage from '../Practicing/PracticesPage';
import ScoresPage from '../Scoring/ScoresPage';
import EquipmentPage from '../Equipment/EquipmentPage';
import AddIntensityPlanForm from '../Intensity/AddIntensityPlanForm';
import TargetFace from '../Scoring/TargetFace';

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Dashboard} />
            <PrivateRoute path='/Practices' component={PracticesPage} />
            <PrivateRoute path='/Scores' component={ScoresPage} />
            <PrivateRoute path='/Bows' component={EquipmentPage} />
            <PrivateRoute path='/Arrows' component={EquipmentPage} />
            <Route path='/Test' component={AddIntensityPlanForm} />
            <Route path='/TargetFace' component={TargetFace} />
        </Switch>
    </main>
)
export default Main;