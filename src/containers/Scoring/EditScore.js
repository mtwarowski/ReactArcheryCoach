import React, { Component } from 'react';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { updateScoreAsync, loadScoreByIdAsync } from '../../actions/scores'

import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import AutoComplete from 'material-ui/AutoComplete';

class EditScore extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadScoreByIdAsync(this.props.scoreId);
  }

  render() {
    return (this.props.score ? 
        <Card>
          <CardTitle title={this.props.score.name} />
          <CardText>
          </CardText>
          <CardActions>
            
          </CardActions>
        </Card>
      : "no data"
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    ...props,
    scoreId: props.match.params.id,
    score: state.scores.score,
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  updateScoreAsync,
  loadScoreByIdAsync,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditScore)
