import {
  convertCartToIso,
  getTrefoilCoordinates,
  getType4Coordinates,
  getType5Coordinates,
  getCircleCoordinates,
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

const testRect = Object({
  a: convertCartToIso({ x: 800, y: 400, z: 0 }),
  b: convertCartToIso({ x: 800, y: 500, z: 0 }),
  c: convertCartToIso({ x: 900, y: 500, z: 0 }),
  d: convertCartToIso({ x: 900, y: 400, z: 0 }),
});

CTX.fillStyle = "#ffffff";
CTX.beginPath();
CTX.moveTo(testRect.a.x, testRect.a.y);
CTX.lineTo(testRect.b.x, testRect.b.y);
CTX.lineTo(testRect.c.x, testRect.c.y);
CTX.lineTo(testRect.d.x, testRect.d.y);
CTX.closePath();
CTX.fill();

let u = 0;
let coords = {};
const scaler = 2;

let t = 0;
let circCoords = {};

const drawLoop = () => {
  if (u >= Math.PI * 2) {
    u = 0;
    coords = {};
  }

  if (t >= 360) {
    t = 0;
  }

  circCoords = convertCartToIso(getCircleCoordinates(500, 500, 80, t));
  CTX.fillStyle = "rgba(255,255,255,0.1)";
  CTX.beginPath();
  CTX.arc(circCoords.x + 500, circCoords.y, 2, 0, Math.PI * 2);
  CTX.closePath();
  CTX.fill();
  //CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);

  coords = convertCartToIso(getTrefoilCoordinates(u));
  CTX.fillStyle = "rgba(255,255,255,0.1)";
  CTX.beginPath();
  CTX.arc(
    coords.x * scaler + cnvCntr.x,
    coords.y * scaler + cnvCntr.y,
    2,
    0,
    Math.PI * 2
  );
  CTX.closePath();
  CTX.fill();

  u += 0.01;
  t += 0.01;
  requestAnimationFrame(drawLoop, 1000 / 30);
};

drawLoop();
