/*.................................
.......Basic Functions.............
...................................*/

const getSqrt = (x) => x * x

const getInverseValue = (x) => (0 === x ? 0 : 1 / x)

const getDistanceBetweenPoints = (pointA, pointB) =>
    Math.sqrt(getSqrt(pointB.x - pointA.x) + getSqrt(pointB.y - pointA.y))

const getVector = (x, y) => Object({ x: x, y: y })

const getRandomNumber = () => Math.random() * 2 - 1

const getRandomVector = () => getVector(getRandomNumber(), getRandomNumber())

const getBlankVector = () => getVector(0, 0)

/*.................................
.......DNA Functions...............
...................................*/

const getBlankGene = () => getBlankVector()

const getRandomGene = () => getRandomVector()

const getRandomGenome = (genomeLength) =>
    [...Array(genomeLength)].map((item) => getRandomGene())

const getBlankPhenome = (genomeLength) =>
    [...Array(genomeLength)].map((item) => getBlankGene())

/*.................................
.......Organism Functions..........
...................................*/

const getRandomSegmentLength = (maxLength) => Math.random() * maxLength

const getPhenomeFromGenome = (genome, origin, maxSegmentLength) => {
    //! try to fragment
    const segmentLength = getRandomSegmentLength.bind(null, maxSegmentLength)
    let runningSum = { x: 0, y: 0 }
    const newPhenome = genome.map((gene, index) => {
        runningSum =
            index === 0
                ? {
                      x: origin.x + gene.x * segmentLength(),
                      y: origin.y + gene.y * segmentLength(),
                  }
                : {
                      x: runningSum.x + gene.x * segmentLength(),
                      y: runningSum.y + gene.y * segmentLength(),
                  }
        const newPhene = { x: runningSum.x, y: runningSum.y }

        return newPhene
    })

    return newPhenome
}

const getOrphanOrganism = (genomeLength, origin, maxSegmentLength) => {
    //! try later to fragment
    //! later make scale maxScale per segment
    const randGenome = getRandomGenome(genomeLength)
    const newPhenome = getPhenomeFromGenome(
        randGenome,
        origin,
        maxSegmentLength
    )
    return Object.freeze({
        genome: randGenome,
        phenome: newPhenome,
    })
}

/*.................................
.......Fitness Functions...........
...................................*/

const getDistanceOfOrganismHeadFromTarget = (organism, target) =>
    getDistanceBetweenPoints(
        organism.phenome[organism.phenome.length - 1],
        target
    )

const getDistanceOfOrganismTailFromTarget = (organism, target) =>
    getDistanceBetweenPoints(organism.phenome[0], target)

const getOrganismFitnessScore = (organism, target) => {
    const distanceFromOriginToTarget = getDistanceOfOrganismTailFromTarget(
        organism,
        target
    )
    const closenessToTarget = getDistanceOfOrganismHeadFromTarget(
        organism,
        target
    )
    const fitnessScore = distanceFromOriginToTarget / closenessToTarget
    return closenessToTarget < 1 ? 10000 : fitnessScore
}
const getFitnessScoredOrganism = (organism, target) =>
    Object.freeze({
        fitness: Math.pow(getOrganismFitnessScore(organism, target), 2),
        ...organism,
    })

const getRawFitnessScoredPopulation = (population, target) =>
    population.map((organism) => getFitnessScoredOrganism(organism, target))

/*.................................
.......Wheel Functions.............
...................................*/

const getFitnessSum = (population) =>
    population.reduce((acc, organism) => (acc += organism.fitness), 0)

const getNormalizedFitnessScores = (population) => {
    const fitnessSum = getFitnessSum(population)
    //! find a more elegant method by which to reassign fitness and copy the rest
    const normalizedPopulation = population.map((organism) =>
        Object.freeze({
            fitness: organism.fitness / fitnessSum,
            genome: organism.genome,
            phenome: organism.phenome,
        })
    )
    return normalizedPopulation
}

const getNormalizedScoredPopulation = (population, target) => {
    const rawScoredPopulation = getRawFitnessScoredPopulation(
        population,
        target
    )

    const normalizedScoredPopulation = getNormalizedFitnessScores(
        rawScoredPopulation
    )

    return normalizedScoredPopulation
}

const getSelectionWheel = (normalizedPopulation, probabilityFactor) => {
    //! reign in modifier

    let selectionWheel = []
    normalizedPopulation.forEach((organism, index) => {
        let wheelSection = [
            ...Array(Math.ceil(organism.fitness * probabilityFactor)),
        ].map((slot) => {
            return index
        })
        selectionWheel.push(...wheelSection)
    })

    return selectionWheel
}

const getParentOrganismByWheelSelection = (population, selectionWheel) => {
    const randIndex = Math.floor(Math.random() * selectionWheel.length)
    const indexFromSelectionWheel = selectionWheel[randIndex]
    return population[indexFromSelectionWheel]
}

/*.................................
.......Population Functions........
...................................*/

const getOrphanPopulation = (
    populationSize,
    genomeLength,
    maxSegmentLength,
    origin
) =>
    [...Array(populationSize)].map((organism) =>
        getOrphanOrganism(genomeLength, origin, maxSegmentLength)
    )

const parentSelector = () => Math.random() > 0.5

//! use by-index swap for crossover function
const crossoverGenomes = (parentA, parentB) => {
    const child = parentA.genome.map((gene, index) =>
        parentSelector() ? parentA.genome[index] : parentB.genome[index]
    )
    return child
}

const getChildGenomeFromWheelParents = (population, matingPool) => {
    const parentA = getParentOrganismByWheelSelection(population, matingPool)
    const parentB = getParentOrganismByWheelSelection(population, matingPool)
    const child = crossoverGenomes(parentA, parentB)
    return child
}

const maybeMutateGenome = (organism, mutationRate) => {
    const mutatedGenome = organism.map((gene) =>
        Math.random() > mutationRate ? gene : getRandomGene()
    )
    return mutatedGenome
}

/*.................................
.......generation functions........
...................................*/

export const initFirstPopulation = (config) => {
    const population = getOrphanPopulation(
        config.populationSize,
        config.genomeLength,
        config.maxSegmentLength,
        config.origin
    )
    const scoredPopulation = getNormalizedScoredPopulation(
        population,
        config.target
    )

    return scoredPopulation
}

export const createNewPopulation = (previousPopulation, config) => {
    const selectionWheel = getSelectionWheel(
        previousPopulation,
        config.probabilityFactor
    )

    const childGenomes = [...Array(previousPopulation.length)].map((genome) =>
        maybeMutateGenome(
            getChildGenomeFromWheelParents(previousPopulation, selectionWheel),
            config.mutationRate
        )
    )

    const newPopulation = childGenomes.map((genome) => {
        const phenome = getPhenomeFromGenome(
            genome,
            config.origin,
            config.maxSegmentLength
        )
        return Object.freeze({
            genome: genome,
            phenome: phenome,
        })
    })

    const newScoredPopulation = getNormalizedScoredPopulation(
        newPopulation,
        config.target
    )

    return newScoredPopulation
}

/*.................................
.......Render Functions............
...................................*/

export const logPopulation = (population, count) => {
    population.forEach((organism) => {
        console.log(`Pop: ${count} | Fitness: ${organism.fitness * 100}`)
    })
}

export const renderPopulation = (CTX, population) => {
    population.map((organism) => {
        CTX.beginPath()
        CTX.moveTo(organism.phenome[0].x, organism.phenome[0].y)
        organism.phenome.map((phene) => {
            CTX.lineTo(phene.x, phene.y)
        })
        CTX.stroke()
    })
}

/*.................................
.......CONFIG......................
...................................*/

/* const CONFIG = {
    populationSize: 1000,
    genomeLength: 100,
    maxSegmentLength: 10,
    mutationRate: 0.003,
    probabilityFactor: 100,
    origin: { x: 100, y: 100 },
    target: { x: 500, y: 500 },
} */

/*.................................
.......Tests.......................
...................................*/

/* let currentGeneration = initFirstPopulation(CONFIG)
renderPopulation(currentGeneration, 0)

let counter = 0
while (true) {
    currentGeneration = createNewPopulation(currentGeneration, CONFIG)
    renderPopulation(currentGeneration, counter)
    counter++
} */
