import React, { Component } from 'react';
import axios from 'axios';
import HttpHelpers from '../Auth/HttpHelpers';


const practiceApiBaseUrl = "http://localhost:56617/";
class AddPracticeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      practiceName: '',
      practiceDate: '',
      practiceComment: '',
      practiceRounds: [], //[{numberOfRound, numberOfTimesPairRound}]
    };


    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePracticeCommentChange = this.handlePracticeCommentChange.bind(this);
    this.handleAddNewPracticeRound = this.handleAddNewPracticeRound.bind(this);
    this.handleDeleteNewPracticeRound = this.handleDeleteNewPracticeRound.bind(this);
    this.handleNumberOfRoundChange = this.handleNumberOfRoundChange.bind(this);
    this.handleNumberOfTimesPairRound = this.handleNumberOfTimesPairRound.bind(this);
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.practiceName  + ' ' + this.state.practiceDate + ' ' + this.state.practiceComment );
    event.preventDefault();
    
    axios.post(practiceApiBaseUrl + 'api/practice/', {
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
    // .catch(function (error) {
    // });
  }

  getTotalValue(){
    let total = 0;

    this.state.practiceRounds.forEach((practiceRound) => {
      total += (practiceRound.numberOfRound * practiceRound.numberOfTimesPairRound);
    });
    return total;
  }
  
  handlePracticeCommentChange(event) {    
    this.setState({practiceComment: event.target.value});
  }
  
  handleAddNewPracticeRound(event){
    event.preventDefault();
    var practiceRounds = this.state.practiceRounds;
    practiceRounds.push({
      numberOfRound: 0,
      numberOfTimesPairRound: 0
    });
    this.setState({practiceRounds: practiceRounds});
  }

  handleDeleteNewPracticeRound(event, index){
    event.preventDefault();
    var practiceRound = this.state.practiceRounds[index];
    var practiceRounds = this.state.practiceRounds.filter((value) => value !== practiceRound);
    this.setState({practiceRounds: practiceRounds});
  }

  handleNumberOfRoundChange(event, index) {    
    var practiceRounds = this.state.practiceRounds;
    practiceRounds[index].numberOfRound = event.target.value;
    this.setState({practiceRounds: practiceRounds});
  }
  
  handleNumberOfTimesPairRound(event, index) {
    var practiceRounds = this.state.practiceRounds;
    practiceRounds[index].numberOfTimesPairRound = event.target.value;
    this.setState({practiceRounds: practiceRounds});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <input placeholder="Practice name" name="PracticeName" value={this.state.practiceName} onChange={(event) => this.setState({ practiceName: event.target.value })} />
        </div>
        <div>
          <input placeholder="Choose a date" name="PracticeDate" type="number" value={this.state.practiceDate} onChange={(event) => this.setState({ practiceDate: event.target.value })} />
        </div>
        <div>
          <textarea placeholder="Practice comment" name="PracticeComment" value={this.state.practiceComment} onChange={this.handlePracticeCommentChange} />
        </div>
        <hr />
        <button onClick={this.handleAddNewPracticeRound}>New Practice Set:</button>
        {this.state.practiceRounds.map((practiceRound, index) => (
          <div key={index}>
            <span>{index + 1}</span>
            <input placeholder="Rounds" type="number" value={practiceRound.numberOfRound} onChange={(event) => this.handleNumberOfRoundChange(event, index)} />
            <input placeholder="Arrows No" type="number" value={practiceRound.numberOfTimesPairRound} onChange={(event) => this.handleNumberOfTimesPairRound(event, index)} />
            
            <button onClick={(event) => this.handleDeleteNewPracticeRound(event, index)}>remove</button>
            <hr />
          </div>
        ))}

        <input type="submit" value="Submit" />
      </form>
    );
  }
}
export default AddPracticeForm;