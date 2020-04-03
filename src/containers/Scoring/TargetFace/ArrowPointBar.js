import React from 'react';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import NavigationArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import NavigationArrowDropUp from 'material-ui/svg-icons/navigation/arrow-drop-up';
import EndPoint from './EndPoint'
import { sortByValue } from '../../../helpers/points'

import Avatar from 'material-ui/Avatar';
import Backspace from 'material-ui/svg-icons/content/backspace';

const styles = {
    arrowPointBarContainer: {
        margin: 0,
        top: 50,
        left: 0,
        position: 'fixed',
        width: '100%',
    },
    arrowPointPresenterContainer: {
        backgroundColor: 'white',
        padding: 10,
    },
    navArrowDropUpDownButton: {
        float: 'right',
        marginRight: '10px'
    }
};

export default class ArrowPointBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpened: false
        };

        this.onArrowPointSelected = this.onArrowPointSelected.bind(this);
        this.onArrowPointRemove = this.onArrowPointRemove.bind(this);
    }
    
    onArrowPointSelected(point){
        var newArrowPoints = this.handleArrowPointBarSelected(point, this.props.points);
        this.props.onArrowPointsChanged(newArrowPoints);
    }
    
    onArrowPointRemove(point){
        var newArrowPoints = this.handleArrowPointBarRemove(point, this.props.points);
        this.props.onArrowPointsChanged(newArrowPoints);
    }

    handleArrowPointBarSelected(point, arrowPoints){
        let newArrowPoints = arrowPoints.slice(0);
        point.isEditMode = !point.isEditMode;
        return newArrowPoints;
    }

    handleArrowPointBarRemove(point, arrowPoints) {
        let newArrowPoints = arrowPoints.slice(0);
        newArrowPoints = newArrowPoints.filter(x => x !== point);
        return newArrowPoints;
    }

    render() {
        const orderedPointFromHighestToLowest = sortByValue(this.props.points);

        return (
            <div style={styles.arrowPointBarContainer}>
                {this.state.isOpened &&
                    <Paper style={styles.arrowPointPresenterContainer} >
                        {orderedPointFromHighestToLowest.map((arrowPoint, idx) => <EndPoint key={idx} point={arrowPoint} onArrowPointSelected={this.onArrowPointSelected}  />)}
                        {orderedPointFromHighestToLowest && orderedPointFromHighestToLowest.length > 0 && <Avatar onClick={() => this.onArrowPointRemove(orderedPointFromHighestToLowest[orderedPointFromHighestToLowest.length-1])}
                            backgroundColor={'white'} color={'DarkGrey'} style={{border: '2px solid DarkGrey'}} icon={<Backspace />}></Avatar>}
                    </Paper>
                }
                <RaisedButton style={styles.navArrowDropUpDownButton} onClick={() => this.setState({ isOpened: !this.state.isOpened })} icon={this.state.isOpened ? <NavigationArrowDropUp /> : <NavigationArrowDropDown />} />
            </div>);
    }
}