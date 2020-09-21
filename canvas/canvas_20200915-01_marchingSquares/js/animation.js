import { getVector3DBoolField, getVector3DFloatField, renderFloatField } from './vector.js'
import { setState } from './marchingsquares.js'

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

//! make a function so that you choose length by saying how many segments to break target to origin into + a margin
const F_CONFIG = {
    resolution: 40,
    diameter: 6,
    gate: 0.75,
}

const floatField = getVector3DBoolField(CANVAS.width, CANVAS.height, F_CONFIG.resolution, F_CONFIG.gate)

renderFloatField(CTX, floatField, F_CONFIG.diameter)

setState(CTX, floatField, F_CONFIG.resolution)

/* let counter = 1
//! try adding barrier
const drawLoop = () => {

    requestAnimationFrame(drawLoop, 1000)
}

drawLoop() */
