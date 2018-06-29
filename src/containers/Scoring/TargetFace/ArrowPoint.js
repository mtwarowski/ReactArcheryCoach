import React, { Component } from 'react';
import { Stage, Layer, Circle, Rect, Text, Group } from 'react-konva';
import Konva from 'konva';

export default class ArrowPoint extends Component {
    getEditModeView = () => {
        const arrowPointStrokeWidth = this.props.point.lineWidth || 1;
        const arrowPointRadius = this.props.point.radius || 6;
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
                    radius={arrowPointRadius + (arrowPointStrokeWidth / 2)}
                    stroke={'rgba(255, 255, 0, 0.5)'}
                    fill={'grey'}
                    strokeWidth={50} />
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
                    fill={'grey'}
                    stroke={'grey'}
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


