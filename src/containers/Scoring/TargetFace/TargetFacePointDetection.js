
export const getArrowPointWithValues = (targetFace, arrowPoint) => {
    let pointValue = { displayValue: '0', value: 0 };

    for (let targetsIndex = 0; targetsIndex < targetFace.targets.length; targetsIndex++) {
        let currentTarget = targetFace.targets[targetsIndex];

        for (let i = currentTarget.length - 1; i >= 0; i--) {
            let targetRing = currentTarget[i];

            if (isPointingTargetElement(targetRing, arrowPoint)) {
                console.log(JSON.stringify(targetRing));
                pointValue.displayValue = targetRing.displayValue;
                pointValue.value = targetRing.value;
                pointValue.backgroundColor = targetRing.backgroundColor;
                pointValue.lineColor = targetRing.lineColor;
                return { ...arrowPoint, ...pointValue }
            }
        }
    }
    return { ...arrowPoint, ...pointValue }
}

const isPointingTargetElement = (targetRing, arrowPoint) => {
    // dx and dy are the vertical and horizontal distances
    var dx = targetRing.xPos - arrowPoint.xPos;
    var dy = targetRing.yPos - arrowPoint.yPos;

    // Determine the straight-line distance between centers.
    var d = Math.sqrt((dy * dy) + (dx * dx));

    var isPointingTarget = (targetRing.radius + (targetRing.lineWidth / 2) + arrowPoint.radius + (arrowPoint.lineWidth / 2)) >= d;
    return isPointingTarget;
}