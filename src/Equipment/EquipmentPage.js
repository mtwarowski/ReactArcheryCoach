import React from 'react';
import { Switch } from 'react-router-dom';

import PrivateRoute from '../Layout/PrivateRoute';

import Bows from './Bows'
import AddBowForm from './AddBowForm'

const EquipmentPage = () => (
    <Switch>
      <PrivateRoute exact path='/bows/' component={Bows} />
      <PrivateRoute path='/bows/new' component={AddBowForm} />
    </Switch>
)

export default EquipmentPage;