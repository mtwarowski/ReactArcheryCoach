import React, { Component } from 'react';
import { Layer, Group, Image } from 'react-konva'

import TagPoint from './TagPoint'
import TargetStage from './TargetStage'

import { ImagePickerGraphical } from '../../../components/ImagePicker'
import { TargetFaceHighlighterWithCircle, generateDefaultTagPoints } from './TargetFaceHighlighter'

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
      : <ImagePickerGraphical handleImageDataSelected={this.handleOnImageSelected} />
    );
  }
}
export default ImageMarker;
