import React from 'react';
import { Group, Line } from 'react-konva'
import TagPoint from './TagPoint';

export const generateDefaultTagPoints = (width, height, offset) => {
    let offsetValue = offset || 0;
    return {
        topPoint: { name: 'top', xPos: width / 2, yPos: 0 + offsetValue },
        leftPoint: { name: 'left', xPos: 0 + offsetValue, yPos: (height / 2) },
        rightPoint: { name: 'right', xPos: width - offsetValue, yPos: height / 2 },
        bottomPoint: { name: 'bottom', xPos: width / 2, yPos: height - offsetValue },
        middlePoint: { name: 'middle', xPos: width / 2, yPos: height / 2 }
    };
}


const getIntersect = (p1, p2, p3, p4) => {
    return checkLineIntersection(p1.xPos, p1.yPos, p2.xPos, p2.yPos, p3.xPos, p3.yPos, p4.xPos, p4.yPos);
}

const checkLineIntersection = (line1StartX, line1StartY, line1EndX, line1EndY, line2StartX, line2StartY, line2EndX, line2EndY) => {
    // if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite) and booleans for whether line segment 1 or line segment 2 contain the point
    var denominator, a, b, numerator1, numerator2, result = {
        x: null,
        y: null,
        onLine1: false,
        onLine2: false
    };
    denominator = ((line2EndY - line2StartY) * (line1EndX - line1StartX)) - ((line2EndX - line2StartX) * (line1EndY - line1StartY));
    if (denominator === 0) {
        return result;
    }
    a = line1StartY - line2StartY;
    b = line1StartX - line2StartX;
    numerator1 = ((line2EndX - line2StartX) * a) - ((line2EndY - line2StartY) * b);
    numerator2 = ((line1EndX - line1StartX) * a) - ((line1EndY - line1StartY) * b);
    a = numerator1 / denominator;
    b = numerator2 / denominator;

    // if we cast these lines infinitely in both directions, they intersect here:
    result.x = line1StartX + (a * (line1EndX - line1StartX));
    result.y = line1StartY + (a * (line1EndY - line1StartY));

    // if line1 is a segment and line2 is infinite, they intersect if:
    if (a > 0 && a < 1) {
        result.onLine1 = true;
    }
    // if line2 is a segment and line1 is infinite, they intersect if:
    if (b > 0 && b < 1) {
        result.onLine2 = true;
    }

    if (a > 0 && a < 1 && b > 0 && b < 1) {
        result.onBothLines = true;
    }

    // if line1 and line2 are segments, they intersect if both of the above are true
    return result;
}

export class TargetFaceHighlighterWithCircle extends React.Component {
    constructor(props) {
        super(props);

        // this.props = {
        //     topPoint: null,
        //     leftPoint: null,
        //     rightPoint: null,
        //     bottomPoint: null,
        //     middlePoint: null
        // };

        this.handlePointChanged = this.handlePointChanged.bind(this);
        this.handleMiddlePointChanged = this.handleMiddlePointChanged.bind(this);
    }

    // componentDidMount() {
    //     if (this.props.imageWidth && this.props.imageHeight) {
    //         let tagPoints = generateDefaultTagPoints(this.props.imageWidth, this.props.imageHeight, this.props.imageWidth * 0.1);
    //         this.setStateForTagPoints(tagPoints);
    //     }
    // }

    // componentDidUpdate(prevProps, prevState) {
    //     if (prevProps.imageWidth !== this.props.imageWidth || prevProps.imageHeight !== this.props.imageHeight) {
    //         let tagPoints = generateDefaultTagPoints(this.props.imageWidth, this.props.imageHeight, this.props.imageWidth * 0.1);
    //         this.setStateForTagPoints(tagPoints);
    //     }
    // }

    setStateForTagPoints(tagPoints) {
        let intersected = getIntersect(tagPoints.topPoint, tagPoints.bottomPoint, tagPoints.leftPoint, tagPoints.rightPoint);
        let allPropertiesToSet = { ...tagPoints };

        if(!allPropertiesToSet.middlePoint) {
            allPropertiesToSet.middlePoint = this.props.middlePoint;
        }

        if (intersected){
            allPropertiesToSet.middlePoint.xPos = intersected.x;
            allPropertiesToSet.middlePoint.yPos = intersected.y;
        }
        
        this.props.onTargetPointsChanged(allPropertiesToSet);
    }

    handlePointChanged(point, pointName) {
        let newStateValues = {
            topPoint: this.props.topPoint,
            leftPoint: this.props.leftPoint,
            rightPoint: this.props.rightPoint,
            bottomPoint: this.props.bottomPoint
        };

        newStateValues[pointName] = point;
        this.setStateForTagPoints(newStateValues);
    }

    handleMiddlePointChanged(point){
        let xDiff = point.xPos - this.props.middlePoint.xPos;
        let yDiff = point.yPos - this.props.middlePoint.yPos;

        let newStateValues = {
            topPoint: this.props.topPoint,
            leftPoint: this.props.leftPoint,
            rightPoint: this.props.rightPoint,
            bottomPoint: this.props.bottomPoint
        };

        for (const pointKey in newStateValues) {
            const point = newStateValues[pointKey];

            point.xPos += xDiff;
            point.yPos += yDiff;
        }

        newStateValues.middlePoint = point;
        this.setStateForTagPoints(newStateValues);
    }

    render() {
        return (
            <Group>
                {this.props.topPoint && this.props.leftPoint && this.props.rightPoint && this.props.bottomPoint &&
                     <Line points={[this.props.leftPoint.xPos, this.props.leftPoint.yPos, 
                                    this.props.topPoint.xPos, this.props.topPoint.yPos,  
                                    this.props.rightPoint.xPos, this.props.rightPoint.yPos, 
                                    this.props.bottomPoint.xPos, this.props.bottomPoint.yPos]} 
                            fill={'rgba(255, 255, 0, 0.5)'} stroke={'rgba(255, 255, 0, 1)'} strokeWidth={1} closed={true} tension={0.5} />}
                {this.props.topPoint && <TagPoint point={this.props.topPoint} handlePointChanged={(p) => this.handlePointChanged(p, "topPoint")} />}
                {this.props.leftPoint && <TagPoint point={this.props.leftPoint} handlePointChanged={(p) => this.handlePointChanged(p, "leftPoint")} />}
                {this.props.rightPoint && <TagPoint point={this.props.rightPoint} handlePointChanged={(p) => this.handlePointChanged(p, "rightPoint")} />}
                {this.props.bottomPoint && <TagPoint point={this.props.bottomPoint} handlePointChanged={(p) => this.handlePointChanged(p, "bottomPoint")} />}
                {this.props.middlePoint && <TagPoint point={this.props.middlePoint} handlePointChanged={(p) => this.handleMiddlePointChanged(p)} />}
            </Group>
        );
    }
}


