/* #############################################
................................................
......ff library for canvas | v0.0.1............
......Flimflam Factory LLC, Copyright 2020......
................................................
 ############################################### */

class Vector {
    constructor(x, y, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

class canvas2D {
    /**
     * Constructor
     * @param {String} wrapper_ID ID of HTML element which wraps canvas tag
     * @param {String} canvas_ID ID of HTML canvas element
     * @param {Boolean} responsive If canvas should responsively size to HTML wrapper
     */
    constructor (canvas_id, wrapper_id, responsive=true) {
        this._canvasID = canvas_id;     // HTML id of canvas tag
        this._wrapperID = wrapper_id;   // HTML id of wrapper tag
        this._responsive = responsive;
		this._canvasHTML = this._getHTMLElem(this._canvasID);            // HTML canvas elem
		console.log(this._canvasID);
        this._canvasWrapperHTML = this._getHTMLElem(this._wrapperID);    // HTML canvas wrapper elem
        this.ctx = this._initCanvas(this._canvasHTML);    // context object
        this.updateDimensions();
    }

    // HTML initializations
    _getHTMLElem (elem_id) {
        return document.getElementById(elem_id);
    }
    // return initialized canvas object
    _initCanvas (canvas) {
        return canvas.getContext('2d');
    }

    updateDimensions () {
        this.ctx.width = this._canvasWrapperHTML.offsetWidth;
        this.ctx.height = this._canvasWrapperHTML.offsetHeight;
    }

    getDimensions () {
        return [this.ctx.width, this.ctx.height];
    }

    getCenter () {
        return {x: this.ctx.width / 2, y: this.ctx.height / 2};
    }

    getCenterPathOnCanvas (shape_width, shape_height) {
        return [this.ctx.width / 2 - shape_width / 2, this.ctx.height / 2 - shape_height / 2];;
    }

    clearCanvas () {
        ctx.clearRact(0, 0, this.ctx.width, this.ctx.height);
    }
}

class SimpleBall {
    constructor (start_point, radius) {
        this._x = start_point.x;
        console.log(`x: ${this._x}`);
        this._y = start_point.y;
        this._z = start_point.z;
        this._radius = radius;

        this._fill_color = 'rgb(20,20,20)';
        this._stroke_color = '#000000';
        this._stroke_width = 1;
        this._collision_detection = false;
        this._bounds = {x: 500, y: 500};
        this._dX = 0;
        this._dY = 0;
        this._dZ = 0;
    }

    setPosition (vector) {
        this._x = vector.x;
        this._y = vector.y;
        this._z = vector.z;
    }

    setTrajectory (vector) {
        this._dX = vector.x;
        this._dY = vector.y;
        this._dZ = vector.z;
    }

    setRadius (radius) {
        this._radius = radius;
    }

    setCollisionDetection (detection, bounds = {x: 100, y: 100}) {
        this._collision_detection = detection;
        if (detection) {this._updateBounds(bounds);}
    }

    setFill (color) {
        this._fill_color = color;
    }
    setStroke (color, width = 1) {
        this._stroke_color = color;
        this._stroke_width = width;
    }

    update (ctx) {
        //if (this._collision_detection) {this._detectWallCollision();}
        // add update bounds?
        //this._move();
        this._renderBall(ctx);
    }

    _updateBounds (bounds) {
        this._bounds.x = bounds.x;
        this._bounds.y = bounds.y;
    }

    _move () {
        this._x += this._dX;
        this._y += this._dY;
        this._Z += this._dZ;
    }

    _detectWallCollision () {
        if (this._x - this._radius <= 0 || this._x + this._radius>= this._bounds.x) { this._dX *= -1; }
        if (this._y - this._radius <= 0 || this._y + this._radius>= this._bounds.y) { this._dY *= -1; }
    }

    _renderBall (ctx) {
        ctx.fillStyle = 'teal';
        ctx.beginPath();
        ctx.moveTo(this._x, this._y);
        ctx.arc(this._x, this._y, this._radius, 0, Math.PI * 2, true);
        console.log(`x: ${this._x} | y: ${this._y} | radius: ${this._radius} | fill: ${this._fill_color}`);
        ctx.closePath();
        console.log(`ctx: ${ctx}`);
        ctx.fill();
    }
}



export {canvas2D, Vector, SimpleBall};