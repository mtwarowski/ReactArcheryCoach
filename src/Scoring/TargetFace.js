import React, { Component } from 'react';
import { Stage, Layer, Circle, Rect, Text, Group } from 'react-konva';
import Konva from 'konva';

import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import NavigationArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import NavigationArrowDropUp from 'material-ui/svg-icons/navigation/arrow-drop-up';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import { throttle } from 'lodash';
import { POINT_CONVERSION_HYBRID } from 'constants';

class ArrowPointBar extends React.Component {

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
                width: '100%'
            },
            arrowPointPresenterContainer:{
                backgroundColor: 'white',
                paddingTop: 10,

            },
            arrowPointPresenter: {
                marginLeft: '5px'
            },
            navArrowDropUpDownButton:{
                float: 'right',
                marginRight: '10px'
            }
        };

        return (
        <div style={styles.arrowPointBarContainer}>
            {this.state.isOpened && 
            <div style={styles.arrowPointPresenterContainer} >
                {this.props.points.map((arrowPoint, idx) => 
                    <Avatar style={styles.arrowPointPresenter} onClick={() => this.props.onArrowPointSelected(arrowPoint)} key={idx}>{arrowPoint.xPos}</Avatar>
                )}
            </div>
            }
            <RaisedButton style={styles.navArrowDropUpDownButton} onClick={() => this.setState({isOpened: !this.state.isOpened})} icon={this.state.isOpened ? <NavigationArrowDropUp /> : <NavigationArrowDropDown />} />
        </div>);
    }
}



class ArrowPoint extends React.Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    //not sure do i need that. The point is so small it's hard to click it
    handleClick(e) {
        this.props.handlePointChanged({...this.props.point, isEditMode: !this.props.point.isEditMode}, this.props.pointIndex);
    };

    handlePointGroupDragEnd = (e) => {
        let newPoint = {
            xPos: this.props.point.xPos + e.target.x(),
            yPos: this.props.point.yPos + e.target.y(),
            isEditMode: !this.props.point.isEditMode
        };

        this.props.handlePointChanged(newPoint, this.props.pointIndex);
    }

    handlePointDragEnd = (e) => {
        let newPoint = {
            xPos: e.target.x(),
            yPos: e.target.y(),
            isEditMode: !this.props.point.isEditMode
        };

        this.props.handlePointChanged(newPoint, this.props.pointIndex);
    }

    getEditModeView() {
        return (
            <Group ref={(node) => this.groupNode = node }
            draggable={true} onDragEnd={(e) => this.handlePointGroupDragEnd(e)}>
                <Circle
                    x={this.props.point.xPos}
                    y={this.props.point.yPos}
                    radius={30}
                    stroke={'yellow'}
                    fill={'rgba(255, 0, 0, 0.4)'}
                    strokeWidth={2} />
                <Circle
                    ref={(node) => this.pointNode = node }
                    x={this.props.point.xPos}
                    y={this.props.point.yPos}
                    radius={5}
                    fill={'grey'}
                    stroke={'grey'}
                    strokeWidth={1}
                    onClick={this.handleClick} />
            </Group>);
    }

    getNotEditModeView() {
        return (
            <Group>
                <Circle
                    x={this.props.point.xPos}
                    y={this.props.point.yPos}
                    radius={5}
                    fill={'grey'}
                    stroke={'grey'}
                    strokeWidth={1}
                    onClick={this.handleClick} />
            </Group>);
    }

    render() {
        return (
            this.props.point ?
                this.props.point.isEditMode ?
                    this.getEditModeView()
                    : this.getNotEditModeView()
                : ''
        );
    }
}

export default class TargetFace extends Component {

    constructor(props) {
        super(props);
        this.state = {
            targetFace: this.getTargetFace(),
            points: [{ xPos: 100, yPos: 100 }, { xPos: 200, yPos: 100 }],
            width: 50,
            height: 50,
            scale: {
                x: 1,
                y: 1
            }
        };

        this.scaleStage = this.scaleStage.bind(this);
        this.handleStageElementClicked = this.handleStageElementClicked.bind(this);
        this.handlePointChanged = this.handlePointChanged.bind(this);

        this.handleArrowPointBarSelected = this.handleArrowPointBarSelected.bind(this);
        this.handleAddNewArrowPoint = this.handleAddNewArrowPoint.bind(this);
        this.resize = this.resize.bind(this);
    }

    getTargetFace() {
        return {
            paperSize: {
                width: 1000,
                height: 2500,
            },
            targets: [
                [
                    { backgroundColor: 'white', lineColour: 'black', lineWidth: 2, xPos: 500, yPos: 500, radius: 998 / 2, },
                    { backgroundColor: 'white', lineColour: 'black', lineWidth: 2, xPos: 500, yPos: 500, radius: 898 / 2, },
                    { backgroundColor: 'black', lineColour: 'black', lineWidth: 2, xPos: 500, yPos: 500, radius: 798 / 2, },
                    { backgroundColor: 'black', lineColour: 'white', lineWidth: 2, xPos: 500, yPos: 500, radius: 698 / 2, },
                    { backgroundColor: 'blue', lineColour: 'blue', lineWidth: 2, xPos: 500, yPos: 500, radius: 598 / 2, },
                    { backgroundColor: 'blue', lineColour: 'black', lineWidth: 2, xPos: 500, yPos: 500, radius: 498 / 2, },
                    { backgroundColor: 'red', lineColour: 'black', lineWidth: 2, xPos: 500, yPos: 500, radius: 398 / 2, },
                    { backgroundColor: 'red', lineColour: 'black', lineWidth: 2, xPos: 500, yPos: 500, radius: 298 / 2, },
                    { backgroundColor: 'yellow', lineColour: 'black', lineWidth: 2, xPos: 500, yPos: 500, radius: 198 / 2, },
                    { backgroundColor: 'yellow', lineColour: 'black', lineWidth: 2, xPos: 500, yPos: 500, radius: 98 / 2, },
                    { backgroundColor: 'yellow', lineColour: 'black', lineWidth: 2, xPos: 500, yPos: 500, radius: 98 / 4, },
                ],
                [
                    { backgroundColor: 'white', lineColour: 'black', lineWidth: 2, xPos: 500, yPos: 1500, radius: 998 / 2, },
                    { backgroundColor: 'white', lineColour: 'black', lineWidth: 2, xPos: 500, yPos: 1500, radius: 898 / 2, },
                    { backgroundColor: 'black', lineColour: 'black', lineWidth: 2, xPos: 500, yPos: 1500, radius: 798 / 2, },
                    { backgroundColor: 'black', lineColour: 'white', lineWidth: 2, xPos: 500, yPos: 1500, radius: 698 / 2, },
                    { backgroundColor: 'blue', lineColour: 'blue', lineWidth: 2, xPos: 500, yPos: 1500, radius: 598 / 2, },
                    { backgroundColor: 'blue', lineColour: 'black', lineWidth: 2, xPos: 500, yPos: 1500, radius: 498 / 2, },
                    { backgroundColor: 'red', lineColour: 'black', lineWidth: 2, xPos: 500, yPos: 1500, radius: 398 / 2, },
                    { backgroundColor: 'red', lineColour: 'black', lineWidth: 2, xPos: 500, yPos: 1500, radius: 298 / 2, },
                    { backgroundColor: 'yellow', lineColour: 'black', lineWidth: 2, xPos: 500, yPos: 1500, radius: 198 / 2, },
                    { backgroundColor: 'yellow', lineColour: 'black', lineWidth: 2, xPos: 500, yPos: 1500, radius: 98 / 2, },
                    { backgroundColor: 'yellow', lineColour: 'black', lineWidth: 2, xPos: 500, yPos: 1500, radius: 98 / 4, },
                ]
            ]
        };
    }

    addNewArrowPoint(xPos, yPos){        
        this.state.points.push({
            xPos: xPos,
            yPos: yPos
        });

        this.setState({ points: this.state.points });
    }

    scaleStage(amount) {
        let newScale = { x: this.state.scale.x + amount, y: this.state.scale.y + amount };
        this.setState({ scale: newScale });
    }


    componentDidMount() {
        this.resize();
        window.addEventListener('resize', this.resize);
      }
      
    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }
        
    resize() {
        this.setState({ width: window.innerWidth, height: window.innerHeight - 80 });
    }


    handleArrowPointBarSelected(point){
        point.isEditMode = !point.isEditMode;
        this.setState({points: this.state.points}); 
    }

    handleAddNewArrowPoint(){
        this.addNewArrowPoint(0, 0);
    }

    handleStageElementClicked(e) {
        this.addNewArrowPoint(e.target.x(), e.target.y());
    }
    
    handlePointChanged(point, index) {
        this.state.points[index] = point;
        this.setState({ points: this.state.points });
    }


    render() {

        const styles = {            
            margin: 0,
            top: 'auto',
            right: 20,
            bottom: 20,
            left: 'auto',
            position: 'fixed'
        }
        return (

            <div>
                <Stage draggable={true}
                    onClick={this.handleStageElementClicked}
                    scale={this.state.scale}
                    height={this.state.height}
                    width={this.state.width}>
                    <Layer>
                    <Group>
                        <Rect
                            x={-10}
                            y={-10}
                            width={this.state.targetFace.paperSize.width + 20}
                            height={this.state.targetFace.paperSize.height + 20}
                            fill={'white'}
                            shadowBlur={20}
                        />
                    </Group>
                    {this.state.targetFace.targets.map(((target, index) =>
                        <Group key={index}>
                            {target.map((targetRing, idx) =>
                                <Circle key={idx}
                                    x={targetRing.xPos}
                                    y={targetRing.yPos}
                                    onClick={this.handleStageElementClicked}
                                    radius={targetRing.radius}
                                    fill={targetRing.backgroundColor}
                                    stroke={targetRing.lineColour}
                                    strokeWidth={targetRing.lineWidth} />
                            )}
                        </Group>
                    ))}
                    {this.state.points.map((point, index) => <ArrowPoint key={index} point={point} pointIndex={index} handlePointChanged={this.handlePointChanged} />)}

                    </Layer>
                </Stage>
                <div style={styles}>
                    <FloatingActionButton mini={true} onClick={() => this.scaleStage(-0.1)}>
                        <ContentRemove />
                    </FloatingActionButton>
                    <FloatingActionButton mini={true} onClick={() => this.scaleStage(0.1)}>
                        <ContentAdd />
                    </FloatingActionButton>
                    <FloatingActionButton secondary={true} mini={true} onClick={this.handleAddNewArrowPoint}>
                        <ContentAdd />
                    </FloatingActionButton>
                </div>
                <ArrowPointBar points={this.state.points} onArrowPointSelected={this.handleArrowPointBarSelected} />
            </div>
        );
    }
}