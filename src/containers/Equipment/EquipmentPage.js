import React from 'react';
import { Switch } from 'react-router-dom';

import PrivateRoute from '../../containers/App/PrivateRoute';

import Bows from './Bows';
import AddBowForm from './AddBowForm';

import Arrows from './Arrows';
import AddArrowForm from './AddArrowForm';

const EquipmentPage = () => (
    <Switch>
      <PrivateRoute exact path='/bows/' component={Bows} />
      <PrivateRoute path='/bows/new' component={AddBowForm} />
      <PrivateRoute exact path='/arrows/' component={Arrows} />
      <PrivateRoute path='/arrows/new' component={AddArrowForm} />
    </Switch>
)

export default EquipmentPage;