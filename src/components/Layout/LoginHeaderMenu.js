import React from 'react'
import { isLoggedIn, logout } from '../../Auth/AuthService'
import { navigateTo } from '../../helpers/navigation'
import { Link } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton'

const handleLogout = () => {
  logout();
  navigateTo('./');
};

const LoginHeaderMenu = (props) => {
    return (
        isLoggedIn() ? <FlatButton onClick={handleLogout}>Log Out</FlatButton>
            : <Link to={'./Login'} ><FlatButton onClick={this.login}>Log In</FlatButton></Link>
    );
}

export default LoginHeaderMenu;