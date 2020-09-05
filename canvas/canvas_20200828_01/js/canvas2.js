import * from


const fontStyle = () => {
	ctx.font = '30px Arial';
	ctx.fillStyle = 'rgb(255,255,255)';
}



const ball_1 = {
	x: 100,
	y: 100,
	radius: 40,
	dx: 5,
	dy: 5,
	color: '#0022FF'
}

const renderBall = ball => {
	ctx.beginPath();
	ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true);
	ctx.fillStyle = ball.color;
	ctx.fill()
}


const nextAnimationFrame = () => {
	clearCanvas();
	renderBall(ball_1);
	// collision detection
	if (ball_1.x - ball_1.radius <= 0 || ball_1.x + ball_1.radius >= canvas.width) { ball_1.dx *= -1; }
	if (ball_1.y - ball_1.radius <= 0 || ball_1.y + ball_1.radius >= canvas.height) { ball_1.dy *= -1; }
	// change ball position
	ball_1.x += ball_1.dx;
	ball_1.y += ball_1.dy;
	requestAnimationFrame(nextAnimationFrame);
}


const programLoop = () => {
	setCanvasWidth();
	
	nextAnimationFrame();
}


programLoop();