import {
  getTrefoilCoordinates,
  getType4Coordinates,
  getType5Coordinates,
} from "./knots.js";

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

const cnvCntr = { x: CANVAS.width / 2, y: CANVAS.height / 2 };

let u = 0;
let coords = {};
const scaler = 2;

const drawLoop = () => {
  if (u >= Math.PI * 2) {
    u = 0;
    coords = {};
  }

  //CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);

  coords = getTrefoilCoordinates(u);
  CTX.fillStyle = "rgba(255,255,255,0.1)";
  CTX.beginPath();
  CTX.arc(
    coords.x * scaler + cnvCntr.x,
    coords.z * scaler + cnvCntr.y,
    2,
    0,
    Math.PI * 2
  );
  CTX.closePath();
  CTX.fill();

  CTX.fillStyle = "rgba(255,255,255,0.1)";
  CTX.beginPath();
  CTX.arc(
    coords.x * scaler + 10 + cnvCntr.x,
    coords.z * scaler - 10 + cnvCntr.y,
    2,
    0,
    Math.PI * 2
  );
  CTX.closePath();
  CTX.fill();

  // for some reason, offset the coords.x by coords.y changes the trajectory massively, but still says in sync
  CTX.fillStyle = "rgba(255,255,255,0.1)";
  CTX.beginPath();
  CTX.arc(
    coords.x * scaler - coords.y * 2 + cnvCntr.x,
    coords.z * scaler - 10 + cnvCntr.y,
    2,
    0,
    Math.PI * 2
  );
  CTX.closePath();
  CTX.fill();

  CTX.fillStyle = "rgba(255,255,255,0.1)";
  CTX.beginPath();
  CTX.arc(
    coords.x * scaler + 10 + cnvCntr.x,
    coords.z * scaler - coords.y + cnvCntr.y,
    2,
    0,
    Math.PI * 2
  );
  CTX.closePath();
  CTX.fill();

  console.log(u);

  u += 0.01;
  requestAnimationFrame(drawLoop, 1000 / 30);
};

drawLoop();
