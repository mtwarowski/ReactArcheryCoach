import React, { Component } from 'react';
import { Stage, Layer, Circle, Group, Image } from 'react-konva'

import ImagePicker, {ImagePickerGraphical} from '../../components/ImagePicker'

class ImageMarker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 0, height: 0, scale: { x: 1, y: 1 },
      pointingX: 0, pointingY: 0,
      windowImage: new window.Image(),
      image: '',
      imageName: 'Choose an Image',

      tagPoints: [
        { name: 'top' },
        { name: 'left' },
        { name: 'right' },
        { name: 'bottom' }
      ]
    };



    this.state.windowImage.onload = () => {
      // need to update layer manually
      // this.imageLayerNode.batchDraw();
    };


    this.state.windowImage.onclick = (e) => {


      console.log(JSON.stringify(e));
    };

    this.resize = this.resize.bind(this);
    this.handleOnWheel = this.handleOnWheel.bind(this);
    this.handleOnTouchMove = this.handleOnTouchMove.bind(this);
    this.handleOnTouchEnd = this.handleOnTouchEnd.bind(this);
    this.handleOnImageSelected = this.handleOnImageSelected.bind(this);
    this.handleImageClicked = this.handleImageClicked.bind(this);
    this.handlePointChanged = this.handlePointChanged.bind(this);
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
        this.setState({ lastDist: dist });
      }

      var scale = this.state.scale.x * dist / this.state.lastDist;
      this.setState({ scale: { x: scale, y: scale, lastDist: dist } });
    }
  }

  getDistance(p1, p2) {
      return Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2));
  }

  handleOnTouchEnd() {
    this.setState({ lastDist: 0 });
  }

  handleImageClicked(e) {

    console.log('usual click on ' + JSON.stringify(this.stageRef._stage.getPointerPosition()));

    let event = e.evt;
    let newX = (event.layerX - this.stageRef._stage.attrs.x) / this.state.scale.x;
    let newY = (event.layerY - this.stageRef._stage.attrs.y) / this.state.scale.y;

    let editedTagPoint = undefined;
    for (let index = 0; index < this.state.tagPoints.length; index++) {
      const element = this.state.tagPoints[index];
      if (!element.xPos && !element.yPos) {
        editedTagPoint = this.state.tagPoints[index];
        break;
      }
    }

    if (editedTagPoint) {
      editedTagPoint.xPos = newX;
      editedTagPoint.yPos = newY;
    }

    this.setState({ pointingX: newX, pointingY: newY });
    console.log(JSON.stringify(event));
  }

  handleOnImageSelected(imagePickerState) {
    let newWindowImage = this.state.windowImage;
    newWindowImage.src = imagePickerState.image;
    this.setState({
      file: imagePickerState.file,
      image: imagePickerState.image,
      imageName: imagePickerState.file.name,
      windowImage: newWindowImage,
    });
  }

  handlePointChanged(point, index) {
    let tagPoints = this.state.tagPoints.slice(0);
    tagPoints[index] = point;
    this.setState({ tagPoints: tagPoints });
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
            {this.state.tagPoints.map((point, index) => <TagPoint key={index} point={point} pointIndex={"" + index} handlePointChanged={(p, i) => this.handlePointChanged(p, index)} />)}
          </Layer>
          }
        </Stage>
      </div>
      : <ImagePickerGraphical label="Select Image" handleImageDataSelected={this.handleOnImageSelected} />
    );
  }
}

export default ImageMarker;

const fillColor = '#A9A9A9';
// const TagPoint = (props) => {
//   return <Group draggable={true}
//     onDragEnd={(e) => props.handlePointChanged({
//       ...props.point,
//       xPos: e.target.x(),
//       yPos: e.target.y()
//     }, props.pointIndex)}>
//     <Circle
//       draggable={true}
//       x={props.point.xPos}
//       y={props.point.yPos}
//       radius={20}
//       stroke={'rgba(255, 255, 0, 0.5)'}
//       fill={fillColor}
//       strokeWidth={1} />
//     <Circle
//       draggable={true}
//       onDragEnd={changeSize}
//       onDragStart={changeSize}
//       x={props.point.xPos}
//       y={props.point.yPos}
//       radius={10}
//       stroke={'rgba(255, 255, 0, 1)'}
//       fill={'rgba(255, 255, 0, 225)'}
//       strokeWidth={1} />
//   </Group>
// }


class TagPoint extends React.Component {


  render() {
    const props = this.props;
    const changeSize = (scale) => {
      // to() is a method of `Konva.Node` instances
      if (this.circle.scaleX === 3) {
        this.circle.to({
          scaleX: 1,
          scaleY: 1,
          duration: 0.2
        });
      }
      else {
        this.circle.to({
          scaleX: scale,
          scaleY: scale,
          duration: 0.2
        });
      }
    };

    return (
      <Group draggable={true}
        onDragMove={(e) => {
          changeSize(3);
          props.handlePointChanged({
            ...props.point,
            xPos: e.target.x(),
            yPos: e.target.y()
          }, props.pointIndex);
        }}
        onDragStart={() => changeSize(3)}
        onDragEnd={(e) => {
          props.handlePointChanged({
            ...props.point,
            xPos: e.target.x(),
            yPos: e.target.y()
          }, props.pointIndex);
          changeSize(1);
        }
        }>
        <Circle
          draggable={true}
          x={props.point.xPos}
          y={props.point.yPos}
          ref={(node) => {
            this.circle = node;
          }}
          radius={20}
          stroke={'rgba(255, 255, 0, 0.5)'}
          fill={fillColor}
          strokeWidth={1} />
        <Circle
          draggable={true}
          x={props.point.xPos}
          y={props.point.yPos}
          radius={10}
          stroke={'rgba(255, 255, 0, 1)'}
          fill={'rgba(255, 255, 0, 225)'}
          strokeWidth={1} />
      </Group>
    );
  }
}