// HTML canvas container vars
const container_id = 'sketch_holder';
// background colors
const color_bg = 'rgb(20,20,20)';
const color_bg_frame = 'rgba(20,20,20,.1)';
// canvas object
let cnv;


class CustomCanvas {
	constructor(container_id) {
		this.container_id = container_id;
		this.container_elem = document.getElementById(container_id);
		this.container_width = this.getContainerWidth();
		this.canvas = createCanvas(this.container_width, this.container_width);
		this.canvas.parent(this.container_elem);
	}
	getContainerWidth() {
		return this.container_elem.offsetWidth;
	}
	refresh() {
		if (this.canvas.width != this.getContainerWidth()) {
			this.container_width = this.getContainerWidth();
			resizeCanvas(this.container_width, this.container_width);
			return this.container_width;
		}
	}
}


function setup() {
	cnv = new CustomCanvas(container_id);
	background(color(color_bg));
}

function draw() {
	background(color(color_bg_frame));
	cnv.refresh();

	fill(color('rgba(250,20,20,0.9)'));
	ellipse(mouseX, mouseY, 80, 80);
}