import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Login from './Login.js'
import PaginationBar from './PaginationBar.js'
import AddPracticeForm from './Practicing/AddPracticeForm.js'

const practiceApiBaseUrl = "http://localhost:56617/";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      pageSize: 2,
      pageNumber: 1,
      itemCount: null,
      pagingButtons: [{
        displayValue: "1",
        pageNumber: 1
      },
      {
        displayValue: "2",
        pageNumber: 2
      },
      {
        displayValue: ">",
        pageNumber: 3
      }],
      practices: [
    //     {
    //   id: 1,
    //   name: 'richmondPractice',
    //   comment: 'Elbow to low',
    //   totalValue: 200,
    //   practiceDateTimeStamp: 500000
    // }
              ],
            };
  }
  
  handleUserDataChange(userData){
    this.setState({
      user: userData.user,
      token: userData.token
    });
    this.getAllPractices(this.state.token);
  }

  getAllPractices(token){

    var queryString = practiceApiBaseUrl + 'api/practice/pagination?pageNumber=' + this.state.pageNumber + '&pageSize=' + this.state.pageSize

    axios.get(queryString, {
      headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + token
      }
    })
    .then(res => {
      const pagingResult = res.data;
      this.setState({ 
        itemCount: pagingResult.itemCount,
        pageNumber: pagingResult.pageNumber,
        pageSize: pagingResult.pageSize,
        practices: pagingResult.data 
      });
    });
  }

  componentDidMount() {
    if(this.state.token){
      this.getAllPractices(this.state.token);
    }
  }

  handleSelectedPageChanged(pageNumber){
    this.setState({ pageNumber: pageNumber }, 
      () => { this.getAllPractices(this.state.token) });
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
        <AddPracticeForm />

        {this.state.practices.map((practice, index) => (
            <div key={practice.id}><span>{practice.name} {practice.practiceDateTimeStamp}</span></div>
        ))}
        <PaginationBar pageNumber={this.state.pageNumber} pageSize={this.state.pageSize} itemCount={this.state.itemCount} handleSelectedPageChanged={this.handleSelectedPageChanged.bind(this)} />
        </div>
      </div>
    );
  }
}

export default App;
