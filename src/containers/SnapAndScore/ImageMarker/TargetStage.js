import React from 'react';
import { Stage } from 'react-konva'

export default class TargetStage extends React.Component {
  constructor(props) {
    super(props);

    this.handleOnWheel = this.handleOnWheel.bind(this);
    this.handleOnTouchMove = this.handleOnTouchMove.bind(this);
    this.handleOnTouchEnd = this.handleOnTouchEnd.bind(this);
  }

  handleOnWheel(_) {
    let e = _.evt;
    e.preventDefault();

    var scaleBy = 1.01;
    let stage = this.stageRef._stage;
    let oldScale = stage.scaleX();

    let newScale = e.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    let mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
    };
    let newPos = {
      x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
      y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale
    };
    stage.position(newPos);
    stage.batchDraw();

    this.props.onScaleChange({ x: newScale, y: newScale });
  }

  handleOnTouchMove(e) {
    let evt = e.evt;
    let touch1 = evt.touches[0];
    let touch2 = evt.touches[1];


    let stage = this.stageRef._stage;
    let xScale = stage.scaleX();

    if (touch1 && touch2 && xScale) {
      let dist = this.getDistance({
        x: touch1.clientX,
        y: touch1.clientY
      }, {
          x: touch2.clientX,
          y: touch2.clientY
        });

      if (!this.lastDist) {
        this.lastDist = dist;
      }

      let scale = this.createWindowScale(xScale * dist / this.lastDist);
      this.lastDist = dist; 
      this.props.onScaleChange(scale);
    }
  }

  getDistance(p1, p2) {
    return Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2));
  }

  createWindowScale(scale) {
    return { x: scale, y: scale };
  }

  handleOnTouchEnd() {
    this.lastDist = 0;
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
