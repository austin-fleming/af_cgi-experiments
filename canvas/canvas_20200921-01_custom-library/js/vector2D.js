const inspect = (input) => {
    console.log(input)
    return input
}

const numbersAreEqual = (floatA, floatB) => Math.abs(floatA - floatB) < 1 / 8192

const keepHighest = (valueA, valueB) => (valueA >= valueB ? valueA : valueB)
inspect(keepHighest('b', NaN))
const add = (a, b) => a + b

const sub = (a, b) => a - b

const mult = (a, b) => a * b

const div = (a, b) => a / b

const square = (a) => a * a

/**
 * A description of a 2D vector
 * @typedef {Object} Vector2D
 * @property {number} x
 * @property {number} y
 */

/**
 * A description of a 3D vector
 * @typedef {Object} Vector3D
 * @property {number} x
 * @property {number} y
 * @property {number} z
 */

/**
 * creates a 2D vector object
 * @param {Number} [x = 0] - x direction
 * @param {Number} [y = 0] - y direction
 * @returns {Vector2D}
 */
const createVector = (x = 0, y = 0) => Object.freeze({ x: x, y: y })

/**
 * Sum two 2D vectors
 * @param {Vector2D} vectorA - first vector
 * @param {Vector2D} vectorB - second vector
 * @returns {Vector2D} - new vector representing the sum of vectorA and vectorB
 */
const addVectors = (vectorA, vectorB) =>
    createVector(add(vectorA.x, vectorB.x), add(vectorA.y, vectorB.y))

/**
 * Subtract two 2D vectors
 * @param {Vector2D} vectorA - first vector
 * @param {Vector2D} vectorB - second vector
 * @returns {Vector2D} - new vector representing the difference of vectorA and vectorB
 */
const subVectors = (vectorA, vectorB) =>
    createVector(sub(vectorA.x, vectorB.x), sub(vectorA.y - vectorB.y))

/**
 * Scale vector by a number
 * @param {Vector2D} vector - vector to be scaled
 * @param {Number} scalar - number to scale vector by
 * @returns {Vector2D} - new vector representing the scaled vector
 */
const scaleVector = (vector, scalar) =>
    createVector(mult(vector.x, scalar), mult(vector.y, scalar))

const scaleVectorByDiv = (vector, divisor) =>
    createVector(div(vector.x, divisor), div(vector.y, divisor))

const dotProduct = (vectorA, vectorB) =>
    add(mult(vectorA.x, vectorB.x), mult(vectorA.y, vectorB.y))

const getSquareLength = (vector) => add(square(vector.x), square(vector.y))
/**
 * Creates 2D vector from 3D vector by throwing away Z coordinate
 * @param {Vector3D} vector3D
 */
const vector3Dto2D = (vector3D) => createVector(vector3D.x, vector3D.y)

// module.export = {createVector}
