import React from 'react';

import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import Badge from 'material-ui/Badge';
import RaisedButton from 'material-ui/RaisedButton';
import NavigationArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import NavigationArrowDropUp from 'material-ui/svg-icons/navigation/arrow-drop-up';
import { yellowA700, blue500 } from 'material-ui/styles/colors';

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
    arrowPointPresenter: {
        margin: '10px 10px 0px 0px'
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
    }
    render() {
        return (
            <div style={styles.arrowPointBarContainer}>
                {this.state.isOpened &&
                    <Paper style={styles.arrowPointPresenterContainer} >
                        {this.props.points.map((arrowPoint, idx) =>
                            arrowPoint.arrowNo ?
                                <Badge style={{ padding: '10px 10px 0px 0px' }} badgeContent={arrowPoint.arrowNo} primary={true} key={idx}>
                                    <Avatar onClick={() => this.props.onArrowPointSelected(arrowPoint)}
                                        backgroundColor={arrowPoint.isEditMode ? yellowA700 : blue500}
                                    >{arrowPoint.displayValue || '--'}</Avatar>
                                </Badge> :
                                <Avatar onClick={() => this.props.onArrowPointSelected(arrowPoint)}
                                    style={styles.arrowPointPresenter} key={idx}
                                    backgroundColor={arrowPoint.isEditMode ? yellowA700 : blue500}
                                >{arrowPoint.displayValue || '--'}</Avatar>

                        )}
                    </Paper>
                }
                <RaisedButton style={styles.navArrowDropUpDownButton} onClick={() => this.setState({ isOpened: !this.state.isOpened })} icon={this.state.isOpened ? <NavigationArrowDropUp /> : <NavigationArrowDropDown />} />
            </div>);
    }
}