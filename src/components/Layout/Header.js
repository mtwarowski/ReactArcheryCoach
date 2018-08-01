import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/svg-icons/navigation/menu';

import Login from '../../components/Layout/Login';

export class Header extends Component {

    render() {
        const { styles, handleChangeRequestNavDrawer } = this.props;
        const style = {
            appBar: {
                position: 'fixed',
                top: 0,
                overflow: 'hidden',
                maxHeight: 57
            },
            menuButton: {
                marginLeft: 10
            },
            iconsRightContainer: {
                marginTop: 7,
                marginLeft: 20
            }
        };

        return (
            <div>
                <AppBar style={{ ...styles, ...style.appBar }}
                    title={<span>We Score!</span>}
                    onTitleClick={handleChangeRequestNavDrawer}
                    iconElementLeft={<IconButton style={style.menuButton} onClick={handleChangeRequestNavDrawer}><Menu /></IconButton>}
                    iconElementRight={<div style={style.iconsRightContainer}><Login /></div>}>
                </AppBar>
            </div>
        )
    }
}

export default Header;