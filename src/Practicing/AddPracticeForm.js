import React, { Component } from 'react';
import axios from 'axios';
import HttpHelpers from '../Auth/HttpHelpers';
import Config from '../Config'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';


class AddPracticeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      practiceName: '',
      practiceDate: '',
      practiceComment: '',
      practiceRounds: [], //[{numberOfRound, numberOfTimesPairRound}]
    };

    this.practiceApiBaseUrl = new Config().PracticeApiBaseUrl;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePracticeCommentChange = this.handlePracticeCommentChange.bind(this);
    this.handleAddNewPracticeRound = this.handleAddNewPracticeRound.bind(this);
    this.handleDeleteNewPracticeRound = this.handleDeleteNewPracticeRound.bind(this);
    this.handleNumberOfRoundChange = this.handleNumberOfRoundChange.bind(this);
    this.handleNumberOfTimesPairRound = this.handleNumberOfTimesPairRound.bind(this);
  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.practiceName + ' ' + this.state.practiceDate + ' ' + this.state.practiceComment);
    event.preventDefault();

    axios.post(this.practiceApiBaseUrl + 'api/practice/', {
      name: this.state.practiceName,
      comment: this.state.practiceComment,
      practiceDateTimeStamp: this.state.practiceDate,
      practiceRounds: this.state.practiceRounds,
      totalValue: this.getTotalValue()
    }, {
        headers: HttpHelpers.getHttpHeaders()
      }).then((response) => {
        this.setState({
          practiceName: '',
          practiceDate: '',
          practiceComment: '',
          practiceRounds: [], //[{numberOfRound, numberOfTimesPairRound}]
        });
      });
  }

  getTotalValue() {
    let total = 0;

    this.state.practiceRounds.forEach((practiceRound) => {
      total += (practiceRound.numberOfRound * practiceRound.numberOfTimesPairRound);
    });
    return total;
  }

  handlePracticeCommentChange(event) {
    this.setState({ practiceComment: event.target.value });
  }

  handleAddNewPracticeRound(event) {
    event.preventDefault();
    var practiceRounds = this.state.practiceRounds;
    practiceRounds.push({
      numberOfRound: 0,
      numberOfTimesPairRound: 0
    });
    this.setState({ practiceRounds: practiceRounds });
  }

  handleDeleteNewPracticeRound(event, index) {
    event.preventDefault();
    var practiceRound = this.state.practiceRounds[index];
    var practiceRounds = this.state.practiceRounds.filter((value) => value !== practiceRound);
    this.setState({ practiceRounds: practiceRounds });
  }

  handleNumberOfRoundChange(event, index) {
    var practiceRounds = this.state.practiceRounds;
    practiceRounds[index].numberOfRound = event.target.value;
    this.setState({ practiceRounds: practiceRounds });
  }

  handleNumberOfTimesPairRound(event, index) {
    var practiceRounds = this.state.practiceRounds;
    practiceRounds[index].numberOfTimesPairRound = event.target.value;
    this.setState({ practiceRounds: practiceRounds });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Card>
          <CardTitle title="New Practice" />
          <CardText>
            <div>
              <TextField placeholder="Practice name" name="PracticeName" value={this.state.practiceName} onChange={(event) => this.setState({ practiceName: event.target.value })} fullWidth={true} />
            </div>
            <div>
              <DatePicker placeholder="Choose a date" name="PracticeDate" value={this.state.practiceDate} onChange={(event, date) => this.setState({ practiceDate: date })} fullWidth={true}/>
            </div>
            <div>
              <TextField placeholder="Practice comment" name="PracticeComment" value={this.state.practiceComment} onChange={this.handlePracticeCommentChange} fullWidth={true}/>
            </div>
            <hr />
            <FlatButton onClick={this.handleAddNewPracticeRound} fullWidth={true}>New Practice Set:</FlatButton>
            {this.state.practiceRounds.map((practiceRound, index) => (
              <div key={index}>
                <TextField placeholder="Rounds" type="number" value={practiceRound.numberOfRound} onChange={(event) => this.handleNumberOfRoundChange(event, index)} />
                <span> x </span>
                <TextField placeholder="Arrows No" type="number" value={practiceRound.numberOfTimesPairRound} onChange={(event) => this.handleNumberOfTimesPairRound(event, index)} />
                <FlatButton onClick={(event) => this.handleDeleteNewPracticeRound(event, index)}>remove</FlatButton>
                <hr />
              </div>
            ))}

          </CardText>
          <CardActions>
            <FlatButton type="submit" value="Submit" label="Submit" />
          </CardActions>
        </Card>
      </form>
    );
  }
}
export default AddPracticeForm;