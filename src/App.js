import React, { Component } from 'react';
import './App.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {LARGE, SMALL} from 'material-ui/utils/withWidth';


import ThemeDefault from './theme-default';

import LeftDrawer from './Layout/LeftDrawer';
import Header from './Layout/Header';
import Main from './Layout/Main';

export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      navDrawerOpen: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.width !== nextProps.width) {
      this.setState({navDrawerOpen: nextProps.width === LARGE});
    }
  }


  handleChangeRequestNavDrawer() {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen
    });
  }

  render() {

    let { navDrawerOpen } = this.state;
    const paddingLeftDrawerOpen = 236;

    const styles = {
      header: {
        paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0
      },
      container: {
        margin: '80px 0px 0px 0px',
        paddingLeft: navDrawerOpen && this.props.width !== SMALL ? paddingLeftDrawerOpen : 0
      }
    };

    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <div>
          <Header styles={styles.header} 
                  handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer.bind(this)}/>
          <LeftDrawer navDrawerOpen={navDrawerOpen} />

          <div style={styles.container}>
            <Main />
          </div>
        </div>
      </MuiThemeProvider>);
  }
}

export default App;