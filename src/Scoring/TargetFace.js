import React, { Component } from 'react';
import Konva from 'konva';
import { Stage, Layer, Circle, Rect, Text, Group } from 'react-konva';

import ArrowPoint from './ArrowPoint';
import ArrowPointBar from './ArrowPointBar';
import ArrowNumberSelectorBar from './ArrowNumberSelectorBar';
import TargetFaceControlBar from './TargetFaceControlBar';
import { getArrowPointWithValues } from './TargetFacePointDetection';


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
            availableArrowNumbers: [1, 2, 3, 4, 5, 7, 12, 34, 13, 123, 1234, 42],
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
            isEditMode: true
        };

        this.state.points.push(getArrowPointWithValues(this.state.targetFace, newArrowPoint));
        this.setState({ points: this.state.points });
    }

    scaleStage(amount) {
        let newScale = { x: this.state.scale.x + amount, y: this.state.scale.y + amount };
        this.setState({ scale: newScale });
    }

    handleArrowPointBarSelected(point) {
        point.isEditMode = !point.isEditMode;
        this.setState({ points: this.state.points });
    }

    handleAddNewArrowPoint() {
        let stageX = (this.stageNode._stage.attrs.x || 0);
        let stageY = (this.stageNode._stage.attrs.y || 0);
        let scaleX = (this.stageNode._stage.attrs.scaleX || 1);
        let scaleY = (this.stageNode._stage.attrs.scaleY || 1);
        let widthMiddle = ((this.state.width / 2) - stageX) / scaleX;
        let heightMiddle = ((this.state.height / 2) - stageY) / scaleY;
        this.addNewArrowPoint(widthMiddle, heightMiddle);
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
                    ref={node => this.stageNode = node}>
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
                <TargetFaceControlBar scaleStage={this.scaleStage} handleAddNewArrowPoint={this.handleAddNewArrowPoint} scale={this.state.scale} />
                <ArrowPointBar points={this.state.points} onArrowPointSelected={this.handleArrowPointBarSelected} />
                <ArrowNumberSelectorBar availableArrowNumbers={this.state.availableArrowNumbers} arrowPointsSelectedIndex={this.state.arrowPointsSelectedIndex} handleArrowNumberSelected={this.handleArrowNumberSelected} />
            </div>
        );
    }
}