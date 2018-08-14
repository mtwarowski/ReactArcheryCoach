import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Card, {CardText} from 'material-ui/Card'

import { navigateTo } from '../../helpers/navigation'
import { loginWithGoogle } from '../../Auth/AuthService'
  
const handleLoginWithGoogle = () =>  {
    loginWithGoogle().then((result) => {
        navigateTo('./');
    });
}

const LoginPage = () => (
    <div>
        <Card >
            <CardText>
                <RaisedButton primary={true} fullWidth={true} label="Log In / Register With Google" onClick={handleLoginWithGoogle}></RaisedButton>
            </CardText>
        </Card>
    </div>
)

export default LoginPage;