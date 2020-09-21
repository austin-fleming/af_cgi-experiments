const getRandomBinary = () => (Math.random() > 0.5 ? 1 : 0)

const binaryArrayToDecimal = (binaryArray) =>
    parseInt(
        binaryArray.reduce((acc, binInt) => acc + binInt.toString()),
        2
    )

const getRandomBinaryArray = (size) =>
    [...Array(size)].map((cell) => getRandomBinary())

export const getSierpinskiArray = (size) => {
    const startIndex = Math.ceil(size / 2)
    return [...Array(size)].map((cell, cellIndex) => {
        return cellIndex === startIndex ? 1 : 0
    })
}

const sierpinskiRules = [0, 1, 0, 1, 1, 0, 1, 0]

const sierpinskiRulesInverted = [...sierpinskiRules].reverse()

const getSierpinskiSequence = (neighborA, neighborB, neighborC) => {
    const neighborCase = binaryArrayToDecimal([neighborA, neighborB, neighborC])
    const cellValue = sierpinskiRulesInverted[neighborCase]
    return cellValue
}

export const getNextSierpinskiWrapped = (lastGeneration) => {
    const arrLength = lastGeneration.length
    let newGeneration = []
    for (let index = 0; index < lastGeneration.length; index++) {
        if (index === 0) {
            newGeneration.push(
                getSierpinskiSequence(
                    lastGeneration[arrLength - 1],
                    lastGeneration[index],
                    lastGeneration[index + 1]
                )
            )
        } else if (index === arrLength - 1) {
            newGeneration.push(
                getSierpinskiSequence(
                    lastGeneration[index - 1],
                    lastGeneration[index],
                    lastGeneration[0]
                )
            )
        } else {
            newGeneration.push(
                getSierpinskiSequence(
                    lastGeneration[index - 1],
                    lastGeneration[index],
                    lastGeneration[index + 1]
                )
            )
        }
    }
    return newGeneration
}

const renderGeneration = (generation) => {
    const rendered = generation.map((cell) => (cell === 1 ? '@' : '.'))
    console.log(...rendered)
}

const testSierpinski = (width, height) => {
    let generation = getSierpinskiArray(width)
    renderGeneration(generation)
    for (let round = 0; round < height - 1; round++) {
        generation = getNextSierpinskiWrapped(generation)
        renderGeneration(generation)
    }
}

testSierpinski(60, 80)
