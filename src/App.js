import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      practices: [{
      Id: 1,
      Name: 'richmondPractice',
      Comment: 'Elbow to low',
      TotalValue: 200,
      PracticeDateTimeStamp: 500000
    },{
      Id: 2,
      Name: 'LAPractice',
      Comment: 'Ancker to low',
      TotalValue: 150,
      PracticeDateTimeStamp: 400000
    }]};
  }




  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
          
          {this.state.practices.map((practice, index) => (
              <div><span>{practice.Name} {practice.PracticeDateTimeStamp}</span></div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
