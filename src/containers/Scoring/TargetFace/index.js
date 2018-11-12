import React, { Component } from 'react'

import { Layer, Circle, Rect, Group } from 'react-konva'

import ArrowPoint from './ArrowPoint'
import ArrowPointBar from './EndPointBar'
import ArrowNumberSelectorBar from './ArrowNumberSelectorBar'
import TargetFaceControlBar from './TargetFaceControlBar'
import { getArrowPointWithValues } from './TargetFacePointDetection'

import TargetStage from '../../SnapAndScore/ImageMarker/TargetStage'

export class TargetFace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0, height: 0, scale: { x: 1, y: 1 }, xOffset: 0, yOffset: 0,
            arrowPointsSelectedIndex: null
        };

        this.scaleStage = this.scaleStage.bind(this);
        this.handleStageElementClicked = this.handleStageElementClicked.bind(this);
        this.handlePointChanged = this.handlePointChanged.bind(this);

        this.handleArrowPointBarSelected = this.handleArrowPointBarSelected.bind(this);
        this.handleArrowPointBarRemove = this.handleArrowPointBarRemove.bind(this);
        this.handleAddNewArrowPoint = this.handleAddNewArrowPoint.bind(this);
        this.handleArrowNumberSelected = this.handleArrowNumberSelected.bind(this);
        this.resize = this.resize.bind(this);
    }

    componentDidMount() {
        this.resize();
        window.addEventListener('resize', this.resize);
        this.defaultScale();
    }

    defaultScale() {
        let windowWidth = window.innerWidth,
            viewWidth = this.props.targetFace.paper.width;

        let scale = windowWidth / viewWidth;
        this.setState({ scale: { x: scale, y: scale } })
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }

    resize() {
        this.setState({ width: window.innerWidth, height: window.innerHeight - 60 });
    }

    getAvailableArrowNumbers() {
        if (!this.props.arrowsSet) {
            return undefined;
        }

        return this.props.arrowsSet.labels.filter((label) => this.isNotInCurrentPoints(label));
    }

    canAddNewPoint() {
        return !this.props.arrowsSet || this.props.arrowsSet.labels.length > this.props.end.length
    }

    isNotInCurrentPoints(label) {
        for (let pointIndex = 0; pointIndex < this.props.end.length; pointIndex++) {
            const point = this.props.end[pointIndex];

            if (point.arrowNo === label) {
                return false;
            }
        }
        return true;
    }

    addNewArrowPoint(xPos, yPos) {
        const defaultArrowLineWidth = 0.1;
        if (!this.canAddNewPoint()) {
            return;
        }

        let newArrowPoint = {
            xPos: xPos,
            yPos: yPos,
            radius: (this.props.arrowsSet.diameterInMm / 2 / 10) - defaultArrowLineWidth / 2, //since it's in mm and out target is measured in cm - stroke 1/2 
            lineWidth: defaultArrowLineWidth,
            isEditMode: true
        };

        let newEnd = this.props.end.slice(0);
        newEnd.push(getArrowPointWithValues(this.props.targetFace, newArrowPoint));
        this.props.onEndChanged(newEnd);
    }

    scaleStage(amount) {
        let newScale = { x: this.state.scale.x + amount, y: this.state.scale.y + amount };
        this.setState({ scale: newScale });
        this.props.onEndChanged(this.props.end);
    }

    handleArrowPointBarSelected(point) {
        let newEnd = this.props.end.slice(0);
        point.isEditMode = !point.isEditMode;
        this.props.onEndChanged(newEnd);
    }

    handleArrowPointBarRemove(point) {
        let newEnd = this.props.end.slice(0);
        newEnd = newEnd.filter(x => x !== point);
        this.props.onEndChanged(newEnd);
    }

    handleAddNewArrowPoint() {
        let stageX = (this.state.xOffset || 0);
        let stageY = (this.state.yOffset || 0);
        let scaleX = (this.state.scale.x || 1);
        let scaleY = (this.state.scale.y || 1);
        let widthMiddle = ((this.state.width / 2) - stageX) / scaleX;
        let heightMiddle = ((this.state.height / 2) - stageY) / scaleY;
        this.addNewArrowPoint(widthMiddle, heightMiddle);
    }

    handleStageElementClicked(e) {
        this.addNewArrowPoint(e.target.x(), e.target.y());
    }

    handlePointChanged(point, index) {
        let newEnd = this.props.end.slice(0);
        newEnd[index] = getArrowPointWithValues(this.props.targetFace, point);
        this.setState({
            arrowPointsSelectedIndex: point.isEditMode ? null : index
        }, () => this.props.onEndChanged(newEnd));
    }

    handleArrowNumberSelected(arrowNo) {
        if (!this.state.arrowPointsSelectedIndex && this.state.arrowPointsSelectedIndex !== 0) {
            return;
        }
        let newEnd = this.props.end.slice(0);
        newEnd[this.state.arrowPointsSelectedIndex] = { ...newEnd[this.state.arrowPointsSelectedIndex], arrowNo };
        this.setState({ arrowPointsSelectedIndex: null }, () => this.props.onEndChanged(newEnd));
    }

    orderTargetRingsByRadius(targetRings) {
        return targetRings.sort((a, b) => {
            if (a.radius < b.radius) return 1;
            if (a.radius > b.radius) return -1;
            if (a.radius === undefined) return -1;
            if (b.radius === undefined) return 1;
            return 0;
        });
    }

    render() {
        return (this.props.targetFace ?
            <div>
                <TargetStage width={this.state.width} height={this.state.height} scale={this.state.scale}
                    onScaleChange={(scale) => this.setState({ scale: scale })}
                    onOffsetChange={(e) => this.setState({ xOffset: e.xOffset, yOffset: e.yOffset })}>
                    <Layer>
                        <Group>
                            <Rect
                                x={this.props.targetFace.paper.xPos}
                                y={this.props.targetFace.paper.yPos}
                                width={this.props.targetFace.paper.width}
                                height={this.props.targetFace.paper.height}
                                fill={'white'}
                                shadowBlur={20}
                            />
                        </Group>
                        {this.props.targetFace.targets.map(((target, index) =>
                            <Group key={index}>
                                {this.orderTargetRingsByRadius(target).map((targetRing, idx) =>
                                    <Circle key={idx}
                                        x={targetRing.xPos}
                                        y={targetRing.yPos}
                                        radius={targetRing.radius}
                                        fill={targetRing.backgroundColor}
                                        stroke={targetRing.lineColor}
                                        strokeWidth={targetRing.lineWidth} />
                                )}
                            </Group>
                        ))}
                        {this.props.end.map((point, index) => {
                            return <ArrowPoint key={index} point={point} pointIndex={"" + index} handlePointChanged={(p, i) => this.handlePointChanged(p, index)} />
                        })}
                    </Layer>
                </TargetStage>
                <TargetFaceControlBar scaleStage={this.scaleStage} handleAddNewArrowPoint={this.handleAddNewArrowPoint} scale={this.state.scale} handleSaveButtonPress={this.props.onSaveEnd} showSaveButton={this.props.end.length === this.props.round.arrowsPairEnd} />
                <ArrowPointBar points={this.props.end} onArrowPointSelected={this.handleArrowPointBarSelected} onArrowPointRemove={this.handleArrowPointBarRemove} />
                {this.props.withArrowNumbers && <ArrowNumberSelectorBar availableArrowNumbers={this.getAvailableArrowNumbers()} arrowPointsSelectedIndex={this.state.arrowPointsSelectedIndex} handleArrowNumberSelected={this.handleArrowNumberSelected} />}
            </div>
            : 'Select target that you want to shoot.'
        );
    }
}

export default TargetFace;