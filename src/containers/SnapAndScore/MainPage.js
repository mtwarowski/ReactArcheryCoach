import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from '../../containers/App/PrivateRoute';

import {Welcome} from './Welcome'
import ImageMarker from './ImageMarker'

const MainPage = () => (
    <Switch>
      <Route exact={true} path='/SnapAndScore/' component={Welcome} />
      <Route path='/SnapAndScore/Marker' component={ImageMarker} />
    </Switch>
)

export default MainPage;