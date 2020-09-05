
const color_bg = 205;

const resX = 600;
const resY = 600;

const maxStep = 10;

let xPos = resX / 2;
let yPos = resY / 2;

const mouseEffect = () => {
	if (mouseIsPressed) {
		fill(255);
		stroke(0);
	} else {
		fill(0);
		stroke(255);
	}
}

const randomStep = maxStep => {
	let num = (Math.random() * maxStep) - (maxStep / 2);
	console.log(num);
	return num;
}


function setup() 
{
	createCanvas(resX, resY);
	background(20);
}

function draw()
{
	ellipse(xPos, yPos, 80, 80);
	ellipse(yPos, xPos, 80, 80)
	mouseEffect();

	xPos += randomStep(maxStep);
	yPos += randomStep(maxStep);
}
