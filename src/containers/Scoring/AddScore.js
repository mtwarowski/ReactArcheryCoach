import React, { Component } from 'react';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadArrowsAsync, loadBowsAsync } from '../../actions/equipment'
import { loadTournamentRoundsAsync, addScoreAsync } from '../../actions/scores'

import { getUnixUtcTimeStamp } from '../../helpers/datetime'

import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import AutoComplete from 'material-ui/AutoComplete';

const dataSourceConfig = {
  text: 'name',
  value: 'id',
};

class AddScore extends Component {

  constructor(props) {
    super(props);
    this.state = {
      scoreName: "",
      scoreDate: new Date(),
      tournamentRound: undefined,
      bow: undefined,
      arrowsSet: undefined
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdateBowInput.bind(this);
    this.handleUpdateArrowsInput.bind(this);
    this.handleUpdateRoundInput.bind(this);
  }

  componentDidMount() {
    this.props.bowName || this.props.loadBowsAsync();
    this.props.arrowsName || this.props.loadArrowsAsync();
    this.props.tournamentRounds || this.props.loadTournamentRoundsAsync();
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.addScoreAsync({
      name: this.state.scoreName,
      // formatedTextDate: this.state.scoreDate,
      date: this.state.scoreDate,
      timeStamp: getUnixUtcTimeStamp(this.state.scoreDate),
      bow: this.state.bow,
      arrowsSet: this.state.arrowsSet
    });
  }

  handleUpdateBowInput(name){
    this.setState({
      bow: this.props.bows.filter(x => x.name === name)[0]
    });
  }

  handleUpdateArrowsInput(name){
    this.setState({
      arrowsSet: this.props.arrows.filter(x => x.name === name)[0]
    });
  }
  handleUpdateRoundInput(name){
    this.setState({
      tournamentRound: this.props.tournamentRounds.filter(x => x.name === name)[0]
    });
  }

  render() {

    return (
      <form onSubmit={this.handleSubmit}>
        <Card>
          <CardTitle title="New Scoring" />
          <CardText>
            <div>
              <TextField placeholder="Name" name="ScoreName" value={this.state.scoreName} onChange={(event) => this.setState({ scoreName: event.target.value })} fullWidth={true} />
            </div>
            <div>
              <DatePicker placeholder="Choose a date" name="ScoreDate" value={this.state.scoreDate} onChange={(event, date) => this.setState({ scoreDate: date })} fullWidth={true} />
            </div>
            <div>
              <AutoComplete floatingLabelText="Bow"
                filter={AutoComplete.noFilter}
                onUpdateInput={(value) => this.handleUpdateBowInput(value)}
                dataSourceConfig={dataSourceConfig}
                dataSource={this.props.bows || []}
                openOnFocus={true}
                disabled={!this.props.bows || this.props.bows.length === 0}
                fullWidth={true} />
            </div>
            <div>
              <AutoComplete floatingLabelText="Arrows"
                filter={AutoComplete.noFilter}
                onUpdateInput={(value) => this.handleUpdateArrowsInput(value)}
                dataSourceConfig={dataSourceConfig}
                dataSource={this.props.arrows || []}
                disabled={!this.props.arrows || this.props.arrows.length === 0}
                openOnFocus={true}
                fullWidth={true} />
            </div>
            <div>
              <AutoComplete floatingLabelText="Rounds"
                filter={AutoComplete.noFilter}
                onUpdateInput={(value) => this.handleUpdateRoundInput(value)}
                dataSourceConfig={dataSourceConfig}
                dataSource={this.props.tournamentRounds || []}
                openOnFocus={true}
                disabled={!this.props.tournamentRounds || this.props.tournamentRounds.length === 0}
                fullWidth={true} />
            </div>
          </CardText>
          <CardActions>
            <FlatButton type="submit" value="Submit" label="Submit" />
          </CardActions>
        </Card>
      </form>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    ...props,
    bows: state.equipment.bows,
    arrows: state.equipment.arrows,
    tournamentRounds: state.scores.tournamentRounds,
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  loadArrowsAsync,
  loadBowsAsync,
  loadTournamentRoundsAsync,
  addScoreAsync
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddScore)
