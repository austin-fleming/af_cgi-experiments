import { CircleMover } from './circles.js'

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

const F_CONFIG = {
    resolution: 40,
    diameter: 6,
    gate: 0.75,
}

let circle = new CircleMover()
circle.update(CANVAS)
console.log(circle)
const drawLoop = () => {
    circle.render(CTX)
    CTX.arc(600, 600, 80, 0, Math.PI * 2)
    CTX.stroke()
    requestAnimationFrame(drawLoop)
}

drawLoop()
