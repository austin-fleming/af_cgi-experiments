// HTML canvas container vars
const containerID = 'sketch_holder';
const canvasContainer = document.getElementById(containerID);
// HTML input container vars
const inputMaxSpeedID = 'input_maxSpeed';
const inputBallQuantityID = 'input_ballquantity';
const inputMaxSizeID = 'input_maxSize';
const maxSpeedContainer = document.getElementById(inputMaxSpeedID);
const maxSizeContainer = document.getElementById(inputMaxSizeID);
const ballQuantityContainer = document.getElementById(inputBallQuantityID);
let maxSpeedSlider;
let maxSizeSlider;
let ballQuantitySlider;
// HTML toggle container vars
const drawToggleID = 'draw_toggle';
const drawToggleElem = document.getElementById(drawToggleID);
// background vars
const color_bg = 'rgb(20,20,20)';
const color_bg_frame = 'rgba(20,20,20,.1)';
// Ball vars
const maxSpeed = 20;
const maxBallDiam = 80;
const maxBallQuantity = 25;
// global variable to store balls
let Balls = [];
// canvas object
let cnv;

class Ball {
	constructor(maxDiam, maxSpeed, xPos, yPos) {
		this.xPos = xPos;
		this.yPos = yPos;
		this.diam = Math.ceil(Math.random() * maxDiam);
		this.invertFactorX = 1;
		this.invertFactorY = 1;
		this.vectorX = Math.random();
		this.vectorY = Math.random();
		this.speed = Math.ceil(Math.random() * maxSpeed);
		this.color = color(this.randColor(), this.randColor(), this.randColor());
	}
	randColor() {
		return Math.ceil(Math.random() * 255);
	}
	draw() {
		fill(this.color);
		ellipse(this.xPos, this.yPos, this.diam, this.diam);
	}
	move(canvasWidth, canvasHeight) {
		if (this.xPos + this.diam/2 >= canvasWidth || this.xPos - this.diam/2 <= 0) {
			this.invertFactorX *= -1;
		}
		if (this.yPos + this.diam/2 >= canvasHeight || this.yPos - this.diam/2 <= 0) {
			this.invertFactorY *= -1;
		}

		this.xPos += this.speed * this.invertFactorX * this.vectorX;
		this.yPos += this.speed * this.invertFactorY * this.vectorY;
		this.draw()
	}
}

// generate array of ball elements
const makeBalls = (quantity, maxDiameter, maxSpeed) => {
	let balls = [];
	for (let x = 0; x < quantity; x++) {
		balls.push(new Ball(maxDiameter, maxSpeed, cnv.width/2, cnv.height/2));
	}
	return balls;
}

const getCanvasContainerWidth = (container) => {
	return container.offsetWidth;
}

const resizeCanvasToContainer = (container) => {
	let cnv_width = getCanvasContainerWidth(container);
	resizeCanvas(cnv_width, cnv_width);
	background(color(color_bg));
}

const programLoop = (runToggle) => {
	// while mouse isn't pressed, run program
	if (runToggle) {
		background(color(color_bg_frame));
		// move each ball
		for(let ball = 0; ball < Balls.length; ball++) {
			Balls[ball].move(cnv.width, cnv.height);
		}
	}
}

const toggleRunProgram = () => {
	runProgram = !runProgram;
}

/* =========================
......Prorgram Loops........ 
========================= */

let drawToggleButton;
let runProgram = false;

function setup() {
	// create canvas and assign it to html container
	const initial_cnv_width = getCanvasContainerWidth(canvasContainer);
	cnv = createCanvas(initial_cnv_width, initial_cnv_width);
	cnv.parent(canvasContainer);

	// create playback button
	drawToggleButton = createButton('Toggle Playback');
	drawToggleButton.parent(drawToggleElem);

	// create input sliders
	ballQuantitySlider = createSlider(1, maxBallQuantity, maxBallQuantity/2, 1);
	ballQuantitySlider.parent(inputBallQuantityID);

	maxSpeedSlider = createSlider(1, maxSpeed, maxSpeed/2, 1);
	maxSpeedSlider.parent(inputMaxSpeedID);

	maxSizeSlider = createSlider(1, maxBallDiam, maxBallDiam/2, 1);
	maxSizeSlider.parent(inputMaxSizeID);


	// init background
	background(color(color_bg));
	// init balls
	Balls = makeBalls(ballQuantity, maxDiameter, maxSpeed);
}

function draw() {
	drawToggleButton.mousePressed(toggleRunProgram);
	// if html container resized, resize canvas
	if (cnv.width != getCanvasContainerWidth(canvasContainer)) {
		resizeCanvasToContainer(canvasContainer);
	}
	
	programLoop(runProgram);
}
