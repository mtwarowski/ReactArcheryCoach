import React, { Component } from 'react';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadArrowsAsync, loadBowsAsync } from '../../actions/equipment'
import { loadTournamentRoundsAsync, addScoreAsync } from '../../actions/scores'

import { getUnixUtcTimeStamp, getDayText } from '../../helpers/datetime'
import { getMaxTournamentRoundScore, getDefaultLabels } from '../../helpers/points'

import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import AutoComplete from 'material-ui/AutoComplete'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Snackbar from 'material-ui/Snackbar'
import Checkbox from 'material-ui/Checkbox'

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
      
      allowBowSelection: false,
      bow: undefined,
      arrowsSet: undefined,
      scoringType: undefined,

      allowArrowSetSelection: false,
      arrowsDiameter: 5,

      error: "",
      showError: false,

      tournamentRounds: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdateBowInput.bind(this);
    this.handleUpdateArrowsInput.bind(this);
    this.handleUpdateRoundInput.bind(this);
    this.handleScoringTypeChange.bind(this);
  }

  componentDidMount() {
    this.props.bowName || this.props.loadBowsAsync();
    this.props.arrowsName || this.props.loadArrowsAsync();
    this.props.tournamentRounds || this.props.loadTournamentRoundsAsync();

    if(this.props.tournamentRounds){
      this.setState({tournamentRounds: this.props.tournamentRounds});
    }
  }
  componentDidUpdate(prevProps) {
    if(this.props.tournamentRounds !== prevProps.tournamentRounds){
      this.setState({tournamentRounds: this.props.tournamentRounds});
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    let formError = this.getFormError();
    if (formError) {
      this.setState({ error: formError, showError: true });
      return;
    }

    let arrowsSet = this.state.allowArrowSetSelection ? this.state.arrowsSet : this.generateDefaultArrowSet();
    let score = {
      name: this.state.scoreName,
      day: getDayText(this.state.scoreDate),
      timeStamp: getUnixUtcTimeStamp(this.state.scoreDate),
      arrowsSet: arrowsSet,
      tournamentRound: this.state.tournamentRound,
      scoringType: this.state.scoringType,
      currentValue: 0,
      maxValue: getMaxTournamentRoundScore(this.state.tournamentRound),
    }
    if(this.state.bow){      
      score.bow = this.state.bow;
    }
    
    this.props.addScoreAsync(score);
  }


  generateDefaultArrowSet(){
    return {
      name: "Default Arrows",
      diameterInMm: this.state.arrowsDiameter,
      labels: getDefaultLabels(),
    };
  }

  getFormError() {

    if (!this.state.scoreName) {
      return "Name field is required";
    }

    if (this.state.allowBowSelection && !this.state.bow) {
      return "Bow field is required";
    }

    if (this.state.allowArrowSetSelection && !this.state.arrowsSet) {
      return "Arrow set field is required";
    }

    if (!this.state.allowArrowSetSelection && !this.state.arrowsDiameter) {
      return "We need to know the diameter of your arrows set";
    }

    if (!this.state.scoreDate) {
      return "Date set field is required";
    }

    if (!this.state.tournamentRound) {
      return "Tournament Round set field is required";
    }

    if (!this.state.scoringType) {
      return "Scoring Type set field is required";
    }

    return undefined;
  }

  handleUpdateBowInput(name) {
    this.setState({
      bow: this.props.bows.filter(x => x.name === name)[0]
    });
  }

  handleUpdateArrowsInput(name) {
    this.setState({
      arrowsSet: this.props.arrows.filter(x => x.name === name)[0]
    });
  }

  handleUpdateRoundInput(name) {
    this.setState({
      tournamentRound: this.props.tournamentRounds.filter(x => x.name === name)[0]
    });
  }


  handleScoringTypeChange(value) {
    this.setState({ scoringType: value });
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
              <Checkbox label="Bow Selection" checked={this.state.allowBowSelection} onCheck={() => this.setState({allowBowSelection: !this.state.allowBowSelection})} />
              <Checkbox label="Arrows Selection" checked={this.state.allowArrowSetSelection} onCheck={() => this.setState({allowArrowSetSelection: !this.state.allowArrowSetSelection})} />
            </div>
            
            {
              this.state.allowBowSelection && 
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
            }
            
            {
              this.state.allowArrowSetSelection ?
              <div>
                <AutoComplete floatingLabelText="Arrows"
                  filter={AutoComplete.fuzzyFilter}
                  onUpdateInput={(value) => this.handleUpdateArrowsInput(value)}
                  dataSourceConfig={dataSourceConfig}
                  dataSource={this.props.arrows || []}
                  disabled={!this.props.arrows || this.props.arrows.length === 0}
                  openOnFocus={true}
                  fullWidth={true} />
              </div>
              : 
              <div>
                <TextField placeholder="Arrows Diameter [mm]" type="number" name="arrowsDiameter" value={this.state.arrowsDiameter} onChange={(event) => this.setState({ arrowsDiameter: event.target.value })} fullWidth={true} />
              </div>
            }
            <div>
              <AutoComplete floatingLabelText="Rounds"
                filter={AutoComplete.fuzzyFilter}
                onUpdateInput={(value) => this.handleUpdateRoundInput(value)}
                dataSourceConfig={dataSourceConfig}
                dataSource={this.props.tournamentRounds || []}
                openOnFocus={true}
                disabled={!this.props.tournamentRounds || this.props.tournamentRounds.length === 0}
                fullWidth={true} />
            </div>            
            <div>
              <SelectField
                fullWidth={true}
                floatingLabelText="Type of Scoring"
                value={this.state.scoringType}
                onChange={(event, index, value) => this.handleScoringTypeChange(value)}>
                <MenuItem value={'OnlySummaryScore'} primaryText="Only summary score" />
                <MenuItem value={'OnlyNumbers'} primaryText="Only numbers" />
                <MenuItem value={'OnlyNumbersWithArrowNumbers'} primaryText="Only numbers with arrow numbers" />
                <MenuItem value={'OnFace'} primaryText="On face" />
                <MenuItem value={'OnFaceWithArrowNumbers'} primaryText="On face with arrow numbers" />
              </SelectField>
            </div>
          </CardText>
          <CardActions>
            <FlatButton type="submit" value="Submit" label="Submit" />
          </CardActions>
        </Card>

        <Snackbar
          open={this.state.showError}
          message={this.state.error}
          autoHideDuration={1500}
          onRequestClose={() => this.setState({ showError: false, error: undefined })}
        />
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
