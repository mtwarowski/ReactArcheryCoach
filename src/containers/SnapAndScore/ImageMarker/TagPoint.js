import React from 'react';
import { Circle, Group } from 'react-konva'

export class TagPoint extends React.Component {

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
          radius={100}
          stroke={'rgba(70, 70, 255, 1)'}
          fill={'rgba(70, 70, 255, 0.5)'}
          strokeWidth={1} />
        <Circle
          draggable={true}
          x={props.point.xPos}
          y={props.point.yPos}
          radius={10}
          stroke={'rgba(255, 255, 0, 1)'}
          fill={'rgba(255, 255, 0, 0.5)'}
          strokeWidth={1} />
      </Group>
    );
  }
}

export default TagPoint;