import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { auth, provider } from './firebase.js';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      practices: [{
      id: 1,
      name: 'richmondPractice',
      comment: 'Elbow to low',
      totalValue: 200,
      practiceDateTimeStamp: 500000
    }]};

    this.login = this.login.bind(this); // <-- add this line
    this.logout = this.logout.bind(this); // <-- add this line
  }

  logout() {
    auth.signOut()
    .then(() => {
      this.setState({
        user: null,
        practices: []
      });
    });
  }

  login() {
    auth.signInWithPopup(provider) 
      .then((result) => {
        const user = result.user;
        this.setState({
          user: user,
          practices: []
        });

        user.getToken().then((token) => { 
          this.getAllPractices(token);
        });
      });
  }

  // {headers.append(}'Accept', 'application/json');
  // headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
  // headers.append("Authorization", "Bearer " + token);


  getAllPractices(token){
    axios.get(`http://localhost:56617/api/practice`, {
      headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*', //'http://localhost:4200',
        Authorization: 'Bearer ' + token
      }
    })
    .then(res => {
      const testPractice = res.data;
      this.setState({ practices: testPractice });
    });
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
        <div className='container'>
        {
          this.state.user ?
          <button onClick={this.logout}>Log Out</button>                
          :
          <button onClick={this.login}>Log In</button>              
        }
        </div>
          
          {this.state.practices.map((practice, index) => (
              <div key={practice.id}><span>{practice.name} {practice.practiceDateTimeStamp}</span></div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
