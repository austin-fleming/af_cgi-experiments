




const container_elem = document.getElementById('sketch_holder');

let cnv;
const interval = 15;
const diam_unselected = 0;
const diam_selected = 10;
const sensitivity = 200;
let mouse_point;
let Grid = [];
//let mouse_distance;
//let multiply_factor;

// normalize values
const normalize = (val, max, min) => {
	return (val - min) / (max - min);
}
// get distance between point and cursor
const getDistance = (point, mouse_point) => {
	return Math.abs(dist(point.x, point.y, mouse_point.x, mouse_point.y));
}

const generateGrid = interval => {
    let grid = [];
    for (let x = 0; x <= width; x += interval) {
		for (let y = 0; y <= height; y += interval) {
			grid.push(createVector(x,y));
		}
    }
    return grid;
}

const renderGrid = (grid, sensitivity, mouse_point, unselected_diam, selected_diam) => {
    let mouse_distance;
    let adjusted_diam;
    grid.forEach(point => {
        adjusted_diam = unselected_diam;
        mouse_distance = getDistance(point, mouse_point);
        if (mouse_distance < sensitivity) {
            adjusted_diam += normalize(mouse_distance, 0, sensitivity) * selected_diam;
        }
        ellipse(point.x, point.y, adjusted_diam, adjusted_diam);
    });
}




function setup () {
    frameRate(25);
	cnv = createCanvas(container_elem.offsetWidth, container_elem.offsetHeight);
    cnv.parent('sketch_holder');
    Grid = generateGrid(interval);
    mouse_point = createVector(0,0);
}


function draw () {
	background(0);
	noStroke();
    fill(255);

    mouse_point.x = mouseX;
    mouse_point.y = mouseY;

    renderGrid(Grid, sensitivity, mouse_point, diam_unselected, diam_selected);

	text(deltaTime, width / 2, height / 2);
}