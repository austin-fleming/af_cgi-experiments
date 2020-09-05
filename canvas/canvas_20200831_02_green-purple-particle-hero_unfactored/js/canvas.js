import * as ff from './ff.js';
import {default as config} from './config.js';

/* const CONFIG = JSON.parse('config.json');
 */
const MOUSE = {
    x: null,
    y: null,
    radius: config.pointer.radius
}

let particleArray = [];





// setup canvas....................................
const CanvasWrapper = document.getElementById('canvas_wrapper');
const Canvas = document.getElementById('sketch_holder');
const Ctx = Canvas.getContext('2d');
setCanvasSize(); // set initial canvas size

/* Ctx.strokeStyle = 'white';
Ctx.strokeRect((Canvas.width/2 - 50), (Canvas.height/2 - 120), 180, 180); */
window.addEventListener('mousemove', event => {
    MOUSE.x = event.x;
    MOUSE.y = event.y;
});

/* window.addEventListener('resize', _ => {
    setCanvasSize();
}); */







drawWord();


const textCoordinates = Ctx.getImageData(0, 0, 180, 180);








class Particle {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.size = config.particle.size;
        this._density = (Math.random() * config.particle.maxDensity) + 1;
        this._baseColor = config.particle.color;
        this._randColor;
        this._currColor;
        this.baseX = this.x;
        this.baseY = this.y;
        this._forceMultiplier = config.particle.forceFactor;
    }
    draw () {
        let rand = Math.random();
        let randDistort = rand *config.particle.distortion;
        
        if (Math.abs(this.y - this.baseY) > randDistort) {
            this._currColor = this._baseColor;
        } else {
            this._currColor = this._setRandColor(rand);
        }

        Ctx.fillStyle = this._currColor;
        Ctx.beginPath();
        Ctx.arc(this.x + randDistort, this.y, this.size, 0, Math.PI * 2);
        Ctx.closePath();
        Ctx.fill();
    }
    update () {
        let returnSpeedfactor = 20;
        let dx = MOUSE.x - this.x;
        let dy = MOUSE.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = MOUSE.radius;
        // convert to between 0 and 1
        let force = (maxDistance - distance) / maxDistance;
        // density helps particles move at different speeds
        let directionX = forceDirectionX * force * this._density * this._forceMultiplier;
        let directionY = forceDirectionY * force * this._density * this._forceMultiplier;
        if ( distance < config.pointer.radius) {
            this.x -= directionX;
            this.y -= directionY;
        } else {
            // return to start
            // divisor used to adjust return speed
            if (this.x !== this.baseX) {
                dx = this.x - this.baseX;
                this.x -= dx / returnSpeedfactor;
            }
            if (this.y !== this.baseY) {
                dy = this.y - this.baseY;
                this.y -= dy / returnSpeedfactor;
            }
        }
    }
    _setRandColor(rand) {
        return `rgb(${Math.ceil(rand*100 +120)},255,${Math.ceil(rand*200)})`;
    }
}


// uses image data to generate particles for only the opaque pixels (why background must be transparent).
// TODO: find a way to center text.
function initParticle() {
    const SIZE_MULTIPLIER = 8; // increases size and spacing
    // Allows adjusting final position of text.
    const X_OFFSET = 250;
    const Y_OFFSET = 0;
    let x2 = textCoordinates.width;
    let y2 = textCoordinates.height;
    for (let y = 0; y < y2; y++) {
        for (let x = 0; x < x2; x++) {
            // reads Uint8ClampedArray. 255 is full opacity. 128 is half opacity.
            // every 4th pixel holds transparency value
            if (textCoordinates.data[y * (4 * textCoordinates.width) + (x * 4) + 3] > 0) {
                let positionX = x * SIZE_MULTIPLIER + X_OFFSET;
                let positionY = y * SIZE_MULTIPLIER + Y_OFFSET;
                particleArray.push(new Particle(positionX, positionY));
                
            } 
        }
    }
}

initParticle();




function animate() {
    Ctx.clearRect(0, 0, Canvas.width, Canvas.height);

    
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
        particleArray[i].draw();
    };

    console.log(MOUSE.x)
    
    requestAnimationFrame(animate);
}

animate();



// HELPERS..............................................
function setCanvasSize () {
    Canvas.width = CanvasWrapper.offsetWidth;
    Canvas.height = CanvasWrapper.offsetHeight;
}

function drawWord() {
    Ctx.fillStyle = config.font.color;
    Ctx.font = config.font.style;
    Ctx.fillText('F.Factory', 0, 40);
    Ctx.fillText('', 0, 80);
    Ctx.closePath();
}