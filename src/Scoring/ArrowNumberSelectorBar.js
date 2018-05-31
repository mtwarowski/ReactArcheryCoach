import React, { Component } from 'react';

import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

const ArrowNumberSelectorBar = ({ availableArrowNumbers, arrowPointsSelectedIndex, handleArrowNumberSelected }) => {

    const paperStyles = {
        display: 'inline-block',
        margin: '16px 32px 16px 0',
    };

    const arrowNumberSelectorBarStyles = {
        margin: 0,
        top: 'auto',
        bottom: 0,
        left: 20,
        position: 'fixed'
    }

    const menuItemStyles = {
        //lineHeight: '10px'
    }

    return (
        arrowPointsSelectedIndex || arrowPointsSelectedIndex === 0 ?
            <div style={arrowNumberSelectorBarStyles}>
                <Paper style={paperStyles}>
                    <Menu desktop={true}>
                        {availableArrowNumbers.map(x => <MenuItem style={menuItemStyles} key={x} onClick={() => handleArrowNumberSelected(x)} primaryText={'Arrow No: ' + x} />)}
                        <Divider />
                        <MenuItem style={menuItemStyles} onClick={() => handleArrowNumberSelected(null)} primaryText={'Cancel'} />
                    </Menu>
                </Paper>
            </div> : '');
}

export default  ArrowNumberSelectorBar;