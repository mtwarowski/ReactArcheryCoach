import React, { Component } from 'react';
import { auth, provider } from './firebase.js';


class Login extends Component {
  constructor(props) {
    super(props);    
    
    this.state = {
      user: null,
      token: null,
      handleUserDataChange: this.props.handleUserDataChange
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  logout() {
    auth.signOut()
    .then(() => {
      this.setState({
        user: null
      });
    });
  }

  login() {
    auth.signInWithPopup(provider) 
      .then((result) => {
        const user = result.user;
        this.setState({
          user: user
        });

        user.getIdToken().then((token) => {
          this.setState({
            token: token
          });
          this.state.handleUserDataChange({user: this.state.user, token: this.state.token});
        });
      });
  }
  
  render() {
    return (
      <div>
      {
        this.state.user ?
        <button onClick={this.logout}>Log Out</button>                
        :
        <button onClick={this.login}>Log In</button>              
      }
      </div>
    );
  }
}
export default Login;

