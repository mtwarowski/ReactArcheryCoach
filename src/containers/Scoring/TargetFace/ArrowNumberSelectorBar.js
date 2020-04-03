import React from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

const getAvailableArrowNumbers = (arrowsSet, arrowPoints) => {
    if (!arrowsSet) {
        return undefined;
    }

    return arrowsSet.labels.filter((label) => isNotInCurrentPoints(label, arrowPoints));
}

const isNotInCurrentPoints = (label, arrowPoints) => {
    for (let pointIndex = 0; pointIndex < arrowPoints.length; pointIndex++) {
        const point = arrowPoints[pointIndex];

        if (point.arrowNo === label) {
            return false;
        }
    }
    return true;
}

const ArrowNumberSelectorBar = ({ arrowsSet, selectedArrowPoints, handleArrowNumberSelected }) => {
    const availableArrowNumbers = getAvailableArrowNumbers(arrowsSet, selectedArrowPoints);
    return (
        <div className="mainContainer">
            <Paper>
                <Menu>
                    {availableArrowNumbers && availableArrowNumbers.map(x => <MenuItem key={x} onClick={() => handleArrowNumberSelected(x)} primaryText={'Arrow No: ' + x} />)}
                    <Divider  />
                    <MenuItem onClick={() => handleArrowNumberSelected(null)} primaryText={'Cancel'} />
                </Menu>
            </Paper>
        </div>
    );
}

export default ArrowNumberSelectorBar;