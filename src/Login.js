import React, { Component } from 'react';
import AuthService from './Auth/AuthService';

class Login extends Component {
  constructor(props) {
    super(props);    
    this.state = { isUserLoggedIn: false };
    // this.state = {
    //   user: null,
    //   token: null,
    //   handleUserDataChange: this.props.handleUserDataChange
    // };

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
      <div>
      {
        this.state.isUserLoggedIn ?
        <button onClick={this.logout}>Log Out</button>                
        :
        <button onClick={this.login}>Log In</button>              
      }
      </div>
    );
  }
}
export default Login;

