const getDistanceBetweenPoints = (point1, point2) =>
    Math.sqrt(
        Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
    )

const isPointInCircle = (point, circle) => {
    if (getDistanceBetweenPoints(point, circle) < circle.radius) {
        point.z = true
    }
}

export const setIfFieldPointIsInCircle = (field, circles) => {
    for (let col = 0; col < field.field.length; col++) {
        for (let row = 0; row < field.field[col].length; row++) {
            field.field[col][row].z = false
        }
    }
    for (let col = 0; col < field.field.length; col++) {
        for (let row = 0; row < field.field[col].length; row++) {
            for (let circle = 0; circle < circles.circles.length; circle++) {
                isPointInCircle(field.field[col][row], circles.circles[circle])
            }
        }
    }
}

const binaryToDecimal = (a, b, c, d) => a * 1 + b * 2 + c * 4 + d * 8
