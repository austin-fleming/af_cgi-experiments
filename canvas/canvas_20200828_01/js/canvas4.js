import * as cnf from './config.js';
import * as ff from './ffactory.js';


const Canvas = new ff.canvas2D(cnf.canvas_id, cnf.wrapper_id);
window.addEventListener("resize", Canvas.resizeCanvas);
Canvas.setCursorStyle();

/* const Ball_01 = new ff.SimpleBall(Canvas.getCenter(), 40, cnf.dark_blue);
Ball_01.setSpeed(10);
Ball_01.randomTrajectory(); */

/* const generateBalls = (quantity, max_diam, max_speed) => {
	let ballArray = [];
	let cur_color;
	let cur_diam;
	for (let cur = 0; cur < quantity; cur++) {
		// set styles randomly
		cur_diam = Math.ceil(Math.random() * max_diam);
		cur_color = `rgb(120,20,${Math.floor(Math.random() * 255)})`;
		// init balls
		ballArray.push(new ff.SimpleBall(Canvas.getCenter(), cur_diam, cur_color));
		// set speed and trajectory
		ballArray[cur].setSpeed(max_speed);
		ballArray[cur].randomTrajectory();
	}
	return ballArray;
}

let ballArray = generateBalls(cnf.ball_quantity, cnf.max_ball_diam, cnf.ball_max_speed); */
const Balls = new ff.SimpleBallSimulation(cnf.ball_quantity, cnf.ball_diam_range, cnf.ball_speed_range, Canvas.getCenter());

const simulationLoop = () => {
	Canvas.ctx.clearRect(0, 0, Canvas.getDimensions().x, Canvas.getDimensions().y)
	Balls.renderBalls(Canvas.ctx, Canvas.getDimensions());
	
	window.requestAnimationFrame(simulationLoop);
}

simulationLoop();