import React from 'react';
import { Switch } from 'react-router-dom';

import { PrivateRoute } from '../../containers/App/PrivateRoute';

import AddPractice from './AddPractice'
import Practices from './Practices'

const PracticesPage = () => (
    <Switch>
      <PrivateRoute exact path='/practices/' component={Practices} />
      <PrivateRoute path='/practices/New' component={AddPractice} />
    </Switch>
)

export default PracticesPage;