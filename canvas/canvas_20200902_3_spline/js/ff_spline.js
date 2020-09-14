/*
    Copyright 2020 by Flimflam Factory LLC
    
    Generates a bezier spline through points series of points.

    Based on the work of Robin W. Spencer
*/
const renderPointFilled = (ctx, point, radius, color = 'white') => {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(point.x, point.y, radius, 0.0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
}


const renderPointStroked = (ctx, point, radius, color = 'white', lineweight = 1) => {
    ctx.beginPath();
    ctx.lineWidth = lineweight;
    ctx.strokeStyle = color;
    ctx.arc(point.x, point.y, radius, 0.0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
}


const renderControlHandle = (ctx, basePt, controlPt, controlPtRadius, lineweight, color) => {
    ctx.beginPath();
    ctx.lineWidth = lineweight;
    ctx.strokeStyle = color;
    ctx.moveTo(basePt.x, basePt.y);
    ctx.lineTo(controlPt.x, controlPt.y);
    ctx.closePath();
    ctx.stroke();
    renderPointStroked(ctx, controlPt, controlPtRadius, lineweight, color);
}


const getSquare = value => value*value;


const getHypotenuse = (sideA, sideB) => Math.sqrt(getSquare(sideA) + getSquare(sideB));


const getControlPoints = (startPt, endPoint, nextPt, tension) => {
    const DIST_CURRENT = getHypotenuse((endPoint.x - startPt.x), (endPoint.y - startPt.y));
    const DIST_NEXT = getHypotenuse((nextPt.x - endPoint.x), (nextPt.y - endPoint.y));

    const FORCE_CURRENT = (tension * DIST_CURRENT) / (DIST_CURRENT + DIST_NEXT);
    const FORCE_NEXT = tension - FORCE_CURRENT;

    const CONTROL_POINT_CURRENT = {
        x: (endPoint.x + (FORCE_CURRENT * (startPt.x - nextPt.x))),
        y: (endPoint.y + (FORCE_CURRENT * (startPt.y - nextPt.y)))
    }

    const CONTROL_POINT_NEXT = {
        x: (endPoint.x - (FORCE_NEXT * (startPt.x - nextPt.x))),
        y: (endPoint.y - (FORCE_NEXT * (startPt.y - nextPt.y)))
    }

    return [CONTROL_POINT_CURRENT, CONTROL_POINT_NEXT];
}


const getCorrectedTension = tension => tension * -1;


export const renderSpline = (ctx, points, tension, color = 'white', lineweight = 1, showDetails = true) => {
    const TENSION = getCorrectedTension(tension);
    const pL = points.length;

    ctx.strokeStyle = color;
    ctx.lineWidth = lineweight;
    
    // generate control points
    let cPts = [];
    for (let i = 0; i < pL - 2; i++) {
        cPts.push(getControlPoints(points[i], points[i+1], points[i+2], TENSION));
    }

    // generate first curve
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    ctx.quadraticCurveTo(cPts[0][1].x, cPts[0][1].y, points[1].x, points[1].y);
    ctx.stroke();
    ctx.closePath();

    // generate spline
    for (let i = 1; i < pL - 2; i++) {
        ctx.beginPath();
        ctx.moveTo(points[i].x, points[i].y); // sets up first point (context point)
        ctx.bezierCurveTo(cPts[i-1][0].x, cPts[i-1][0].y, cPts[i][1].x, cPts[i][1].y, points[i+1].x, points[i+1].y);
        ctx.stroke();
        ctx.closePath();
    }

    // generate last curve
    ctx.beginPath();
    ctx.moveTo(points[pL-1].x, points[pL-1].y);
    ctx.quadraticCurveTo(cPts[pL-3][0].x, cPts[pL-3][0].y, points[pL-2].x, points[pL-2].y);
    ctx.stroke();
    ctx.closePath();

    return;
}