/* Imports */
import * as ffh from './ff_helper_fns.js';
//const p5 = require('p5');


/* Globals */
// ! Refactor to draw grid as centered. translate canvas origin
const HTML_WRAPPER_ID = 'canvas_wrapper';
const HTML_CANVAS_ID = 'sketch_holder';
const FIELD_INTERVAL = 20;
const FIELD_MAGNITUDE = 80;

let mousePos = {
    x: 0,
    y: 0,
    radius: 50
}

/* Context */
const CANVAS_WRAPPER = ffh.getHtmlCanvasWrapper(HTML_WRAPPER_ID);
const CANVAS = ffh.getHtmlCanvas(HTML_CANVAS_ID);
const CTX = ffh.init2dCanvasContext(CANVAS);

ffh.setCanvasSize(CANVAS, CANVAS_WRAPPER);
ffh.initMouseListener(mousePos);




/* Field Generation */
const point3d = (x, y, z = 0) => {
    return {x: x, y: y, z: z, yReset: y};
}

const generate2dPointField = (originPoint, rows, columns) => {
    // build rows as subarrays
    return Array.from(Array(rows)).map( ( _, indexY) => {
        return Array.from(Array(columns)).map( ( _, indexX) => {
            return point3d((indexX + originPoint.x), (indexY + originPoint.y), originPoint.z, (indexY + originPoint.y));
        });
    });
} 

const getNumColumns = (width, interval) => {
    return Math.ceil((width / interval) + 1);
}

const getNumRows = (height, interval) => {
    return Math.ceil((height / interval) + 1);
}

const generateCartesianField = (originPoint, width, height, interval) => {
    return generate2dPointField(originPoint, getNumRows(height, interval), getNumColumns(width, interval));
}

// TODO: z is currently a confusing value as it is used to scale Y. Maybe call zScale?
const convertCartesianPointToIsometric = point => {
    return {
        x: (point.x - point.y),
        y: ((point.y + point.x) / 2),
        z: point.z,
        yReset: ((point.y + point.x) / 2)
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
            fieldArray[y][x].yReset = fieldArray[y][x].y;
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
            fieldArray[y][x].yReset = fieldArray[y][x].y;
        }
    }

    return fieldArray;
}


/*=========================
......LIVE FILTERS.........
=========================*/

const shiftValue = (value, magnitude, reset=true, resetValue=0) => {
    // shift point by shiftFactor
        return (reset) ? (resetValue * magnitude) : (value * magnitude);
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

//let perlinGenerator = new toxi.math.noise.PerlinNoise();


const p5NoiseFilter = (fieldArray, maxMagnitude) => {
    var perlin = new toxi.math.noise.PerlinNoise()
    for (let y = 0; y < fieldArray.length; y++) {
        for (let x = 0; x < fieldArray[y].length; x++) {
            //fieldArray[y][x].y = fieldArray[y][x].z;
            //fieldArray[y][x].z = toxi.math.noise.PerlinNoise(fieldArray[y][x].x, fieldArray[y][x].y);
            fieldArray[y][x].y = fieldArray[y][x].yReset;
            fieldArray[y][x].y += perlin.noise(fieldArray[y][x].x, fieldArray[y][x].y) *maxMagnitude;
        }
    }

    return fieldArray;
}




const drawMeshTriangle = (fieldArray, iX, iY) => {
    const temp_height = fieldArray[iY][iX].y;

    //console.log(fieldArray[iY][iX].y);
    fieldArray[iY][iX].y += fieldArray[iY][iX].z * 100;
    //console.log(fieldArray[iY][iX].y);

    let arr = [0];
    arr = fieldArray;

    CTX.strokeStyle = 'rgba(100,255,0,0.3)';
    CTX.lineWidth = 1;

    CTX.beginPath();
    CTX.moveTo(arr[iY][iX].x, arr[iY][iX].y);
    CTX.lineTo(arr[iY][iX + 1].x, arr[iY][iX + 1].y);
    CTX.lineTo(arr[iY + 1][iX].x, arr[iY + 1][iX].y);
    CTX.closePath();
    CTX.stroke();

    CTX.beginPath();
    CTX.moveTo(arr[iY + 1][iX].x, arr[iY + 1][iX].y);
    CTX.lineTo(arr[iY][iX + 1].x, arr[iY][iX + 1].y);
    CTX.lineTo(arr[iY + 1][iX + 1].x, arr[iY + 1][iX + 1].y);
    CTX.closePath();
    CTX.stroke();

    fieldArray[iY][iX].y = temp_height;
}

const renderMeshFilter = fieldArray => {

    for (let y = 0; y < fieldArray.length-1; y++) {
        for (let x = 0; x < fieldArray[y].length-1; x++) {
            drawMeshTriangle(fieldArray, x, y);
        }
    }

    return fieldArray;
}

const renderFieldVertices = (fieldArray, radius = 2, color = 'white') => {
    for (let y = 0; y < fieldArray.length; y++) {
        for (let x = 0; x < fieldArray[y].length; x++) {
            renderCircle(fieldArray[y][x], radius, color);
        }
    }
}



/*=========================
......Program..............
=========================*/

const ORIGIN = point3d(0, 0, 0);
const CART_POINT_FIELD = generateCartesianField(ORIGIN, CANVAS.width, CANVAS.height, FIELD_INTERVAL);
const ISO_POINT_FIELD = convertCartesianFieldToIsometric(CART_POINT_FIELD);
const SCALED_FIELD = scaleField(ISO_POINT_FIELD, 80);
const POSITIONED_FIELD = positionField(SCALED_FIELD, 400, -600);

//! combine all live filters into single function
let ticker = 0
function animate () {
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
    renderFieldVertices(renderMeshFilter(p5NoiseFilter(POSITIONED_FIELD, FIELD_MAGNITUDE), 1, 'white'));
    renderCircle(mousePos, mousePos.radius, 'white');

    ticker++;
    //requestAnimationFrame(animate);
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