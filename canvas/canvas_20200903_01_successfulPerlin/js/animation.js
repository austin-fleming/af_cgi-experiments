const CANVAS_WRAPPER = document.getElementById('animation_wrapper');
const CANVAS = document.getElementById('animation');
const CTX = CANVAS.getContext('2d');

CANVAS.width = CANVAS_WRAPPER.offsetWidth;
CANVAS.height = CANVAS_WRAPPER.offsetHeight;

window.addEventListener('resize', () => {
    CANVAS.width = CANVAS_WRAPPER.offsetWidth;
    CANVAS.height = CANVAS_WRAPPER.offsetHeight;
    setup();
});




function setup() {
    // circle at canvas center
    CTX.strokeStyle = 'rgba(255,255,255,0.7)';
    CTX.lineWidth = 4;
    CTX.beginPath();
    CTX.arc(CANVAS.width / 2, CANVAS.height / 2, 10, 0, Math.PI * 2);
    CTX.stroke();
    CTX.closePath();
    // cross lines at canvas center
    CTX.strokeStyle = 'rgba(255,255,255,0.3)';
    CTX.lineWidth = 1;
    CTX.beginPath();
    CTX.moveTo(0, 0);
    CTX.lineTo(CANVAS.width, CANVAS.height);
    CTX.moveTo(CANVAS.width, 0);
    CTX.lineTo(0, CANVAS.height);
    CTX.stroke();
    CTX.closePath();

    CTX.save();
    CTX.translate(CANVAS.width / 2, CANVAS.height / 2);

    CTX.strokeStyle = 'rgba(255,0,0,0.7)';
    CTX.lineWidth = 4;

    CTX.beginPath();
    CTX.arc(0, 0, 10, 0, Math.PI * 2);
    CTX.stroke();
    CTX.closePath();

    CTX.beginPath();
    CTX.arc(CANVAS.width / -2, CANVAS.height / -2, 10, 0, Math.PI * 2);
    CTX.stroke();
    CTX.closePath();

    CTX.restore();
}


function generateField(width, height) {
    let array3D = [];

    for (let y = 0; y < height; y++) {
        let arrayRow = new Array();
        for (let x = 0; x < width; x++) {
            arrayRow.push({
                x: x,
                y: y,
                z: 0,
                zBase: 0
            })
        }
        array3D.push(arrayRow);
    }

    return array3D
}


function renderField(fieldArray, radius, scale, perlinField, perlinSpread, perlinMagnitude, perlinStep) {

    // Center grid on canvas
    const fieldCenterX = (fieldArray[0].length * scale) / 2;
    const fieldCenterY = (fieldArray.length * scale) / 2;
    CTX.save();
    CTX.translate((CANVAS.width / 2) - fieldCenterX, (CANVAS.height / 2) - fieldCenterY);

    let perlinX;
    let perlinY;
    // Render each point according to z
    // ! convert to for loop for speed
    fieldArray.forEach(row => {
        row.forEach(point => {
            point.zBase = radius;
            point.z = radius * Math.random();

            CTX.fillStyle = 'rgb(10,10,10)';
            CTX.beginPath();
            CTX.arc((point.x * scale), (point.y * scale), point.zBase, 0, Math.PI * 2);
            CTX.fill();
            CTX.closePath();
            // random static
            /* CTX.fillStyle = 'red';
            CTX.beginPath();
            CTX.arc((point.x * scale), (point.y * scale), point.z, 0, Math.PI * 2);
            CTX.fill();
            CTX.closePath(); */
            // perlin
            perlinX = (point.x / perlinSpread) - perlinStep;
            perlinY = (point.y / perlinSpread) - perlinStep;
 
            point.z = radius * (perlinField.get(perlinX, perlinY, point.zBase) * perlinMagnitude);
            CTX.fillStyle = 'green';
            CTX.beginPath();
            CTX.arc((point.x * scale), (point.y * scale), point.z, 0, Math.PI * 2);
            CTX.fill();
            CTX.closePath();
        })
    })

    // return origin
    CTX.restore();
}



const PERLIN_SPREAD = 8;
const PERLIN_MAGNITUDE = 2;
const PERLIN_SPEED = 0.02*10;

const POINT_FIELD = generateField(45,30);
const PERLIN_NOISE = new perlinNoise3d();

let stepper = Math.PI;
function animate() {
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
    
    renderField(POINT_FIELD, 10, 30, PERLIN_NOISE, PERLIN_SPREAD, PERLIN_MAGNITUDE, stepper);

    stepper += PERLIN_SPEED;
    requestAnimationFrame(animate);
}



setup();
animate();



