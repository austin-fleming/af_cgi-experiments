const generateFieldVertices = ({ amountX, amountY, seperation, scale }) => {
    let grid = []
    let scales = []
    let xDist = 0
    let yDist = 0
    const z = 0
    for (let x = 0; x < amountX; x++) {
        yDist = 0
        column = []
        for (let y = 0; y < amountY; y++) {
            grid.push(xDist, yDist, z)
            scales.push(scale)
            yDist += seperation
        }
        xDist += seperation
    }

    return Object.freeze({
        vertices: grid,
        scales: scales,
    })
}

console.log(
    generateFieldVertices({ amountX: 5, amountY: 5, seperation: 1, scale: 1 })
)
