import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'

import { navigateTo } from '../../helpers/navigation'
import { loginWithGoogle } from '../../Auth/AuthService'
  
const handleLoginWithGoogle = () =>  {
    loginWithGoogle().then((result) => {
        navigateTo('./');
    });
}

const LoginPage = () => (
    <Paper className="centered" style={
        {
            paddingTop: 20,
            paddingBottom: 20,
            paddingLeft: 50,
            paddingRight: 50,
    }}>
        <RaisedButton primary={true} fullWidth={true} label="Log In / Register With Google" onClick={handleLoginWithGoogle}></RaisedButton>
    </Paper>
)

export default LoginPage;