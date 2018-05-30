import React, { Component } from 'react';
import { Stage, Layer, Circle, Rect, Text, Group } from 'react-konva';
import Konva from 'konva';

import ArrowPoint from './ArrowPoint';
import ArrowPointBar from './ArrowPointBar';
import TargetFaceControlBar from './TargetFaceControlBar';
import { getArrowPointWithValues } from './TargetFacePointDetection';

import SelectField from 'material-ui/SelectField';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

export default class TargetFace extends Component {

    constructor(props) {
        super(props);
        this.state = {
            targetFace: this.getTargetFace(),
            points: [{ xPos: 100, yPos: 100, radius: 6, lineWidth: 1 }, { xPos: 200, yPos: 100, radius: 6, lineWidth: 1 }],
            width: 0,
            height: 0,
            scale: {
                x: 1,
                y: 1
            },
            availableArrowNumbers: [1, 2, 3, 4, 5, 7, 12, 34],
            arrowPointsSelectedIndex: null
        };

        this.scaleStage = this.scaleStage.bind(this);
        this.handleStageElementClicked = this.handleStageElementClicked.bind(this);
        this.handlePointChanged = this.handlePointChanged.bind(this);

        this.handleArrowPointBarSelected = this.handleArrowPointBarSelected.bind(this);
        this.handleAddNewArrowPoint = this.handleAddNewArrowPoint.bind(this);
        this.handleArrowNumberSelected = this.handleArrowNumberSelected.bind(this);
        this.resize = this.resize.bind(this);
    }

    getTargetFace() {
        return {
            paper: {
                x: -10,
                y: -10,
                width: 1020,
                height: 1020,
            },
            targets: [
                [
                    { backgroundColor: 'white', lineColour: 'black', lineWidth: 2, xPos: 500, yPos: 500, radius: 998 / 2, displayValue: '1', value: 1 },
                    { backgroundColor: 'white', lineColour: 'black', lineWidth: 2, xPos: 500, yPos: 500, radius: 898 / 2, displayValue: '2', value: 2 },
                    { backgroundColor: 'black', lineColour: 'black', lineWidth: 2, xPos: 500, yPos: 500, radius: 798 / 2, displayValue: '3', value: 3 },
                    { backgroundColor: 'black', lineColour: 'white', lineWidth: 2, xPos: 500, yPos: 500, radius: 698 / 2, displayValue: '4', value: 4 },
                    { backgroundColor: 'blue', lineColour: 'blue', lineWidth: 2, xPos: 500, yPos: 500, radius: 598 / 2, displayValue: '5', value: 5 },
                    { backgroundColor: 'blue', lineColour: 'black', lineWidth: 2, xPos: 500, yPos: 500, radius: 498 / 2, displayValue: '6', value: 6 },
                    { backgroundColor: 'red', lineColour: 'black', lineWidth: 2, xPos: 500, yPos: 500, radius: 398 / 2, displayValue: '7', value: 7 },
                    { backgroundColor: 'red', lineColour: 'black', lineWidth: 2, xPos: 500, yPos: 500, radius: 298 / 2, displayValue: '8', value: 8 },
                    { backgroundColor: 'yellow', lineColour: 'black', lineWidth: 2, xPos: 500, yPos: 500, radius: 198 / 2, displayValue: '9', value: 9 },
                    { backgroundColor: 'yellow', lineColour: 'black', lineWidth: 2, xPos: 500, yPos: 500, radius: 98 / 2, displayValue: '10', value: 10 },
                    { backgroundColor: 'yellow', lineColour: 'black', lineWidth: 2, xPos: 500, yPos: 500, radius: 98 / 4, displayValue: 'X', value: 10 },
                ],
                // [
                //     { backgroundColor: 'white', lineColour: 'black', lineWidth: 2, xPos: 500, yPos: 1500, radius: 998 / 2, },
                //     { backgroundColor: 'white', lineColour: 'black', lineWidth: 2, xPos: 500, yPos: 1500, radius: 898 / 2, },
                //     { backgroundColor: 'black', lineColour: 'black', lineWidth: 2, xPos: 500, yPos: 1500, radius: 798 / 2, },
                //     { backgroundColor: 'black', lineColour: 'white', lineWidth: 2, xPos: 500, yPos: 1500, radius: 698 / 2, },
                //     { backgroundColor: 'blue', lineColour: 'blue', lineWidth: 2, xPos: 500, yPos: 1500, radius: 598 / 2, },
                //     { backgroundColor: 'blue', lineColour: 'black', lineWidth: 2, xPos: 500, yPos: 1500, radius: 498 / 2, },
                //     { backgroundColor: 'red', lineColour: 'black', lineWidth: 2, xPos: 500, yPos: 1500, radius: 398 / 2, },
                //     { backgroundColor: 'red', lineColour: 'black', lineWidth: 2, xPos: 500, yPos: 1500, radius: 298 / 2, },
                //     { backgroundColor: 'yellow', lineColour: 'black', lineWidth: 2, xPos: 500, yPos: 1500, radius: 198 / 2, },
                //     { backgroundColor: 'yellow', lineColour: 'black', lineWidth: 2, xPos: 500, yPos: 1500, radius: 98 / 2, },
                //     { backgroundColor: 'yellow', lineColour: 'black', lineWidth: 2, xPos: 500, yPos: 1500, radius: 98 / 4, },
                // ]
            ]
        };
    }

    addNewArrowPoint(xPos, yPos) {
        let newArrowPoint = {
            xPos: xPos,
            yPos: yPos,
            radius: 12,
            lineWidth: 1,
        };

        this.state.points.push(getArrowPointWithValues(this.state.targetFace, newArrowPoint));
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
        this.setState({ width: window.innerWidth, height: window.innerHeight - 60 });
    }

    handleArrowPointBarSelected(point) {
        point.isEditMode = !point.isEditMode;
        this.setState({ points: this.state.points });
    }

    handleAddNewArrowPoint() {
        this.addNewArrowPoint(0, 0);
    }

    handleStageElementClicked(e) {
        this.addNewArrowPoint(e.target.x(), e.target.y());
    }

    handlePointChanged(point, index) {
        this.state.points[index] = getArrowPointWithValues(this.state.targetFace, point);
        this.setState({ 
            points: this.state.points, 
            arrowPointsSelectedIndex: point.isEditMode ? null : index
        });
    }

    handleArrowNumberSelected(arrowNo) {
        if(!this.state.arrowPointsSelectedIndex && this.state.arrowPointsSelectedIndex !== 0){
            return;
        }

        this.state.points[this.state.arrowPointsSelectedIndex] = { ...this.state.points[this.state.arrowPointsSelectedIndex], arrowNo };
        this.setState({ arrowPointsSelectedIndex: null, points: this.state.points });
    }

    render() {


        return (
            <div>
                <Stage draggable={true}
                    onClick={this.handleStageElementClicked}
                    scale={this.state.scale}
                    height={this.state.height}
                    width={this.state.width}
                    ref={node => this.stageNode = node}
                >
                    <Layer>
                        <Group>
                            <Rect
                                x={this.state.targetFace.paper.x}
                                y={this.state.targetFace.paper.y}
                                width={this.state.targetFace.paper.width}
                                height={this.state.targetFace.paper.height}
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
                <TargetFaceControlBar scaleStage={this.scaleStage} handleAddNewArrowPoint={this.handleAddNewArrowPoint} />
                <ArrowPointBar points={this.state.points} onArrowPointSelected={this.handleArrowPointBarSelected} />
                <ArrowNumberSelectorBar availableArrowNumbers={this.state.availableArrowNumbers} arrowPointsSelectedIndex={this.state.arrowPointsSelectedIndex} handleArrowNumberSelected={this.handleArrowNumberSelected} />
            </div>
        );
    }
}


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

    return (
        arrowPointsSelectedIndex || arrowPointsSelectedIndex === 0 ?
            <div style={arrowNumberSelectorBarStyles}>
                <Paper style={paperStyles}>
                    <Menu>
                        {availableArrowNumbers.map(x => <MenuItem  key={x} onClick={() => handleArrowNumberSelected(x)} primaryText={'Arrow No: ' + x} />)}
                        <MenuItem onClick={() => handleArrowNumberSelected(null)} primaryText={'Cancel'} />
                    </Menu>
                </Paper>
            </div> : '');
}