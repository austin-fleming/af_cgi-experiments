
/**
 * Draws a triangle bounded by an imaginary square, starting at the the top-left corner
 * @param {Number} width size of imaginary square containing triangle
 * @param {Object} start_point Vector describing top left corner
 * @param {Number} start_point.x X coordinate of starting point
 * @param {Number} start_point.y Y coordinate of starting point
 * @param {Boolean} inverted If triangle points downward
 * @return {undefined} none
 */
const drawSquareTriangle = (size, start_point, inverted = false) => {
    if (!inverted) {
        ctx.beginPath();
        ctx.moveTo(start_point.x, start_point.y);
        ctx.lineTo(start_point.x + size, start_point.y);
        ctx.lineTo(start_point.x + size / 2, start_point.y + size);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    } else {
        ctx.beginPath();
        ctx.moveTo(start_point.x, start_point.y + size);
        ctx.lineTo(start_point.x + size, start_point.y + size);
        ctx.lineTo(start_point.x + size / 2, start_point.y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
}


/**
 * Draws a complete circle
 * @param {Object} center_point Vector describing center of circle
 * @param {Number} center_point.x X coordinate of Vector
 * @param {Number} center_point.y Y coordinate of Vector
 * @param {Number} radius Radius of circle
 * @return {undefined} none
 */
const drawCircle = (center_point, radius) => {
    ctx.beginPath();
    ctx.arc(center_point.x, center_point.y, radius, 0, Math.PI * 2, true);
    ctx.fill()
    ctx.stroke();
}

/**
 * Draws a semi circle
 * @param {Object} center_point Vector describing center of circle
 * @param {Number} center_point.x X coordinate of Vector
 * @param {Number} center_point.y Y coordinate of Vector
 * @param {Number} radius Radius of circle
 * @param {Number} tilt_angle Determines tilt of semi circle
 * @param {Boolean} concave Determines if semi circle arcs downward of upward
 * @return {undefined} none
 */
const drawSemiCircle = (center_point, radius, tilt_angle = 0, concave = true) => {
    ctx.beginPath();
    ctx.arc(center_point.x, center_point.y, radius, (0 + tilt_angle), (Math.PI + tilt_angle), concave);
    ctx.stroke();
}
