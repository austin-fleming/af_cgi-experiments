import { Chromosome } from "./chromosome.js";
import { Population } from "./population.js";
import { Target } from "./target.js";

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
  maxDelta: 10,
  geneQuantity: 100,
  origin: { x: CANVAS.width / 2, y: CANVAS.height / 2 },
  target: { x: CANVAS.width / 4, y: CANVAS.height / 4, radius: 50 },
};

let TestPopulation = new Population(CONFIG);
const SimulationTarget = new Target(CONFIG);

console.log(TestPopulation.getCurrentPopulation());

const drawLoop = () => {
  CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
  CTX.strokeStyle = "rgba(255,255,255,1)";
  CTX.lineWidth = 0.5;
  TestPopulation.updatePopulation();
  TestPopulation.render(CTX);
  SimulationTarget.render(CTX);
  window.requestAnimationFrame(drawLoop);
};

drawLoop();
