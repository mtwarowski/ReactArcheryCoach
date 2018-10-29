import React, { Component } from 'react';
import { Stage, Layer, Group, Image } from 'react-konva'

import { ImagePickerGraphical } from '../../../components/ImagePicker'
import TagPoint from './TagPoint'
import { TargetFaceHighlighterWithCircle, generateDefaultTagPoints } from './TargetFaceHighlighter'

class TargetStage extends React.Component {
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
    var oldScale = stage.scaleX();

    var newScale = e.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    var mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
    };
    var newPos = {
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

    if (touch1 && touch2) {
      var dist = this.getDistance({
        x: touch1.clientX,
        y: touch1.clientY
      }, {
          x: touch2.clientX,
          y: touch2.clientY
        });

      if (!this.state.lastDist) {
        this.setState({ lastDist: dist });
      }

      var scale = this.createWindowScale(this.state.scale.x * dist / this.state.lastDist);
      this.setState({ lastDist: dist });

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
    this.setState({ lastDist: 0 });
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

class ImageMarker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 0, height: 0, scale: { x: 1, y: 1 }, xOffset: 0, yOffset: 0,
      windowImage: new window.Image(),
      image: '',
      imageName: '',
      targetPoints: {},
      arrowPoints: [],

      steps: ['uploadPhoto', 'highlightTargetFace', 'tagArrowPoints', 'confirmSelectedValues', 'saveEverything'],
    };

    this.resize = this.resize.bind(this);
    this.handleOnImageSelected = this.handleOnImageSelected.bind(this);
    this.handleImageClicked = this.handleImageClicked.bind(this);
    this.handleArrowPointChanged = this.handleArrowPointChanged.bind(this);
  }


  componentDidMount() {
    this.resize();
    window.addEventListener('resize', this.resize);

    (function (context, windowImage) {

      windowImage.onload = function () {
        let imgWidth = this.width;
        let scale = context.state.width / imgWidth;
        context.imageLayerNode && context.imageLayerNode.batchDraw();

        context.setState({
          scale: { x: scale, y: scale },
          imageHeight: this.height,
          imageWidth: this.width,
          targetPoints: generateDefaultTagPoints(this.width, this.height, this.width * 0.1)
        });
      };
    })(this, this.state.windowImage);
  }

  resize() {
    this.setState({ width: window.innerWidth, height: window.innerHeight - 60 });
  }

  handleImageClicked(e) {
    let event = e.evt;
    let newX = (event.layerX - this.state.xOffset) / this.state.scale.x;
    let newY = (event.layerY - this.state.yOffset) / this.state.scale.y;

    let newArrowPoints = this.state.arrowPoints.slice(0);
    newArrowPoints.push({ xPos: newX, yPos: newY });

    this.setState({ arrowPoints: newArrowPoints });
    console.log(JSON.stringify(event));
  }

  handleOnImageSelected(imagePickerState) {
    let newWindowImage = this.state.windowImage;
    newWindowImage.src = imagePickerState.image;

    this.setState({
      file: imagePickerState.file,
      image: imagePickerState.image,
      imageName: imagePickerState.file.name,
      windowImage: newWindowImage
    });
  }

  handleArrowPointChanged(point, index) {
    let newPoints = this.state.arrowPoints.slice(0);
    newPoints[index] = point;
    this.setState({ arrowPoints: newPoints });
  }

  render() {
    return (this.state.file ?
      <div>
        <TargetStage width={this.state.width} height={this.state.height} scale={this.state.scale}
          onScaleChange={(scale) => this.setState({ scale: scale })}
          onOffsetChange={(e) => this.setState({ xOffset: e.xOffset, yOffset: e.yOffset })}>
          {<Layer ref={ref => this.imageLayerNode = ref}>
            <Group><Image image={this.state.windowImage} onClick={this.handleImageClicked} y={0} x={0} /></Group>
            <TargetFaceHighlighterWithCircle topPoint={this.state.targetPoints.topPoint}
              leftPoint={this.state.targetPoints.leftPoint}
              rightPoint={this.state.targetPoints.rightPoint}
              bottomPoint={this.state.targetPoints.bottomPoint}
              middlePoint={this.state.targetPoints.middlePoint}
              imageWidth={this.state.imageWidth} imageHeight={this.state.imageHeight}
              onTargetPointsChanged={newTargetPoints => this.setState({ targetPoints: newTargetPoints })} />
            <Group>{this.state.arrowPoints.map((arrowPoint, index) => <TagPoint key={index} point={arrowPoint} handlePointChanged={(p) => this.handleArrowPointChanged(p, index)} />)}</Group>
          </Layer>
          }
        </TargetStage>
      </div>
      : <ImagePickerGraphical handleImageDataSelected={this.handleOnImageSelected} />
    );
  }
}
export default ImageMarker;
