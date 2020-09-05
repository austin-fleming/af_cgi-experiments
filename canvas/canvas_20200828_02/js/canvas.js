import * as ff from './ff.js';

// globals.........................................
let mouse = { x: 0, y: 0 };
const SENSITIVITY = 100;
const GRID_INTERVAL = 20;
const MIN_DIAM = 0;
const MAX_DIAM = 10;

// setup canvas....................................
const CanvasWrapper = document.getElementById('canvas_wrapper');
const Canvas = document.getElementById('sketch_holder');
const Ctx = Canvas.getContext('2d');
setCanvasSize(); // set initial canvas size

// setup Grid......................................
let grid = generateGrid(GRID_INTERVAL);

// setup events....................................
window.addEventListener('mousemove', event => {
    mouse = ff.getMousePosition(Canvas, event);
}, false);

window.addEventListener('resize', _ => {
    setCanvasSize(); // reset canvas size if window resized.
    grid = generateGrid(GRID_INTERVAL)
}, false);





function draw () {
    Ctx.clearRect(0, 0, Canvas.width, Canvas.height);
    // circle following cursor
    /* ctx.strokeStyle = 'rgba(200,200,200)';
    ctx.lineWidth = 1;
    drawCircle(mouse, sensitivity*2);
    ctx.stroke(); */
    // draw grid
    drawGrid(grid)

    requestAnimationFrame(draw);
}

draw();

function drawGrid (pointArray) {
    let curDiam;
    let curDist;
    let diamMultiplier;
    Ctx.fillStyle = 'rgb(200,200,200)';
    pointArray.forEach( point => {
        curDist = getDist(point, mouse);

        if (curDist < SENSITIVITY) {
            // normalize distance to value between 0 and 1 to use as multiplier
            // max/min inverted to create largest in center
            diamMultiplier = normalize(curDist, SENSITIVITY, 0);
            // MIN_DIAM added to diameter argument raise 'z-level' to match rest of grid
            drawCircle(point, (MAX_DIAM * diamMultiplier) + MIN_DIAM);
        } else {
            drawCircle(point, MIN_DIAM);
        }
            
        Ctx.fill();
    })
}

function drawCircle (center_point, diameter) {
    Ctx.beginPath();
    Ctx.arc(center_point.x, center_point.y, diameter/2, 0, Math.PI * 2, true);
    Ctx.closePath();
}

function generateGrid (gridInterval) {

    let pointArray = [];

    for (let x = 0; x <= Canvas.width; x += gridInterval) {
        for (let y = 0; y <= Canvas.height; y += gridInterval) {
            pointArray.push(new ff.Vector(x, y));
        }
    }

    console.log('new grid');
    return pointArray;
}

//................
//...Helpers......
//................

function setCanvasSize () {
    Canvas.width = CanvasWrapper.offsetWidth;
    Canvas.height = CanvasWrapper.offsetHeight;
}

function getDist (point_1, point_2) {
    return Math.sqrt(Math.pow(point_2.x - point_1.x, 2) + Math.pow(point_2.y - point_1.y, 2));
}

function normalize (value, min, max) {
    return (value - min) / (max - min);
}



/* Notes...............................................................
if in radius: increment +1 to radius up to _max_size
if outside radius: decrement by -1 to radius until it reaches _size

*/