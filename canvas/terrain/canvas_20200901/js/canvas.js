/* Imports */
import {
    default as CONFIG
} from './config.js';

import {
    CartRect
} from './structures.js';
import {
    ProjectableVector
} from './structures.js';

/* Context vars */
const CANVAS_WRAPPER = document.getElementById(CONFIG.html.canvasWrapperID);
const CANVAS = document.getElementById(CONFIG.html.canvasID);
const CTX = CANVAS.getContext('2d');

/* Context modifying functions */
function setCanvasSize() {
    CANVAS.width = CANVAS_WRAPPER.offsetWidth;
    CANVAS.height = CANVAS_WRAPPER.offsetHeight;
}


/*=========================
......Program..............
=========================*/
setCanvasSize();






const POINT_FIELD = pointField();

drawPoint({x:500, y:500}, 10, 'magenta');
convertFieldToIso(POINT_FIELD);
addStatic(POINT_FIELD);
const SHIFTED_GRID = shiftGrid(POINT_FIELD);
drawField(POINT_FIELD, 'magenta');
drawField(SHIFTED_GRID, 'white');






function pointField() {
    const INTERVAL = 40;
    let pointField = [];
    let row = [];

    for (let y = 0; y < CANVAS.height; y += INTERVAL) {
        row = [];
        for (let x = 0; x < CANVAS.width; x += INTERVAL) {
            row.push(new ProjectableVector(x, y));
        }
        pointField.push(row);
    }

    return pointField;
}

function convertFieldToIso (nestedArray) {
    for (let y = 0; y < nestedArray.length; y++) {
        for (let x = 0; x < nestedArray[y].length; x++) {
            nestedArray[y][x].convertToIso();
        }
    }
}

function addStatic (nestedArray) {
        for (let y = 0; y < nestedArray.length; y++) {
            for (let x = 0; x < nestedArray[y].length; x++) {
                nestedArray[y][x].y += Math.random() * 20;
            }
        }
}

function shiftGrid (nestedArray) {
    const X_SHIFT = 100;
    const Y_SHIFT = 0;

    let shiftedGrid = cloneArray(nestedArray);

    for (let y = 0; y < shiftedGrid.length; y++) {
        for (let x = 0; x < shiftedGrid[y].length; x++) {
            shiftedGrid[y][x].x += X_SHIFT;
            shiftedGrid[y][x].y += Y_SHIFT;
        }
    }

    return shiftedGrid;
}

function cloneArray (arr) {
    return arr.map(x => x);
}

function drawField(nestedArray, color) {
    for (let y = 0; y < nestedArray.length; y++) {
        for (let x = 0; x < nestedArray[y].length; x++) {
            drawPoint(nestedArray[y][x], 2, color);
        }
    }
}

function drawPoint(point, radius, color) {
        CTX.fillStyle = color;

    CTX.beginPath();
    CTX.arc(point.x, point.y, radius, 0, Math.PI * 2);

    CTX.fill();
}