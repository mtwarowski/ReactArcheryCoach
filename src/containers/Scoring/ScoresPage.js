import React from 'react';
import { Switch } from 'react-router-dom';

import { PrivateRoute } from '../../containers/App/PrivateRoute';

import AddScore from './AddScore'
import EditScore from './EditScore'
import GroupingScore from './GroupingScore'
import EditScoreEnd from './EditScoreEnd'
import Scores from './Scores'
import ScoreSummary from './ScoreSummary'

const ScoresPage = () => (
    <Switch>
      <PrivateRoute exact path='/scores/' component={Scores} />
      <PrivateRoute path='/scores/New' component={AddScore} />
      <PrivateRoute path='/scores/compare/:id' component={GroupingScore} />
      <PrivateRoute path='/scores/summary/:id/:roundNo' component={ScoreSummary} />
      <PrivateRoute path='/scores/:id/:roundNo/:endNo' component={EditScoreEnd} />
      <PrivateRoute path='/scores/:id' component={EditScore} />
    </Switch>
)

export default ScoresPage;