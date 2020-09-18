import { LivingCircle, CircleFactory } from './circle.js'
import { BooleanField } from './field.js'
import { setIfFieldPointIsInCircle } from './marching.js'

// ..............................
// ......CANVAS VARIABLES........
// ..............................
const HTML_CANVAS_WRAPPER_ID = 'animation_wrapper'
const HTML_CANVAS_ID = 'animation'

// ..............................
// ......CANVAS SETUP............
// ..............................
const CANVAS_WRAPPER = document.getElementById(HTML_CANVAS_WRAPPER_ID)
const CANVAS = document.getElementById(HTML_CANVAS_ID)
const CTX = CANVAS.getContext('2d')

CANVAS.width = CANVAS_WRAPPER.offsetWidth
CANVAS.height = CANVAS_WRAPPER.offsetHeight

CTX.fillStyle = 'rgb(255,255,255)'
CTX.strokeStyle = 'rgba(100,255,20,0.5)'
CTX.lineWidth = 5
let Circles = new CircleFactory(10)
let Field = new BooleanField(CANVAS, 80)

const drawLoop = () => {
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height)
    setIfFieldPointIsInCircle(Field, Circles)
    Field.render(CTX)
    Circles.update(CANVAS, CTX)
    requestAnimationFrame(drawLoop)
}

drawLoop()
