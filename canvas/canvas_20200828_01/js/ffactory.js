
export class Vector {
    constructor (x, y, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

export class canvas2D {
	constructor(canvas_id, wrapper_id) {
		this._html_canvas_wrapper = document.getElementById(wrapper_id);
		this._html_canvas = document.getElementById(canvas_id);
		this.ctx = this._html_canvas.getContext('2d');
        this._html_canvas.width = this._html_canvas_wrapper.offsetWidth;
		this._html_canvas.height = this._html_canvas_wrapper.offsetHeight;
	}

	resizeCanvas() {
        console.log(this._html_canvas_wrapper.offsetWidth)
		this._html_canvas.width = this._html_canvas_wrapper.offsetWidth;
		this._html_canvas.height = this._html_canvas_wrapper.offsetHeight;
    }

    setCursorStyle (style = 'none') {
        this._html_canvas.style.cursor = style;
    }

    getHTMLCanvasElem () {
        return this._html_canvas;
    }
    
    getCenter() {
        return {x: this._html_canvas.offsetWidth/2, y: this._html_canvas.offsetHeight/2};
    }

    getDimensions() {
        return {x: this._html_canvas.offsetWidth, y: this._html_canvas.offsetHeight};
    }
}


export class SimpleBall {
	constructor (start_point, radius, color) {
		this._x = start_point.x;
        this._y = start_point.y;
        this._z = start_point.z;
        this._radius = radius;
        this._fill_color = color;
        this._is_3D = false;
        this._speed = 0;

        this._dX = 0;
        this._dY = 0;
        this._dZ = 0;
	}

	renderBall (ctx, bounds) {
		ctx.fillStyle = this._fill_color;
		ctx.beginPath();
		ctx.arc(this._x, this._y, this._radius, 0, Math.PI * 2, true);
		ctx.closePath();
        ctx.fill();
        this._detectBoundsCollision(bounds);
        this._move();
    }
    
    setSpeed (speed) {
        this._speed = speed;
    }

    randomTrajectory () {
        this._dX = (Math.random() - .5) * this._speed;
        this._dY = (Math.random() - .5) * this._speed;
        if (this._is_3D) { this._dZ = (Math.random() - .5) * this._speed; }
    }

    _move () {
        this._x += this._dX;
        this._y += this._dY;
        if (this._is_3D) { this._z += this._dZ; }
    }

    _detectBoundsCollision (bounds) {
        if (this._x - this._radius <= 0 || this._x + this._radius>= bounds.x) { this._dX *= -1; }
        if (this._y - this._radius <= 0 || this._y + this._radius>= bounds.y) { this._dY *= -1; }
        if (this._is_3D) { 
            if (this._z - this._radius <= 0 || this._z + this._radius>= bounds.z) { this._dZ *= -1; }
        }
    }

    _detectMouseCollision () {}
}



export class SimpleBallSimulation {
    constructor (quantity, diameter_range, speed_range, start_point) {
        this._ball_array = [];
        this._quantity = quantity;
        this._diameter_range = diameter_range;
        this._speed_range = speed_range;
        this._generateBalls(start_point);
    }

    addBall (start_point) {
        // setup vars
        let cur_speed = this._randomInRange(this._speed_range.min, this._speed_range.max);
        let cur_diam = this._randomInRange(this._diameter_range.min, this._diameter_range.max);
        let cur_color = `rgb(120,20,${Math.floor(Math.random() * 255)})`;
        // new ball
        let cur_ball = new SimpleBall(start_point, cur_diam, cur_color);
        cur_ball.setSpeed(cur_speed);
        cur_ball.randomTrajectory();
        this._ball_array.push(cur_ball);        
    }

    renderBalls (ctx, bounds) {
        this._ball_array.forEach(ball => {
            ball.renderBall(ctx, bounds);
        })
    }

    _generateBalls (start_point) {
        for (let n = 0; n < this._quantity; n++) {
            // set styles randomly
            this.addBall(start_point)
        }
    }

    _randomInRange (min, max) {
        return Math.random() * (max - min) + min;
    }

    _randomIntInRange (min, max) {
        return Math.ceil(Math.random() * (max - min) + min);
    }
}



