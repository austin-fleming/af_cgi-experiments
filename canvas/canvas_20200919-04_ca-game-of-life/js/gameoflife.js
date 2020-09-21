const getRandomBinary = () => (Math.random() > 0.5 ? 1 : 0)

const getDeadField = (width, height) =>
    [...Array(width)].map((x) => [...Array(height)].map((y) => 0))

const seedDeadField = (deadField) => {
    return deadField.map((x, xIndex) => {
        if (xIndex === 0 || xIndex === deadField.length - 1) {
            return deadField[xIndex]
        } else {
            return x.map((y, yIndex) => {
                if (yIndex === 0 || yIndex === x.length - 1) {
                    return y
                } else {
                    return getRandomBinary()
                }
            })
        }
    })
}
export const initRandomBinaryField = (width, height) => {
    const deadField = getDeadField(width, height)
    const seededField = seedDeadField(deadField)
    console.log(seededField)
    return seededField
}

const sumCellsOfNeighbors = (field, x, y) =>
    field[x][y - 1] +
    field[x + 1][y - 1] +
    field[x + 1][y] +
    field[x + 1][y + 1] +
    field[x][y + 1] +
    field[x - 1][y + 1] +
    field[x - 1][y] +
    field[x - 1][y - 1]

const updateCellStatus = (field, xIndex, yIndex) => {
    const isAlive = field[xIndex][yIndex]
    const neighborhoodSum = sumCellsOfNeighbors(field, xIndex, yIndex)
    return (
        (isAlive && neighborhoodSum > 1 && neighborhoodSum < 4 ? 1 : 0) +
        (!isAlive && neighborhoodSum === 3 ? 1 : 0)
    )
}

export const updateField = (field) => {
    let newField = []
    let newColumn = []
    newField.push([...field[0]])
    for (let x = 1; x < field.length - 1; x++) {
        newColumn = []
        newColumn.push(0)
        for (let y = 1; y < field[0].length - 1; y++) {
            newColumn.push(updateCellStatus(field, x, y))
        }
        newColumn.push(0)
        newField.push(newColumn)
    }
    newField.push([...field[field.length - 1]])
    return newField
}

const renderField = (field) => {
    const writeOut = field.map((x, xIndex) =>
        x.reduce((consoleString, y) => consoleString + (y ? ' @' : ' .'), '\n')
    )
    console.log(...writeOut)
}
