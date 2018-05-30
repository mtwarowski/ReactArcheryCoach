import React from 'react';

import Avatar from 'material-ui/Avatar';
import Badge from 'material-ui/Badge';
import RaisedButton from 'material-ui/RaisedButton';
import NavigationArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import NavigationArrowDropUp from 'material-ui/svg-icons/navigation/arrow-drop-up';
import { yellowA700, blue500 } from 'material-ui/styles/colors';

export default class ArrowPointBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpened: false
        };
    }

    render() {
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
                paddingTop: 10,

            },
            arrowPointPresenter: {
                marginLeft: '5px'
            },
            navArrowDropUpDownButton: {
                float: 'right',
                marginRight: '10px'
            }
        };
        return (
            <div style={styles.arrowPointBarContainer}>
                {this.state.isOpened &&
                    <div style={styles.arrowPointPresenterContainer} >
                        {this.props.points.map((arrowPoint, idx) =>
                            arrowPoint.arrowNo ?
                                <Badge style={{ padding: 12 }} badgeContent={arrowPoint.arrowNo} primary={true} key={idx}>
                                    <Avatar onClick={() => this.props.onArrowPointSelected(arrowPoint)}
                                        style={styles.arrowPointPresenter}
                                        backgroundColor={arrowPoint.isEditMode ? yellowA700 : blue500}
                                    >{arrowPoint.displayValue || '--'}</Avatar>
                                </Badge> :
                                <span style={{ padding: 12 }} key={idx}>
                                    <Avatar onClick={() => this.props.onArrowPointSelected(arrowPoint)}
                                        style={styles.arrowPointPresenter}
                                        backgroundColor={arrowPoint.isEditMode ? yellowA700 : blue500}
                                    >{arrowPoint.displayValue || '--'}</Avatar>
                                </span>
                        )}
                    </div>
                }
                <RaisedButton style={styles.navArrowDropUpDownButton} onClick={() => this.setState({ isOpened: !this.state.isOpened })} icon={this.state.isOpened ? <NavigationArrowDropUp /> : <NavigationArrowDropDown />} />
            </div>);
    }
}