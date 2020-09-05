/* Imports */
import * as ffh from './ff_helper_fns.js';
import * as ffspline from './ff_spline.js'
//const p5 = require('p5');


/* Globals */
// ! Refactor to draw grid as centered. translate canvas origin
const HTML_WRAPPER_ID = 'canvas_wrapper';
const HTML_CANVAS_ID = 'sketch_holder';
const FIELD_INTERVAL = 20;
const FIELD_SCALE_FACTOR = 40;
const FIELD_X_OFFSET = 0;
const FIELD_Y_OFFSET = -600;
const FIELD_MAGNITUDE = 40;
const WAVE_SPEED = 10;
const COLOR_01 = '#F1DEDE';
const SPLINE_TENSION = 0.5;

let mousePos = {
    x: 0,
    y: 0,
    radius: 250
}

/* Context */
const CANVAS_WRAPPER = ffh.getHtmlCanvasWrapper(HTML_WRAPPER_ID);
const CANVAS = ffh.getHtmlCanvas(HTML_CANVAS_ID);
const CTX = ffh.init2dCanvasContext(CANVAS);

document.addEventListener('mousemove', event => {
    mousePos.x = event.x;
    mousePos.y = event.y;
})

ffh.setCanvasSize(CANVAS, CANVAS_WRAPPER);





// Generate grid
const point3d = (x, y, z = 0) => {
    return {x: x, y: y, z: z, yReset: y};
}

const generate3dPointField = (originPoint, rows, columns) => {
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
    return generate3dPointField(originPoint, getNumRows(height, interval), getNumColumns(width, interval));
}

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

const p5NoiseFilter = (fieldArray, maxMagnitude, perlin, noiseOffset) => {
    
    for (let y = 0; y < fieldArray.length; y++) {
        for (let x = 0; x < fieldArray[y].length; x++) {
            //fieldArray[y][x].y = fieldArray[y][x].z;
            //fieldArray[y][x].z = toxi.math.noise.PerlinNoise(fieldArray[y][x].x, fieldArray[y][x].y);
            fieldArray[y][x].y = fieldArray[y][x].yReset;
            fieldArray[y][x].y += perlin.noise(fieldArray[y][x].x + noiseOffset, fieldArray[y][x].y + noiseOffset) *maxMagnitude;
        }
    }

    return fieldArray;
}



const ORIGIN = point3d(0, 0, 0);
//const CART_POINT_FIELD = convertCartesianFieldToIsometric(generateCartesianField(ORIGIN, CANVAS.width, CANVAS.height, FIELD_INTERVAL));
const CART_POINT_FIELD = generateCartesianField(ORIGIN, CANVAS.width, CANVAS.height, FIELD_INTERVAL);
const POSITIONED_FIELD = positionField(scaleField(CART_POINT_FIELD, FIELD_SCALE_FACTOR), FIELD_X_OFFSET, FIELD_Y_OFFSET);

var perlin = new toxi.math.noise.PerlinNoise();
let ticker = 0;
const animationLoop = _ => {
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);

    /* CTX.fillStyle = COLOR_01;
    CTX.beginPath();
    CTX.arc(mousePos.x, mousePos.y, mousePos.radius, 0, Math.PI * 2);
    CTX.closePath();
    CTX.fill() */
    p5NoiseFilter(POSITIONED_FIELD, FIELD_MAGNITUDE, perlin, ticker).map(row => ffspline.renderSpline(CTX, row, SPLINE_TENSION, '#ffeeff', 10));
    //POSITIONED_FIELD.map(row => ffspline.renderSpline(CTX, row, SPLINE_TENSION, '#ffeeff', 10));

    ticker += 0.1;
    requestAnimationFrame(animationLoop);
}



animationLoop();