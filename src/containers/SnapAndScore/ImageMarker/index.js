import React, { Component } from 'react';
import { Stage, Layer, Group, Image } from 'react-konva'

import { ImagePickerGraphical } from '../../../components/ImagePicker'
import TagPoint from './TagPoint'
import { TargetFaceHighlighterWithCircle, generateDefaultTagPoints } from './TargetFaceHighlighter'

class ImageMarker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 0, height: 0, scale: { x: 1, y: 1 },
      windowImage: new window.Image(),
      image: '',
      imageName: '',
      targetPoints: {},
      arrowPoints: [],

      steps: ['uploadPhoto', 'highlightTargetFace', 'tagArrowPoints', 'confirmSelectedValues', 'saveEverything'],
    };

    this.resize = this.resize.bind(this);
    this.handleOnWheel = this.handleOnWheel.bind(this);
    this.handleOnTouchMove = this.handleOnTouchMove.bind(this);
    this.handleOnTouchEnd = this.handleOnTouchEnd.bind(this);
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
        context.imageLayerNode && context.imageLayerNode.batchDraw();
        context.setState({
          scale: context.createWindowScale(context.state.width / imgWidth),
          imageHeight: this.height,
          imageWidth: this.width,
          targetPoints: generateDefaultTagPoints(this.width, this.height, this.width * 0.1)
        });
      };
    })(this, this.state.windowImage);
  }

  handleOnWheel(_) {
    let e = _.evt;
    e.preventDefault();

    var scaleBy = 1.01;
    let stage = this.stageRef._stage;
    var oldScale = stage.scaleX();

    var newScale = e.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
    this.setState({ scale: { x: newScale, y: newScale } });

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
      this.setState({ scale: scale, lastDist: dist });
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

  handleImageClicked(e) {
    console.log('usual click on ' + JSON.stringify(this.stageRef._stage.getPointerPosition()));

    let event = e.evt;
    let newX = (event.layerX - this.stageRef._stage.attrs.x) / this.state.scale.x;
    let newY = (event.layerY - this.stageRef._stage.attrs.y) / this.state.scale.y;

    // let editedTagPoint = undefined;
    // for (let index = 0; index < this.state.tagPoints.length; index++) {
    //   const element = this.state.tagPoints[index];
    //   if (!element.xPos && !element.yPos) {
    //     editedTagPoint = this.state.tagPoints[index];
    //     break;
    //   }
    // }

    // if (editedTagPoint) {
    //   editedTagPoint.xPos = newX;
    //   editedTagPoint.yPos = newY;
    // }

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

  resize() {
    this.setState({ width: window.innerWidth, height: window.innerHeight - 60 });
  }

  render() {
    return (this.state.file ?
      <div>
        <Stage draggable={true}
          height={this.state.height}
          width={this.state.width}
          onWheel={this.handleOnWheel}
          onTouchMove={this.handleOnTouchMove}
          onTouchEnd={this.handleOnTouchEnd}
          scale={this.state.scale}
          ref={ref => { this.stageRef = ref; }}>
          {<Layer ref={ref => { this.imageLayerNode = ref; }}>
            <Group><Image onClick={this.handleImageClicked} y={0} x={0} image={this.state.windowImage} /></Group>
            <TargetFaceHighlighterWithCircle topPoint={this.state.targetPoints.topPoint}
              leftPoint={this.state.targetPoints.leftPoint}
              rightPoint={this.state.targetPoints.rightPoint}
              bottomPoint={this.state.targetPoints.bottomPoint}
              middlePoint={this.state.targetPoints.middlePoint}
              imageWidth={this.state.imageWidth} imageHeight={this.state.imageHeight}
              onTargetPointsChanged={newTargetPoints => this.setState({ targetPoints: newTargetPoints })} />
            <Group>{this.state.arrowPoints.map((arrowPoint, index) => <TagPoint key={index} point={arrowPoint} handlePointChanged={(p) => this.handleArrowPointChanged(p, index)}  />)}</Group>
          </Layer>
          }
        </Stage>
      </div>
      : <ImagePickerGraphical handleImageDataSelected={this.handleOnImageSelected} />
    );
  }
}
export default ImageMarker;
