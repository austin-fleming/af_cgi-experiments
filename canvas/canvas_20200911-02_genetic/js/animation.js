/* import { Chromosome } from "./chromosome.js";
import { Population } from "./population.js";
import { Target } from "./target.js"; */
import {
  createRandomPopulation,
  createNewPopulation,
  renderChromosome,
  renderPopulation,
} from "./genetic.js";

// ..............................
// ......CANVAS VARIABLES........
// ..............................
const HTML_CANVAS_WRAPPER_ID = "animation_wrapper";
const HTML_CANVAS_ID = "animation";

// ..............................
// ......CANVAS SETUP............
// ..............................
const CANVAS_WRAPPER = document.getElementById(HTML_CANVAS_WRAPPER_ID);
const CANVAS = document.getElementById(HTML_CANVAS_ID);
const CTX = CANVAS.getContext("2d");

CANVAS.width = CANVAS_WRAPPER.offsetWidth;
CANVAS.height = CANVAS_WRAPPER.offsetHeight;

const CONFIG = {
  populationSize: 10,
  maxDelta: 20,
  geneQuantity: 10,
  origin: { x: CANVAS.width / 2, y: CANVAS.height / 2 },
  target: { x: CANVAS.width / 4, y: CANVAS.height / 4, radius: 50 },
};

const firstPop = createRandomPopulation(
  CONFIG.populationSize,
  CONFIG.geneQuantity
);
let currentPop = createNewPopulation(firstPop, CONFIG.maxDelta, CONFIG.origin);

const drawLoop = () => {
  currentPop = createNewPopulation(
    [...currentPop],
    CONFIG.maxDelta,
    CONFIG.origin
  );

  console.log(currentPop);
  //CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
  CTX.strokeStyle = "rgba(255,255,255,1)";
  CTX.lineWidth = 1;
  renderPopulation(CTX, currentPop);
  console.log("loop");
  requestAnimationFrame(drawLoop, 1000 / 2);
};

drawLoop();
