import React, { Component } from 'react';
import { Stage, Layer, Circle, Rect, Text } from 'react-konva';
import Konva from 'konva';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';



class ArrowPoint extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isEditMode: true
        };

        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(e){
        
        this.setState({
            isEditMode: true
        });
    };
    
    handlePointDragEnd = (e, index) => {
        let newPoint  = {
            xPos: e.target.x(),
            yPos: e.target.y()
        };
        
        this.setState({
            isEditMode: false
        });
        this.props.handlePointChanged(newPoint, index);
    }

    getEditModeView(){
      return (
        <Layer>
            <Circle
                draggable={true}
                onDragEnd={(e) => this.handlePointDragEnd(e, this.props.pointIndex)}
                x={this.props.point.xPos}
                y={this.props.point.yPos}
                radius={30}
                stroke={'yellow'}
                fill={'rgba(255, 0, 0, 0.4)'}
                strokeWidth={2} /> 
            <Circle
                x={this.props.point.xPos}
                y={this.props.point.yPos}
                radius={5}
                fill={'grey'}
                stroke={'grey'}
                strokeWidth={1}
                onClick={this.handleClick} />
        </Layer>);
    }
    
    getNotEditModeView(){
        return (
            <Layer>
                <Circle
                    x={this.props.point.xPos}
                    y={this.props.point.yPos}
                    radius={5}
                    fill={'grey'}
                    stroke={'grey'}
                    strokeWidth={1}
                    onClick={this.handleClick} />
            </Layer>);
    }

    render() {
        return (
            this.props.point ? 
                this.state.isEditMode ? 
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
            width: 500,
            height: 500,
            scale: {
                x: 1,
                y: 1
            }
        };

        this.scaleStage = this.scaleStage.bind(this);
        this.addNewPoint = this.addNewPoint.bind(this);
        this.handlePointChanged = this.handlePointChanged.bind(this);
    }

    getTargetFace() {
        return {
            paperSize: {
                width: 1000,
                height: 1000,
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

    addNewPoint(e){
        this.state.points.push({
            xPos: e.target.x(),
            yPos: e.target.y()
        });

        this.setState({ points: this.state.points });
    }

    handlePointChanged(point, index){        
        this.state.points[index] = point;
        this.setState({ points: this.state.points });
    }

    scaleStage(amount) {
        let newScale = { x: this.state.scale.x + amount, y: this.state.scale.y + amount };
        this.setState({ scale: newScale });
    }

    render() {
        return (
            <div style={{width: '100%'}}>
                <div>
                    <FloatingActionButton mini={true} onClick={() => this.scaleStage(-0.1)}>
                        <ContentRemove />
                    </FloatingActionButton>
                    <FloatingActionButton mini={true} onClick={() => this.scaleStage(0.1)}>
                        <ContentAdd />
                    </FloatingActionButton>
                </div>
                <Stage draggable={true}
                    onClick={this.addNewPoint}
                    scale={this.state.scale}
                    height={this.state.height}
                    width={this.state.width}>
                    {this.state.targetFace.targets.map(((target, index) =>
                        <Layer key={index}>
                            {target.map((targetRing, idx) =>
                                <Circle key={idx}
                                    x={targetRing.xPos}
                                    y={targetRing.yPos}
                                    onClick={this.addNewPoint}
                                    radius={targetRing.radius}
                                    fill={targetRing.backgroundColor}
                                    stroke={targetRing.lineColour}
                                    strokeWidth={targetRing.lineWidth} />
                            )}
                        </Layer>
                    ))}


                    {this.state.points.map((point, index) => <ArrowPoint key={index} point={point} pointIndex={index} handlePointChanged={this.handlePointChanged} />)}
                </Stage>
            </div>
        );
    }
}