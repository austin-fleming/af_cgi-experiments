import { initRandomBinaryField, updateField } from './gameoflife.js'

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

const render = (context, generation, scalar) => {
    generation.forEach((column, xIndex) =>
        column.forEach((cell, yIndex) => {
            if (cell === 1) {
                context.beginPath()
                context.arc(xIndex * scalar, yIndex * scalar, 2, 0, Math.PI * 2)
                context.closePath()
                context.fill()
            }
        })
    )
}

const SCALAR = 10
const COLUMNS = CANVAS.width / SCALAR
const ROWS = CANVAS.height / SCALAR

let generation = initRandomBinaryField(COLUMNS, ROWS)
render(CTX, generation, SCALAR)

let count = 1
CTX.fillStyle = '#FFFFFF'
const drawLoop = () => {
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height)
    generation = updateField(generation)
    render(CTX, generation, SCALAR)

    count++
    requestAnimationFrame(drawLoop, 1000)
}

drawLoop()
