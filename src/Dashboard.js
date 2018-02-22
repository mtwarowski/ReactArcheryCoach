import React from 'react';

import FontIcon from 'material-ui/FontIcon';
import { blue500, red500, greenA200 } from 'material-ui/styles/colors';

import logo from './logo.svg';

const iconStyles = {
    marginRight: 24,
};

const Dashboard = () => (
    <div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
        </header>


        {/* TODO investigate why those icons don't work? Probably because i'm missing a link  
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  
  */}
        <FontIcon
            className="muidocs-icon-action-home"
            style={iconStyles}
        />

        <FontIcon
            className="muidocs-icon-action-home"
            style={iconStyles}
            color={blue500}
        />

        <FontIcon
            className="muidocs-icon-action-home"
            style={iconStyles}
            color={red500}
            hoverColor={greenA200}
        />
    </div>
)

export default Dashboard;