import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import Dashboard from './Dashboard';
import LoginPage from './LoginPage';
import PracticesPage from '../Practicing/PracticesPage';
import ScoresPage from '../Scoring/ScoresPage';
import IntensitiesPage from '../Intensity/IntensitiesPage';
import MainPage from '../SnapAndScore/MainPage';
import EquipmentPage from '../Equipment/EquipmentPage';
import AddIntensityPlanForm from '../Intensity/AddIntensityPlanForm';
import TargetFace from '../Scoring/TargetFace';

const Main = () => (
    <main>
        <Switch>
            {/* <PrivateRoute path='/' component={ScoresPage} /> */}
            <Route exact path='/' component={Dashboard} />
            <Route path='/Login' component={LoginPage} />
            <PrivateRoute path='/Practices' component={PracticesPage} />
            <PrivateRoute path='/Scores' component={ScoresPage} />
            <PrivateRoute path='/Bows' component={EquipmentPage} />
            <PrivateRoute path='/Arrows' component={EquipmentPage} />
            <PrivateRoute path='/Intensities' component={IntensitiesPage} />
            <Route path='/Test' component={AddIntensityPlanForm} />
            <Route path='/SnapAndScore' component={MainPage} />
            
            <Route path='/TargetFace' component={TargetFace} />
        </Switch>
    </main>
)
export default Main;