/* Imports */
import * as ffh from './ff_helper_fns.js';


/* Globals */
const CONFIG = {
    html: {
        wrapperID: 'canvas_wrapper',
        canvasID: 'sketch_holder'
    },
    field: {
        interval: 20
    }
}


let mousePos = {
    x: 0,
    y: 0,
    radius: 50
}


/* Context */
const CANVAS_WRAPPER = ffh.getHtmlCanvasWrapper(CONFIG.html.wrapperID);
const CANVAS = ffh.getHtmlCanvas(CONFIG.html.canvasID);
const CTX = ffh.init2dCanvasContext(CANVAS);

ffh.setCanvasSize(CANVAS, CANVAS_WRAPPER);
ffh.initMouseListener(mousePos);





const getNumColumns = (canvas, interval) => {
    return Math.ceil((canvas.width / interval) + 1);
}

const getNumRows = (canvas, interval) => {
    return Math.ceil((canvas.height / interval) + 1);
}

const generate2dPointArray = (rows, columns, zScale) => {
    let fieldArray = [];
    // Rows are subarrays
    for (let y = 0; y < rows; y++) {
        fieldArray[y] = new Array();

        for (let x = 0; x < columns; x++) {
            fieldArray[y].push({x: x, y: y, z: zScale});
        }
        //fieldArray.push(rowArray);
    }
    return fieldArray;
}

const generateCartesianField = (canvas, interval, zScale = 0) => {

    const COLS = getNumColumns(canvas, interval);
    const ROWS = getNumRows(canvas, interval);

    return generate2dPointArray(ROWS, COLS, zScale);
}

const convertCartesianPointToIsometric = (point) => {
    return {
        x: (point.x - point.y),
        y: ((point.y + point.x) / 2),
        z: point.z
    }
}

const convertCartesianFieldToIsometric = (fieldArray) => {
    for (let y = 0; y < fieldArray.length; y++) {
        for (let x = 0; x < fieldArray[y].length; x++) {
            fieldArray[y][x] = convertCartesianPointToIsometric(fieldArray[y][x]);
        }
    }
    return fieldArray;
}

// TODO: rewrite to center on screen
const positionField = (fieldArray, xOffset, yOffset) => {

    for (let y = 0; y < fieldArray.length; y++) {
        for (let x = 0; x < fieldArray[y].length; x++) {
            fieldArray[y][x].x += xOffset;
            fieldArray[y][x].y += yOffset;
        }
    }

    return fieldArray;
}

const scaleField = (fieldArray, scaleFactor) => {
    for (let y = 0; y < fieldArray.length; y++) {
        for (let x = 0; x < fieldArray[y].length; x++) {
            fieldArray[y][x].x *= scaleFactor;
            fieldArray[y][x].y *= scaleFactor;
            fieldArray[y][x].z *= scaleFactor;
        }
    }

    return fieldArray;
}

const renderField = (fieldArray, radius = 2, color = 'white') => {
    for (let y = 0; y < fieldArray.length; y++) {
        for (let x = 0; x < fieldArray[y].length; x++) {
            renderCircle(fieldArray[y][x], radius, color);
        }
    }
}

/*=========================
......LIVE FILTERS.........
=========================*/

const shiftValue = (value, magnitude, reset=true, resetValue=0) => {
    // shift point by shiftFactor
        return (reset) ? (resetValue + magnitude) : (value + magnitude);
}

const getRandomMagnitude = maxMagnitude => {
    return Math.random() * maxMagnitude;
}

const setZValue = fieldArray => {
    for (let y = 0; y < fieldArray.length; y++) {
        for (let x = 0; x < fieldArray[y].length; x++) {
            fieldArray[y][x].z = fieldArray[y][x].y;
        }
    }

    return fieldArray;
}

const staticFilter = (fieldArray, maxMagnitude) => {

    for (let y = 0; y < fieldArray.length; y++) {
        for (let x = 0; x < fieldArray[y].length; x++) {
            fieldArray[y][x].y = shiftValue(fieldArray[y][x].z, getRandomMagnitude(maxMagnitude), true, fieldArray[y][x].z);
        }
    }

    return fieldArray;
}

const drawMeshTriangle = (fieldArray, iX, iY) => {
    let arr = [0];
    arr = fieldArray;
    CTX.strokeStyle = 'rgba(200,200,200,0.2)';

    CTX.beginPath();
    CTX.moveTo(arr[iY][iX].x, arr[iY][iX].y);
    CTX.lineTo(arr[iY][iX + 1].x, arr[iY][iX + 1].y);
    CTX.lineTo(arr[iY + 1][iX].x, arr[iY + 1][iX].y);
    CTX.closePath();
    CTX.stroke();
}

const renderMeshFilter = fieldArray => {

    for (let y = 0; y < fieldArray.length-1; y++) {
        for (let x = 0; x < fieldArray[y].length-1; x++) {
            drawMeshTriangle(fieldArray, x, y);
        }
    }

    return fieldArray;
}



/*=========================
......Program..............
=========================*/
const CART_POINT_FIELD = generateCartesianField(CANVAS, CONFIG.field.interval, 0);
const ISO_POINT_FIELD = convertCartesianFieldToIsometric(CART_POINT_FIELD);
const SCALED_FIELD = scaleField(ISO_POINT_FIELD, 35);
const POSITIONED_FIELD = setZValue(positionField(SCALED_FIELD, 400, -600));

//! combine all live filters into single function
function animate () {
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
    renderMeshFilter(staticFilter(POSITIONED_FIELD, 100), 1, 'white');
    renderCircle(mousePos, mousePos.radius, 'white');

    requestAnimationFrame(animate);
}


/*=========================
......Start................
=========================*/

animate();






function renderCircle(point, radius, color = 'white') {
    CTX.fillStyle = color;
    CTX.beginPath();
    CTX.arc(point.x, point.y, radius, 0, Math.PI*2);
    CTX.fill();
}