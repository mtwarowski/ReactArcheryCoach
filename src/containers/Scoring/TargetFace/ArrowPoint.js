import React, { Component } from 'react';
import { Circle, Group } from 'react-konva';

const fillColor = '#A9A9A9';
const strokeColor = '#A9A9A9';

export default class ArrowPoint extends Component {
    

    getEditModeView = () => {
        const arrowPointStrokeWidth = this.props.point.lineWidth || 1;
        const arrowPointRadius = this.props.point.radius || 6;
        const arrowPointTotalRadius = arrowPointRadius + (arrowPointStrokeWidth / 2);
        const movePadStrokeWidth = arrowPointTotalRadius * 4;
        return (
            <Group ref={(node) => this.groupNode = node}
                draggable={true}
                onDragEnd={(e) => this.props.handlePointChanged({
                    ...this.props.point,
                    xPos: e.target.x(),
                    yPos: e.target.y(),
                    isEditMode: !this.props.point.isEditMode
                }, this.props.pointIndex)}>
                <Circle
                    draggable={true}
                    x={this.props.point.xPos}
                    y={this.props.point.yPos}
                    radius={arrowPointTotalRadius}
                    stroke={'rgba(255, 255, 0, 0.5)'}
                    fill={fillColor}
                    strokeWidth={movePadStrokeWidth} />
            </Group>);
    }
    
    getNotEditModeView = () => {
        const arrowPointStrokeWidth = this.props.point.lineWidth || 1;
        const arrowPointRadius = this.props.point.radius || 6;
        return (
            <Group>
                <Circle
                    x={this.props.point.xPos}
                    y={this.props.point.yPos}
                    radius={arrowPointRadius}
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth={arrowPointStrokeWidth}
                    onClick={() => this.props.handlePointChanged({ ...this.props.point, isEditMode: !this.props.point.isEditMode }, this.props.pointIndex)} />
            </Group>);
    }

    render(){
        
    return (
        this.props.point ?
            this.props.point.isEditMode ?
                this.getEditModeView()
                : this.getNotEditModeView()
            : ''
    );
}
}


