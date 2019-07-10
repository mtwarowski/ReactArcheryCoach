import React from 'react';
import { Circle, Group } from 'react-konva'

export class TagPoint extends React.Component {

  render() {
    const props = this.props;
    const changeSize = (scale) => {
      // to() is a method of `Konva.Node` instances
      this.circle.to({
        scaleX: scale,
        scaleY: scale,
        duration: 0.2
      });
    };

    return (
      <Group draggable={true}
        onDragMove={(e) => {
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
          radius={props.point.radius}
          stroke={'rgba(70, 70, 255, 1)'}
          fill={'rgba(70, 70, 255, 0.5)'}
          strokeWidth={1} />
        <Circle
          draggable={true}
          x={props.point.xPos}
          y={props.point.yPos}
          radius={props.point.radius / 5}
          stroke={'rgba(255, 255, 0, 1)'}
          fill={'rgba(255, 255, 0, 0.5)'}
          strokeWidth={1} />
      </Group>
    );
  }
}

export default TagPoint;