import React from 'react';

import FontIcon from 'material-ui/FontIcon';
import { blue500, red500, greenA200 } from 'material-ui/styles/colors';

import logo from '../../logo.png';

const iconStyles = {
    marginRight: 24,
};

const Dashboard = () => (
    <div className="App">
        <header>
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">You shoot <span className="App-name">We Score!</span></h1>
        </header>
    </div>
)

export default Dashboard;