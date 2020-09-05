import * as ff from './ffactory.js';

// -- Start Config
const ballQuantity = 20;
const maxBallSize = 40;



const generateBalls = (ballQuantity, maxBallSize, canvas) => {
	let ballArray = [];
	let currentBallSize;
	let currentBallColor;
	const start_point = canvas.getCenter();
	for (let n = 0; n < ballQuantity; n++) {
		currentBallSize = Math.random() * (maxBallSize / 2);
		currentBallColor = `rgb(20,20,${Math.floor(Math.random() * 255)})`; // generate random hue of blue
		console.log(currentBallColor);
		ballArray.push(new ff.SimpleBall(canvas.getCenter(), 20));
		ballArray[n].setFill(currentBallColor);
		ballArray[n].setCollisionDetection(true, start_point);
	}
	return ballArray;
}

const renderBalls = (ballArray, ctx) => {
	ctx.fillStyle = 'rgb(0,0,0)';
	console.log(ctx);
	ballArray.forEach(ball => {
		ball.update(ctx);
		console.log(ball);
	})
}

/* const canvas_wrapper = document.getElementById('canvas_wrapper');
const canvas = document.getElementById('sketch_holder');
const ctx = canvas.getContext('2d');

canvas.width = canvas_wrapper.offsetWidth;
canvas.height = canvas_wrapper.offsetHeight; */

const program = () => {

	const canvas = new ff.canvas2D('sketch_holder', 'canvas_wrapper');
	//canvas.updateDimensions();
	const ballArray = generateBalls(ballQuantity, maxBallSize, canvas);

	renderBalls(ballArray, canvas.ctx);

	canvas.ctx.fillStyle = 'rgb(20,20,20)';
	canvas.ctx.beginPath();
	canvas.ctx.arc(200, 200, 40, 0, Math.PI * 2, true);
	canvas.ctx.closePath();
	canvas.ctx.fill();
}


program();
