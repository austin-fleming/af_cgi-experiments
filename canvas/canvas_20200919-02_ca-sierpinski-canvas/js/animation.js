import {
    getSierpinskiArray,
    getNextSierpinskiWrapped,
    renderGeneration,
} from './sierpinski.js'

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

const render = (context, generation, generationNumber, scalar) => {
    generation.map((cell, index) => {
        if (cell === 1) {
            context.beginPath()
            context.arc(
                index * scalar,
                generationNumber * scalar,
                1,
                0,
                Math.PI * 2
            )
            context.closePath()
            context.fill()
        }
    })
}

let generation = getSierpinskiArray(250)
render(CTX, generation, 0, 10)

let count = 1
CTX.fillStyle = '#FFFFFF'
const drawLoop = () => {
    generation = getNextSierpinskiWrapped(generation)
    render(CTX, generation, count, 5)

    count++
    requestAnimationFrame(drawLoop)
}

drawLoop()
