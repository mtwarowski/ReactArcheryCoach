import React from 'react';
import { Switch } from 'react-router-dom';

import { PrivateRoute } from '../App/PrivateRoute';

import DailyIntensities from './DailyIntensities'

const IntensitiesPage = () => (
    <Switch>
      <PrivateRoute exact path='/Intensities/' component={DailyIntensities} />
      <PrivateRoute exact path='/Intensities/:date' component={DailyIntensities} />
    </Switch>
)

export default IntensitiesPage;