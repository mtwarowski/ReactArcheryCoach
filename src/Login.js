import React, { Component } from 'react';
import AuthService from './Auth/AuthService';
import FlatButton from 'material-ui/FlatButton';

class Login extends Component {
  constructor(props) {
    super(props);    
    this.state = { isUserLoggedIn: false };


    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.auth = new AuthService();
  }
  
  componentDidMount() {
    this.setState({ 
      isUserLoggedIn: this.auth.loggedIn()
    });    
  }
  
  login() {
    this.auth.loginWithGoogle().then((result) => {
      const user =  result.user;
      this.setState({ isUserLoggedIn: user != null });
    });
  }

  logout() {
    this.auth.logout();      
    this.setState({ isUserLoggedIn: false });
  }
  
  render() {
    return (
        this.state.isUserLoggedIn ?
        <FlatButton onClick={this.logout}>Log Out</FlatButton>                
        :
        <FlatButton onClick={this.login}>Log In</FlatButton>
    );
  }
}
export default Login;

