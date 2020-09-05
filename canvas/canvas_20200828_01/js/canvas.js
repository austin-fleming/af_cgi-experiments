const canvas_wrapper = document.getElementById('canvas_wrapper');
const canvas = document.getElementById('sketch_holder');
const ctx = canvas.getContext('2d');


class Vector {
	constructor(x, y, z = 0) {
		this.x = x;
		this.y = y;
		this.z = z;
	}
}

// set canvas to dimensions of wrapper
const setCanvasWidth = () => {
	canvas.width = canvas_wrapper.offsetWidth;
	canvas.height = canvas_wrapper.offsetHeight;
}

const centerObject = object_width => {
	let tup = [canvas.width / 2 - object_width / 2, canvas.height / 2 - object_width / 2];
	return tup;
}

const fontStyle = () => {
	ctx.font = '30px Arial';
	ctx.fillStyle = 'rgb(255,255,255)';
}

const drawTriangle = (width, startingVector) => {
	ctx.beginPath();
	ctx.moveTo(startingVector.x, startingVector.y);
	ctx.lineTo(startingVector.x + width, startingVector.y);
	ctx.lineTo(startingVector.x + width / 2, startingVector.y + width);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
}

const drawInvertedTriangle = (width, startingVector) => {
	ctx.beginPath();
	ctx.moveTo(startingVector.x, startingVector.y + width);
	ctx.lineTo(startingVector.x + width, startingVector.y + width);
	ctx.lineTo(startingVector.x + width / 2, startingVector.y);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
}

const drawRectangle = (width, height, startingVector) => {
	ctx.beginPath();
	ctx.rect(startingVector.x, startingVector.y, width, height);
	ctx.fill();
	ctx.stroke();
}

const clearCanvas = () => {
	ctx.clearRect(0, 0, ctx.width, ctx.height);
}


const programLoop = () => {

	let square_width = 50;
	ctx.fillStyle = 'rgb(20,20,255)';
	ctx.fillRect(centerObject(square_width)[0], centerObject(square_width)[1], 50, 50);
	ctx.clearRect(canvas.width / 2 - 5, canvas.height / 2 - 5, 10, 10);

	let Tri_Vector = new Vector(100, 100);
	drawTriangle(50, Tri_Vector);
	drawInvertedTriangle(50, Tri_Vector);

	ctx.fillStyle = 'teal';
	let Rect_Vector = new Vector(200, 100);
	drawRectangle(50, 100, Rect_Vector);
}

const programAnimate = () => {
	console.log('begin');
	setCanvasWidth();
	console.log('canvas width set');


	let frameCount = 1;
	let canvasSpeed = 1;
	console.log('entering while');
	while (canvasSpeed <= canvas.width) {
		console.log(frameCount);
		clearCanvas();

		fontStyle();
		console.log(`frame: ${frameCount}`)

		setTimeout(programLoop(), 100);

		ctx.translate(canvasSpeed, canvasSpeed);
		frameCount++;
	}
	console.log('exited while');
}

programAnimate();