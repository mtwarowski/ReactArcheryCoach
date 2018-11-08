import React from 'react';
import { Stage } from 'react-konva'

export default class TargetStage extends React.Component {
    constructor(props) {
        super(props);

        this.lastDist = 0;
        this.handleOnWheel = this.handleOnWheel.bind(this);
        this.handleOnTouchEndWithOnScaleChange = this.handleOnTouchEndWithOnScaleChange.bind(this);
    }

    componentDidMount() {
        if (this.props.scale) {
            this.scaleWindow(this.props.scale.x);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.scale !== prevProps.scale) {
            this.scaleWindow(this.props.scale.x);
        }
    }

    handleOnWheel(_) {
        let e = _.evt;
        e.preventDefault();

        var scaleBy = 1.05;
        let stage = this.stageRef._stage;
        let oldScale = stage.scaleX();

        let newScale = e.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;

        this.newPointingPosition(stage, stage.getPointerPosition().x, stage.getPointerPosition().y, newScale);
        this.scaleWindow(newScale);
        this.props.onScaleChange({ x: newScale, y: newScale });
    }

    handleOnTouchEndWithOnScaleChange() {
        let stage = this.stageRef._stage;
        if (stage) {
            stage.lastDist = 0;
            this.props.onScaleChange({ x: stage.getScaleX(), y: stage.getScaleY() });
        }
    }


    getDistance(p1, p2) {
        return Math.sqrt(Math.pow((p2.clientX - p1.clientX), 2) + Math.pow((p2.clientY - p1.clientY), 2));
    }

    newPointingPosition(stage, clientX, clientY, newScale) {
        let oldScale = stage.scaleX();
        let mousePointTo = {
            x: clientX / oldScale - stage.x() / oldScale,
            y: clientY / oldScale - stage.y() / oldScale,
        };
        let newPos = {
            x: -(mousePointTo.x - clientX / newScale) * newScale,
            y: -(mousePointTo.y - clientY / newScale) * newScale,
        };

        stage.position(newPos);
        stage.batchDraw();
    }

    scaleWindow(scale) {
        let stage = this.stageRef._stage;
        if (stage) {
            stage.scaleX(scale);
            stage.scaleY(scale);
            stage.draw();
        }
    }

    render() {
        return <Stage draggable={true}
            height={this.props.height}
            width={this.props.width}
            onWheel={this.handleOnWheel}
            onTouchEnd={this.handleOnTouchEndWithOnScaleChange}
            onDragEnd={(e) => this.props.onOffsetChange({ xOffset: e.target.attrs.x, yOffset: e.target.attrs.y })}
            ref={ref => {
                this.stageRef = ref;

                if (ref) {
                    var stage = ref._stage;

                    if (stage) {
                        var touchMoveEventName = 'touchmove';
                        var content = stage.getContent();
                        stage.lastDist = 0;

                        if (content && !content.hasTouchMoveEventListener) {
                            content.addEventListener(touchMoveEventName, function (evt) {
                                var touch1 = evt.touches[0];
                                var touch2 = evt.touches[1];
                                if (touch1 && touch2) {
                                    var dist = Math.sqrt(Math.pow((touch2.clientX - touch1.clientX), 2) + Math.pow((touch2.clientY - touch1.clientY), 2));

                                    if (!stage.lastDist) {
                                        stage.lastDist = dist;
                                    }

                                    var scale = stage.getScaleX() * dist / stage.lastDist;

                                    if (!scale) {
                                        scale = stage.getScaleX();
                                    }

                                    stage.scaleX(scale);
                                    stage.scaleY(scale);
                                    stage.draw();
                                    stage.lastDist = dist;
                                }
                            }, false);

                            content.hasTouchMoveEventListener = true;

                        }
                    }
                }
            }}>
            {this.props.children}
        </Stage>
    }
}
