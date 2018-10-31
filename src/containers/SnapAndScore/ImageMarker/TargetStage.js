import React from 'react';
import { Stage } from 'react-konva'

export default class TargetStage extends React.Component {
    constructor(props) {
        super(props);

        this.lastDist = 0;
        this.scale = 1;
        this.handleOnWheel = this.handleOnWheel.bind(this);
        this.handleOnTouchMove = this.handleOnTouchMove.bind(this);
        this.handleOnTouchEnd = this.handleOnTouchEnd.bind(this);
    }

    componentDidMount() {
        if (this.props.scale) {
            this.scale = this.props.scale.x;
        }
    }

    componentDidUpdate(prevProps, prevState) {        
        if (this.props.scale !== prevProps.scale) {
            this.scale = this.props.scale.x;
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
    }

    handleOnTouchMove(e) {
        let evt = e.evt;
        evt.preventDefault();
        let touch1 = evt.touches[0];
        let touch2 = evt.touches[1];

        if (touch1 && touch2) {
            let stage = this.stageRef._stage;
            let xScale = stage.scaleX();
            let dist = this.getDistance(touch1, touch2);
            if (!this.lastDist) {
                this.lastDist = dist;
            }
            let newScale = xScale * dist / this.lastDist;
            this.lastDist = dist;

            this.newPointingPosition(stage, touch1.clientX, touch1.clientY, newScale);

            this.scale = newScale;            
            stage.scaleX(newScale);
            stage.scaleY(newScale);
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
        this.props.onScaleChange({ x: scale, y: scale });
    }

    handleOnTouchEnd() {
        this.lastDist = 0;
        this.scaleWindow(this.scale);
    }

    render() {
        return <Stage draggable={true}
            height={this.props.height}
            width={this.props.width}
            onWheel={this.handleOnWheel}
            onTouchMove={this.handleOnTouchMove}
            onTouchEnd={this.handleOnTouchEnd}
            scale={this.props.scale}
            onDragEnd={(e) => this.props.onOffsetChange({ xOffset: e.target.attrs.x, yOffset: e.target.attrs.y })}
            ref={ref => { this.stageRef = ref; }}>
            {this.props.children}
        </Stage>
    }
}
