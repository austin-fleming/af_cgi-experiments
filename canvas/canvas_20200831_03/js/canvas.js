/* Imports */
import {
    default as CONFIG
} from './config.js';


/* Context vars */
const CANVAS_WRAPPER = document.getElementById(CONFIG.html.canvasWrapperID);
const CANVAS = document.getElementById(CONFIG.html.canvasID);
const CTX = CANVAS.getContext('2d');

/* Env vars */
const MOUSE = {
    x: null,
    y: null,
    radius: CONFIG.cursor.radius
}

const GRID_INTERVAL = CONFIG.gridInterval;

/* Events */
window.addEventListener('mouseover', event => {
    MOUSE.x = event.x;
    MOUSE.y = event.y;
})

/* Context modifying functions */
function setCanvasSize() {
    CANVAS.width = CANVAS_WRAPPER.offsetWidth;
    CANVAS.height = CANVAS_WRAPPER.offsetHeight;
}


/*=========================
......Program..............
=========================*/
setCanvasSize();

const POINT_GRID = generateGrid();

// convert to scew function later w/ scale vertical
const POINT_GRID_SHIFTED = shiftArrayXY(POINT_GRID, 5, -8, -70, 180);

drawGrid(POINT_GRID_SHIFTED);



function draw () {
    const POINT_GRID = generateGrid();
    // convert to scew function later w/ scale vertical
    const POINT_GRID_SHIFTED = shiftArrayXY(POINT_GRID, 15, -15, -180, 300);

    drawGrid(terrainNoise(POINT_GRID_SHIFTED, 50, 15));
}


function animation () {
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
    
    draw();

    setTimeout(() => {requestAnimationFrame(animation)}, 1000/30);
}

animation();





/* 

HELPER FUNCTIONS

*/


function generateGrid() {
    let fullArray = [];


    let cols = Math.ceil(CANVAS.width / GRID_INTERVAL) + 1;
    let rows = Math.ceil(CANVAS.height / GRID_INTERVAL) + 1;

    for (let y = 0; y < rows; y++) {
        let rowArray = [];
        for (let x = 0; x < cols; x++) {

            rowArray.push({
                x: x * GRID_INTERVAL,
                y: y * GRID_INTERVAL
            });
        }
        fullArray.push(rowArray);
        //shift += shift;
    }

    return fullArray
}


function drawGrid(inputArray) {
    let pointArray = [null];
    pointArray = inputArray;
    for (let y = 0; y < pointArray.length - 1; y++) {
        for (let x = 0; x < pointArray[0].length - 1; x++) {
            drawTriangles(pointArray, x, y);
        }
    }
}


function drawTriangles(inputArray, iX, iY) {
    let arr = [0];
    arr = inputArray;
    CTX.strokeStyle = 'rgba(200,200,200,0.2)';

    CTX.beginPath();
    CTX.moveTo(arr[iY][iX].x, arr[iY][iX].y);
    CTX.lineTo(arr[iY][iX + 1].x, arr[iY][iX + 1].y);
    CTX.lineTo(arr[iY + 1][iX].x, arr[iY + 1][iX].y);
    CTX.closePath();
    CTX.stroke();
}

function shiftArrayXY(inputArray, shiftAmountX, shiftAmountY, offsetX = 0, offsetY = 0) {
    let pointArray = inputArray;
    let shiftX = shiftAmountX;
    let shiftY = shiftAmountY;
    for (let y = 0; y < pointArray.length; y++) {
        pointArray[y].map(point => {
            point.x += shiftX + offsetX;
            point.y += shiftY + offsetY;

            shiftY += shiftAmountY;
        })
        shiftX += shiftAmountX;
        shiftY = shiftAmountY;
    }
    return pointArray;
}

function drawRandomPoints(gridArray, maxSize, minSize = 0) {

    for (let y = 0; y < gridArray.length - 1; y++) {
        for (let x = 0; x < gridArray[0].length - 1; x++) {
            drawCircle(gridArray[y][x], randomInRange(maxSize));
        }
    }
}

function randomInRange(max) {
    return Math.random() * max;
}

function drawCircle(point, radius) {
    CTX.beginPath();
    CTX.arc(point.x, point.y, radius, 0, Math.PI * 2);
    CTX.closePath();
    CTX.fill();
}

function terrainNoise(pointArray, maxNoise, dotDampener) {
    let grid = [null];
    grid = pointArray;
    let rand;
    let randNum;
    for (let y = 0; y < grid.length - 1; y++) {
        for (let x = 0; x < grid[0].length - 1; x++) {
            randNum = Math.random();
            rand = randNum * maxNoise;
            grid[y][x].y -= rand;

            CTX.fillStyle = `rgb(${Math.ceil(randNum*110)},${Math.ceil(randNum*253)},${Math.ceil(randNum*210)})`;
            drawCircle(grid[y][x], rand / dotDampener);
        }
    }
    return grid;
}


/* function drawGridSquares (pointArray) {
    CTX.strokeStyle = 'black';
    CTX.lineWidth = 1;

    for (let i = 0; 0 < pointArray.length; i++) {
        CTX.strokeRect(pointArray[i].x*GRID_INTERVAL, pointArray[i].y*GRID_INTERVAL, GRID_INTERVAL, GRID_INTERVAL);
    }
} */

/* function drawLinesBetweenVertices (pointArray) {
    CTX.strokeStyle = 'black';
    CTX.lineWidth = 1;

    CTX.beginPath();
    CTX.moveTo(pointArray[0].x*GRID_INTERVAL, pointArray[0].y*GRID_INTERVAL);
    
    for (let i = 1; i < pointArray.length; i++) {
        //isNewRow(pointArray, i) ? CTX.moveTo(pointArray[i].x, pointArray[i].y) : CTX.lineTo(pointArray[i].x, pointArray[i].y);
        CTX.lineTo(pointArray[i].x*GRID_INTERVAL, pointArray[i].y*GRID_INTERVAL);
        CTX.lineTo(pointArray[i].x, pointArray[i].y + GRID_INTERVAL);
    }

    CTX.closePath();
    CTX.stroke();
} */

/* function isNewRow(pointArray, index) {
    return !!(pointArray[index].y - pointArray[index - 1].y);
}
 */