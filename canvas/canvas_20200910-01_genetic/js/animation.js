import { initOrganism, renderOrganism, updateDNA } from "./organism.js";
import { initFirstGeneration, renderGeneration } from "./generation.js";
import {
  getFitnessScoresForGeneration,
  createNewGeneration,
} from "./fitness.js";

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

const POPULATION_SIZE = 10;
const ORGANISM_POINTS = 100;
const MAX_DELTA = 100;
const ORGANISM_ORIGIN = Object({ x: CANVAS.width / 2, y: CANVAS.height / 2 });
const TARGET = Object({ x: CANVAS.width / 4, y: CANVAS.height / 4 });

let currentGeneration = initFirstGeneration(
  POPULATION_SIZE,
  ORGANISM_POINTS,
  ORGANISM_ORIGIN,
  MAX_DELTA
);

const drawLoop = () => {
  CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
  CTX.strokeStyle = "rgba(255,255,255,0.1)";
  renderGeneration(CTX, currentGeneration);
  currentGeneration = createNewGeneration(currentGeneration);
  currentGeneration = [...updateDNA(currentGeneration)];
  console.log("loop");
  window.requestAnimationFrame(drawLoop);
};

drawLoop();
