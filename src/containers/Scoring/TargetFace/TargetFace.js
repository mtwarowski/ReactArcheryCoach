import React, { Component } from 'react';
import Konva from 'konva';
import { Stage, Layer, Circle, Rect, Text, Group } from 'react-konva';

import ArrowPoint from './ArrowPoint';
import ArrowPointBar from './ArrowPointBar';
import ArrowNumberSelectorBar from './ArrowNumberSelectorBar';
import TargetFaceControlBar from './TargetFaceControlBar';
import { getArrowPointWithValues } from './TargetFacePointDetection';

import { loadTargetFacesAsync, loadTargetFaceDetailsAsync } from '../../../actions/targetFaces'
import { loadDefaultArrowsAsync } from '../../../actions/equipment'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

export class TargetFace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            points: [],
            width: 0, height: 0, scale: { x: 1, y: 1 }, 
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
        this.props.loadTargetFaceDetailsAsync(123);
        this.props.loadDefaultArrowsAsync();
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
        return !this.props.arrowsSet || this.props.arrowsSet.labels.length > this.state.points.length
    }

    isNotInCurrentPoints(label) {
        for (let pointIndex = 0; pointIndex < this.state.points.length; pointIndex++) {
            const point = this.state.points[pointIndex];

            if (point.arrowNo == label) {
                return false;
            }
        }
        return true;
    }

    addNewArrowPoint(xPos, yPos) {
        if (!this.canAddNewPoint()) {
            return;
        }

        let newArrowPoint = {
            xPos: xPos,
            yPos: yPos,
            radius: 12,
            lineWidth: 1,
            isEditMode: true
        };

        this.state.points.push(getArrowPointWithValues(this.props.targetFace, newArrowPoint));
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
        this.state.points[index] = getArrowPointWithValues(this.props.targetFace, point);
        this.setState({
            points: this.state.points,
            arrowPointsSelectedIndex: point.isEditMode ? null : index
        });
    }

    handleArrowNumberSelected(arrowNo) {
        if (!this.state.arrowPointsSelectedIndex && this.state.arrowPointsSelectedIndex !== 0) {
            return;
        }

        this.state.points[this.state.arrowPointsSelectedIndex] = { ...this.state.points[this.state.arrowPointsSelectedIndex], arrowNo };
        this.setState({ arrowPointsSelectedIndex: null, points: this.state.points });
    }

    render() {
        return (this.props.targetFace ?
            <div>
                <Stage draggable={true}
                    //onClick={this.handleStageElementClicked}
                    scale={this.state.scale}
                    height={this.state.height}
                    width={this.state.width}
                    ref={node => this.stageNode = node}>
                    <Layer>
                        <Group>
                            <Rect
                                x={this.props.targetFace.paper.x}
                                y={this.props.targetFace.paper.y}
                                width={this.props.targetFace.paper.width}
                                height={this.props.targetFace.paper.height}
                                fill={'white'}
                                shadowBlur={20}
                            />
                        </Group>
                        {this.props.targetFace.targets.map(((target, index) =>
                            <Group key={index}>
                                {target.map((targetRing, idx) =>
                                    <Circle key={idx}
                                        x={targetRing.xPos}
                                        y={targetRing.yPos}
                                        radius={targetRing.radius}
                                        fill={targetRing.backgroundColor}
                                        stroke={targetRing.lineColour}
                                        strokeWidth={targetRing.lineWidth} />
                                )}
                            </Group>
                        ))}
                        {this.state.points.map((point, index) => {
                            return <ArrowPoint key={index} point={point} pointIndex={"" + index} handlePointChanged={(p, i) => this.handlePointChanged(p, index)} />
                        })}
                    </Layer>
                </Stage>
                <TargetFaceControlBar scaleStage={this.scaleStage} handleAddNewArrowPoint={this.handleAddNewArrowPoint} scale={this.state.scale} />
                <ArrowPointBar points={this.state.points} onArrowPointSelected={this.handleArrowPointBarSelected} />
                {this.props.arrowsSet && <ArrowNumberSelectorBar availableArrowNumbers={this.getAvailableArrowNumbers()} arrowPointsSelectedIndex={this.state.arrowPointsSelectedIndex} handleArrowNumberSelected={this.handleArrowNumberSelected} />}
            </div>
            : 'Select target that you want to shoot.'
        );
    }
}

const getArrowsSetFallback = () => {
    return { name: "fallback", labels: ["1", "2", "3", "4", "5", "6"] }
}

const mapStateToProps = (state, props) => {
    let newProps = {
        ...props,
        arrowsSet: state.arrows.default || getArrowsSetFallback(),
        targetFace: state.targetFaces.selected || undefined,
    }
    return newProps;
}

const mapDispatchToProps = dispatch => bindActionCreators({
    loadTargetFacesAsync,
    loadTargetFaceDetailsAsync,
    loadDefaultArrowsAsync,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TargetFace)
