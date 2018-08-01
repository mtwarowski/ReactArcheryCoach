import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

import { navigateTo } from '../../helpers/navigation'
import { loginWithGoogle } from '../../Auth/AuthService'
  
const handleLoginWithGoogle = () =>  {
    loginWithGoogle().then((result) => {
        navigateTo('./');
    });
}

const LoginPage = () => (
    <div className="centered">
        <RaisedButton primary={true} fullWidth={true} label="Log In / Register With Google" onClick={handleLoginWithGoogle}></RaisedButton>
    </div>
)

export default LoginPage;