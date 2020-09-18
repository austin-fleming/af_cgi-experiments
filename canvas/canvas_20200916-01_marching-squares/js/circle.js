export class LivingCircle {
    constructor(x, y, speedX, speedY, radius) {
        this.x = x
        this.y = y
        this._dX = speedX
        this._dY = speedY
        this.radius = radius
    }

    update(canvas) {
        this.x += this._dX
        this.y += this._dY
        this._collisionDetect(canvas)
    }

    _collisionDetect(canvas) {
        if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
            this._dX *= -1
        }
        if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
            this._dY *= -1
        }
    }

    render(context) {
        context.beginPath()
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        context.stroke()
    }
}

export class CircleFactory {
    constructor(circleQuantity) {
        this.circles
        this.initRandomCircles(circleQuantity)
    }

    initRandomCircles(circleQuantity) {
        this.circles = [...Array(circleQuantity)].map(
            (circle) =>
                new LivingCircle(
                    400,
                    400,
                    Math.ceil(Math.random() * 10),
                    Math.ceil(Math.random() * 10),
                    Math.ceil(Math.random() * 80)
                )
        )
    }

    update(canvas, context) {
        this.circles.forEach((circle) => {
            circle.update(canvas)
            circle.render(context)
        })
    }
}
