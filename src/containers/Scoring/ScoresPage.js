import React from 'react';
import { Switch } from 'react-router-dom';

import PrivateRoute from '../../containers/App/PrivateRoute';

import AddScore from './AddScore'
import EditScore from './EditScore'
import EditScoreEnd from './EditScoreEnd'
import ImageMarker from './ImageMarker'
import Scores from './Scores'

const ScoresPage = () => (
    <Switch>
      <PrivateRoute exact path='/scores/' component={Scores} />
      <PrivateRoute path='/scores/New' component={AddScore} />
      <PrivateRoute path='/scores/Training' component={ImageMarker} />
      <PrivateRoute path='/scores/:id/:roundNo/:endNo' component={EditScoreEnd} />
      <PrivateRoute path='/scores/:id' component={EditScore} />
    </Switch>
)

export default ScoresPage;