




const container_elem = document.getElementById('sketch_holder');

let cnv;
const interval = 15;
const diam_unselected = 0;
const diam_selected = 10;
const sensitivity = 200;
let mouse_distance;
let multiply_factor;

// normalize values
const normalize = (val, max, min) => {
	return (val - min) / (max - min);
}
// get distance between point and cursor
const getDistance = (pX, pY, mX, mY) => {
	return Math.abs(dist(pX, pY, mX, mY));
}



function setup () {
	cnv = createCanvas(container_elem.offsetWidth, container_elem.offsetHeight);
	cnv.parent('sketch_holder');
}


function draw () {
	background(0);
	noStroke();
	fill(255);

	for (let x = 0; x <= width; x += interval) {
		for (let y = 0; y <= height; y += interval) {
			mouse_distance = getDistance(x, y, mouseX, mouseY);
			if (mouse_distance < sensitivity) {
				multiply_factor = normalize(mouse_distance, 0, sensitivity) * diam_selected + diam_unselected;
				ellipse(x, y, multiply_factor, multiply_factor);
			} else {
				ellipse(x, y, diam_unselected, diam_unselected);
			}
		}
	}

	text(deltaTime, width / 2, height / 2);
}