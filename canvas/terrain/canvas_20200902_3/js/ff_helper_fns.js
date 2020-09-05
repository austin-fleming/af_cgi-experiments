/*....Helper Functions.........
......by.......................
......Flimflam Factory LLC.....
......copyright 2020.........*/



/*.........................
.....DATA MUNIPULATION.....
.........................*/


/**
 * Copies 2D array by value via map and spreaders
 * @param {Array} array2D 2D array
 * @return {Array} 2D array copy of input
 */
export const copy2dArray = array2D => {
    return array2D.map( arrayRow => {
        return [...arrayRow];
    })
}


/**
 * Copies data by value using JSON method
 * @param {Object or Array} object array or object of arbitrary complexity
 * @return copy of input
 */
export const stringCopyArray = object => {
    return JSON.parse(JSON.stringify(object));
}




/*.........................
.....DOM INTERACTIONS......
.........................*/

export const getHtmlCanvasWrapper = wrapperID => {
    try {
        return document.getElementById(wrapperID)
    } catch (err) {
        console.error(err)
    }
}

export const getHtmlCanvas = canvasID => {
    try {
        return document.getElementById(canvasID)
    } catch (err) {
        console.error(err)
    }
}

export const init2dCanvasContext = canvasElement => {
    try {
        return canvasElement.getContext('2d');
    } catch {
        console.error(err)
    }
}


/*.........................
.....ENVIRONMENT...........
.........................*/

export const setCanvasSize = (canvas, wrapper) => {
    canvas.width = wrapper.offsetWidth;
    canvas.height = wrapper.offsetHeight;
}

/* export const initCanvasResizeListener = (canvas, wrapper) => {
    window.addEventListener('resize', event => {
        setCanvasSize(canvas, wrapper)
    })
} */

export const initMouseListener = mouseObject => {
    window.addEventListener('mousemove', event => {
        mouseObject.x = event.clientX;
        mouseObject.y = event.clientY;
    })
}

/*.........................
.....TESTING...............
.........................*/


// simplified wrapper for console.log
export const print = input => {
    try {
        console.log(input)
    }
    catch (err) {
        console.error(err)
    }
}