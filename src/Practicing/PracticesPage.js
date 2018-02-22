import React from 'react';
import { Switch } from 'react-router-dom';

import PrivateRoute from '../Layout/PrivateRoute';

import AddPracticeForm from './AddPracticeForm.js'
import Practices from './Practices'

const PracticesPage = () => (
    <Switch>
      <PrivateRoute exact path='/practices/' component={Practices} />
      <PrivateRoute path='/practices/New' component={AddPracticeForm} />
    </Switch>
)

export default PracticesPage;