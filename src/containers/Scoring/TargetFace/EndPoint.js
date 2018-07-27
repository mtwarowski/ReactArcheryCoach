import React from 'react';

import Avatar from 'material-ui/Avatar';
import Badge from 'material-ui/Badge';

const style = {border: '2px solid DarkGrey'};

export const EndPoint = ({point, onArrowPointSelected}) =>  {
    let currentPoint = point || {};

    return (currentPoint.arrowNo) ?
    <Badge style={{padding: '10px 10px 0px 0px' }} badgeContent={currentPoint.arrowNo} primary={true}>
        <Avatar style={style} onClick={() => onArrowPointSelected(currentPoint)}
            backgroundColor={currentPoint.backgroundColor} color={'DarkGrey'}
        >{currentPoint.displayValue || '--'}</Avatar>
    </Badge> :
    <Avatar onClick={() => onArrowPointSelected(currentPoint)}
        style={{...style, margin: '10px 10px 0px 0px'}}
        backgroundColor={currentPoint.backgroundColor || 'white'} color={'DarkGrey'}
    >{currentPoint.displayValue || '--'}</Avatar>
}

export default EndPoint;