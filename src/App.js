import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { auth, provider } from './firebase.js';
import axios from 'axios';
import Login from './Login.js'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      practices: [
    //     {
    //   id: 1,
    //   name: 'richmondPractice',
    //   comment: 'Elbow to low',
    //   totalValue: 200,
    //   practiceDateTimeStamp: 500000
    // }
  ]};
  }
  
  handleUserDataChange(userData){
    this.setState({
      user: userData.user,
      token: userData.token
    });
    this.getAllPractices(this.state.token);
  }

  getAllPractices(token){
    axios.get(`http://localhost:56617/api/practice`, {
      headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + token
      }
    })
    .then(res => {
      const testPractice = res.data;
      this.setState({ practices: testPractice });
    });
  }

  componentDidMount() {
    if(this.state.token){
      this.getAllPractices(this.state.token);
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
        <div>{this.state.user ? this.state.user.displayName : ""}</div>
        <div>{this.state.token}</div>
        <Login handleUserDataChange={this.handleUserDataChange.bind(this)} />
          
          {this.state.practices.map((practice, index) => (
              <div key={practice.id}><span>{practice.name} {practice.practiceDateTimeStamp}</span></div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
