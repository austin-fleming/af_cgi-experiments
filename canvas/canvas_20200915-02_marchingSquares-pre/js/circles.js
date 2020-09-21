export class CircleMover {
    constructor() {
        this.x = 800
        this.y = 800
        this._vX = 3
        this._vY = 3
        this.radius = 20
        this._color = 'rgb(20,255,20)'
        this._lineWeight = 2
    }

    update = (canvas) => {
        //this._collisionDetect(canvas)
        /* this.x += this._vX
        this.y += this._vY */
    }

    render = (CTX) => {
        CTX.strokeStyle = this._color
        //context.lineWeight = this._lineWeight
        CTX.arc(this.x, this.y, this.radius, 0, Math.Pi * 2)
        CTX.stroke()
    }

    _collisionDetect = (canvas) => {
        if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
            this._vX *= -1
        }

        if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
            this._vY *= -1
        }
    }
}
