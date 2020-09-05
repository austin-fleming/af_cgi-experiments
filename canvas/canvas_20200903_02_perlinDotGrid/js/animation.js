// ..............................
// ......CANVAS VARIABLES........
// ..............................
const HTML_CANVAS_WRAPPER_ID = 'animation_wrapper';
const HTML_CANVAS_ID = 'animation';


// ..............................
// ......CANVAS SETUP............
// ..............................
const CANVAS_WRAPPER = document.getElementById(HTML_CANVAS_WRAPPER_ID);
const CANVAS = document.getElementById(HTML_CANVAS_ID);
const CTX = CANVAS.getContext('2d');

CANVAS.width = CANVAS_WRAPPER.offsetWidth;
CANVAS.height = CANVAS_WRAPPER.offsetHeight;

window.addEventListener('resize', () => {
    CANVAS.width = CANVAS_WRAPPER.offsetWidth;
    CANVAS.height = CANVAS_WRAPPER.offsetHeight;
});


// ..............................
// .....SIMULATION VARIABLES.....
// ..............................
const POINT_COLOR = 'magenta';
const Z_BASE = 1;

const FIELD_WIDTH = CANVAS.width;
const FIELD_HEIGHT = CANVAS.height;
const FIELD_INTERVAL = 28;

const PERLIN_SPREAD = 5;
const PERLIN_MAGNITUDE = 2;
const PERLIN_SPEED = 0.02*2;


// ..............................
// .....SIMULATION FUNCTIONS.....
// ..............................

function generateField(width, height) {
    let array3D = [];

    for (let y = 0; y < height; y++) {
        let arrayRow = new Array();
        for (let x = 0; x < width; x++) {
            arrayRow.push({
                x: x,
                y: y,
                z: Z_BASE,
                radius: 2
            })
        }
        array3D.push(arrayRow);
    }

    return array3D
}


function convertCartesianPointToIso (point) {
    return {
        x: (point.x - point.y),
        y: ((point.y + point.x) / 2),
        z: point.z,
        radius: point.radius
    }
}

function convertCartesianFieldToIso (fieldArray) {
    for (let y = 0; y < fieldArray.length; y++) {
        for (let x = 0; x < fieldArray[y].length; x++) {
            fieldArray[y][x] = convertCartesianPointToIso(fieldArray[y][x]);
        }
    }
    return fieldArray;
}

const positionField = (fieldArray, xOffset, yOffset) => {

    for (let y = 0; y < fieldArray.length; y++) {
        for (let x = 0; x < fieldArray[y].length; x++) {
            fieldArray[y][x].x += xOffset;
            fieldArray[y][x].y += yOffset;
        }
    }

    return fieldArray;
}



function renderField(fieldArray, perlinField, perlinStep) {
    // ! refactor to center before entering loop
    // Center grid on canvas
    const fieldCenterX = (fieldArray[0].length * FIELD_INTERVAL) / 2;
    const fieldCenterY = (fieldArray.length * FIELD_INTERVAL) / 2;
    // ! position without translate requirement
    /* CTX.save();
    CTX.translate((CANVAS.width / 2) - fieldCenterX, (CANVAS.height / 2) - fieldCenterY); */

    
    // Render each point according to z
    // ! convert to for loop for speed

    let perlinX;
    let perlinY;
    CTX.fillStyle = POINT_COLOR; // set point color before entering loop

    // ! draw lines
    fieldArray.forEach(row => {
        row.forEach(point => {
            // adjust step +/- to change angle of noise movement
            perlinX = (point.x / PERLIN_SPREAD) - perlinStep;
            perlinY = (point.y / PERLIN_SPREAD) + perlinStep;

            point.z = point.radius * (perlinField.get(perlinX, perlinY, Z_BASE) * PERLIN_MAGNITUDE);
            
            CTX.beginPath();
            CTX.arc((point.x * FIELD_INTERVAL), ((point.y + point.z) * FIELD_INTERVAL), point.z, 0, Math.PI * 2);
            CTX.fill();
            CTX.closePath();
            console.log(`${point.x} ${point.y} ${point.z} ${point.radius}`);

        })
    })

    // return origin
    /* CTX.restore(); */
}





const POINT_FIELD = generateField(45,30);
const ISO_POINT_FIELD = positionField(convertCartesianFieldToIso(POINT_FIELD), 26,-2);
const PERLIN_NOISE = new perlinNoise3d(); // init perlin field



let stepper = Math.PI;
function animate() {
    CTX.clearRect(0, 0, FIELD_WIDTH, FIELD_HEIGHT);

    
    renderField(ISO_POINT_FIELD, PERLIN_NOISE, stepper);

    stepper += PERLIN_SPEED;
    requestAnimationFrame(animate);
}

animate();



