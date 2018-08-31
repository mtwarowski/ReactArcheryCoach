import React, { Component } from 'react';
import { Stage, Layer, Circle, Rect, Group, Image } from 'react-konva'

import ImagePicker from '../../components/ImagePicker'

class ImageMarker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 0, height: 0, scale: { x: 1, y: 1 },

      windowImage: new window.Image(),
      image: '',
      imageName: 'Choose an Image',
    };


    this.state.windowImage.onload = () => {
      // need to update layer manually
      // this.imageLayerNode.batchDraw();
    };

    this.resize = this.resize.bind(this);
    this.handleOnWheel = this.handleOnWheel.bind(this);
    this.handleOnTouchMove = this.handleOnTouchMove.bind(this);
    this.handleOnTouchEnd = this.handleOnTouchEnd.bind(this);
    this.handleOnImageSelected = this.handleOnImageSelected.bind(this);
  }


  componentDidMount() {
    this.resize();
    window.addEventListener('resize', this.resize);
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
        this.state.lastDist = dist;
      }

      var scale = this.state.scale.x * dist / this.state.lastDist;

      this.setState({scale: {x: scale, y: scale}});
      this.state.lastDist = dist;
    }
  }

  handleOnTouchEnd() {
    this.setState({ lastDist: 0 });
  }

  handleOnImageSelected(imagePickerState) {

    this.state.windowImage.src = imagePickerState.image;
    this.setState({
      file: imagePickerState.file,
      image: imagePickerState.image,
      imageName: imagePickerState.file.name,
      windowImage: this.state.windowImage,
    });
  }


  resize() {
    this.setState({ width: window.innerWidth, height: window.innerHeight - 60 });
  }


  getDistance(p1, p2) {
    return Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2));
  }

  render() {
    return (this.state.file ?
      <div>
        <Stage draggable={true}
          style={{ background: 'yellow' }}
          height={this.state.height}
          width={this.state.width}
          onWheel={this.handleOnWheel}
          onTouchMove={this.handleOnTouchMove}
          onTouchEnd={this.handleOnTouchEnd}
          scale={this.state.scale}
          pin

          ref={ref => { this.stageRef = ref; }}>

          {<Layer ref={ref => { this.imageLayerNode = ref; }}>
            <Group><Image y={0} x={0} image={this.state.windowImage} /></Group>
            <Group><Circle x={0} y={0} radius={10} fill={"blue"} stroke={"black"} strokeWidth={1} /></Group>
          </Layer>
          }
        </Stage>
      </div>
      : <ImagePicker label="Select Image" handleImageDataSelected={this.handleOnImageSelected} />
    );
  }
}

export default ImageMarker;