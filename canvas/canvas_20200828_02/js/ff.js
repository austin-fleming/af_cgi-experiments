/**
 * Returns object containing current coordinates of mouse cursor adjusted to canvas
 * @param {Object} canvas HTML canvas element 
 * @param {EventListenerOrEventListenerObject} event mousemove event listener
 * @return {Object} x, y coordinates adjusted to canvas
 */
export function getMousePosition (canvas, event) {
    let canvasBounds = canvas.getBoundingClientRect();
    return {
        x: event.clientX - canvasBounds.left,
        y: event.clientY - canvasBounds.top
    };
}

export class Vector { 
    constructor (x, y) {
        this.x = x;
        this.y = y;
    }
}