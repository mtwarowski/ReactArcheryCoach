import React, { Component } from 'react';

import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

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

const ArrowNumberSelectorBar = ({ availableArrowNumbers, arrowPointsSelectedIndex, handleArrowNumberSelected }) => {
    return (
        (arrowPointsSelectedIndex || arrowPointsSelectedIndex === 0) &&
            <div style={arrowNumberSelectorBarStyles}>
                <Paper style={paperStyles}>
                    <Menu desktop={true}>
                        {availableArrowNumbers && availableArrowNumbers.map(x => <MenuItem key={x} onClick={() => handleArrowNumberSelected(x)} primaryText={'Arrow No: ' + x} />)}
                        <Divider />
                        <MenuItem onClick={() => handleArrowNumberSelected(null)} primaryText={'Cancel'} />
                    </Menu>
                </Paper>
            </div>);
}
export default ArrowNumberSelectorBar;