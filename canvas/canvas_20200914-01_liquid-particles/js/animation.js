import {
    initFirstPopulation,
    createNewPopulation,
    logPopulation,
    renderPopulation,
} from './genetic.js'

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
const CONFIG = {
    populationSize: 100,
    genomeLength: 200,
    maxSegmentLength: 20,
    mutationRate: 0.03,
    probabilityFactor: 100,
    origin: { x: CANVAS.width / 4, y: CANVAS.height / 4 },
    target: {
        x: (CANVAS.width / 4) * 3,
        y: (CANVAS.height / 4) * 3,
        radius: 10,
    },
}

let currentGeneration = initFirstPopulation(CONFIG)
logPopulation(currentGeneration, 0)

let counter = 1
//! try adding barrier
const drawLoop = () => {
    currentGeneration = createNewPopulation(currentGeneration, CONFIG)
    logPopulation(currentGeneration, counter)
    counter++
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height)
    CTX.strokeStyle = 'rgb(255,255,255)'
    CTX.lineWidth = 1
    CTX.beginPath()
    CTX.arc(
        CONFIG.target.x,
        CONFIG.target.y,
        CONFIG.target.radius,
        0,
        Math.PI * 2
    )
    CTX.closePath()
    CTX.stroke()
    CTX.strokeStyle = 'rgba(255,255,255,.8)'
    CTX.lineWidth = 0.5
    renderPopulation(CTX, currentGeneration)
    //renderPopulation(CTX, currentPop)

    requestAnimationFrame(drawLoop, 1000)
}

drawLoop()
