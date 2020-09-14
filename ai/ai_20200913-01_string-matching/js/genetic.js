const getRandomGene = (genePool) =>
  genePool[Math.floor(Math.random() * genePool.length)];

const getRandomGenome = (geneQuantity, genePool) =>
  [...Array(geneQuantity)].map((gene) => getRandomGene(genePool));

const getRandomOrganism = (geneQuantity, genePool) =>
  Object.freeze({
    fitness: 0,
    genome: getRandomGenome(geneQuantity, genePool),
  });

const getRandomPopulation = (populationSize, geneQuantity, genePool) =>
  [...Array(populationSize)].map((organism) =>
    getRandomOrganism(geneQuantity, genePool)
  );

const printPopulationPhenotypes = (population) =>
  population.forEach((organism) => {
    console.log(`Fitness: ${organism.fitness} | ${organism.genome.join("")}`);
  });

const compareChars = (a, b) => (a === b ? 1 : 0);

const getSumOfCorrectGenes = (organism, target) =>
  organism.genome.reduce(
    (acc, gene, index) =>
      (acc += Math.pow(compareChars(gene, target[index]), 2)),
    0
  );

const getOrganismFitness = (organism, target) =>
  getSumOfCorrectGenes(organism, target) / target.length;

const getFitnessScoredOrganism = (organism, target) =>
  Object.freeze({
    fitness: getOrganismFitness(organism, target),
    genome: organism.genome,
  });

const getFitnessScoredPopulation = (population, target) =>
  population.map((organism) => getFitnessScoredOrganism(organism, target));

const crossoverGenomes = (genomeA, genomeB, crossingIndex) =>
  Object.freeze({
    fitness: genomeA.fitness,
    genome: [
      ...genomeA.slice(0, crossingIndex),
      ...genomeB.slice(crossingIndex),
    ],
  });

const crossoverOrganisms = (parentA, parentB) => {
  const midPoint = Math.floor(parentA.genome.length / 2);
  return crossoverGenomes(parentA.genome, parentB.genome, midPoint);
};

const getMatingPool = (scoredPopulation) => {
  const matingPool = [];

  scoredPopulation.forEach((organism, organismIndex) => {
    // set fitness to number between 1 and 100;
    const probabilitySlots = Math.ceil(organism.fitness * 100);
    // create an array of organism indexes, where each organism is represented by a number of indexes equal to their fitness score
    matingPool.push(
      ...[...Array(probabilitySlots)].map((slot) => organismIndex)
    );
  });

  return matingPool;
};

const getRoulettePoolSelection = (matingPool) => {
  const selectionIndex = Math.floor(Math.random() * matingPool.length);
  //const selectionIndex = 2;
  return matingPool[selectionIndex];
};

const getMatingPartnerByRoulette = (population, matingPool) =>
  population[getRoulettePoolSelection(matingPool)];

const getChildFromRouletteParents = (population, matingPool) => {
  const parentA = getMatingPartnerByRoulette(population, matingPool);
  const parentB = getMatingPartnerByRoulette(population, matingPool);

  const child = crossoverOrganisms(parentA, parentB);

  return child;
};

const maybeMutateOrganism = (organism, mutationProbability, genePool) =>
  Object.freeze({
    fitness: organism.fitness,
    genome: organism.genome.map((gene) =>
      Math.random() > mutationProbability ? gene : getRandomGene(genePool)
    ),
  });

const resetFitness = (organism) =>
  Object.freeze({ fitness: 0, genome: organism.genome });

const initFirstPopulation = (
  populationSize,
  geneQuantity,
  genePool,
  target
) => {
  const basePopulation = getRandomPopulation(
    populationSize,
    geneQuantity,
    genePool
  );
  return getFitnessScoredPopulation(basePopulation, target);
};

const createNewPopulation = (
  priorPopulation,
  mutationRate,
  genePool,
  target
) => {
  const matingPool = getMatingPool(priorPopulation);
  const children = [...Array(priorPopulation.length)].map((organism) =>
    maybeMutateOrganism(
      resetFitness(getChildFromRouletteParents(priorPopulation, matingPool)),
      mutationRate,
      genePool
    )
  );
  const scoredChildren = getFitnessScoredPopulation(children, target);

  return scoredChildren;
};

const renderPopulation = (population, count) => {
  population.forEach((organism) => {
    console.log(
      `Pop: ${count} | Fitness: ${Math.round(
        organism.fitness * 100
      )} | ${organism.genome.join("")}`
    );
  });
};

const isSameValue = (a, b) => a === b;

const isSuccessfulOrganism = (organism, target) =>
  organism.genome.every((gene, index) => isSameValue(gene, target[index]));

const findSuccessfulOrganism = (population, target) =>
  population.find((organism) => isSuccessfulOrganism(organism, target));

const printIfSuccessful = (successValue) => {
  if (successValue) {
    console.log(successValue);
    return true;
  } else {
    return false;
  }
};

const GENE_POOL =
  "abcdefghijklmnopqrstuvwxyz 0123546789.,;:ABCDEFGHIJKLMNOPQRSTUCWXYZ";
const TARGET_PHRASE = "to be or not to be, that is the question";
const PHRASE_LENGTH = TARGET_PHRASE.length;
const POPULATION_SIZE = 3000;
const MUTATION_RATE = 0.001;

let currentPopulation = initFirstPopulation(
  POPULATION_SIZE,
  PHRASE_LENGTH,
  GENE_POOL,
  TARGET_PHRASE
);
let ticker = 1;
let solutionFound = false;
while (solutionFound === false) {
  currentPopulation = createNewPopulation(
    currentPopulation,
    MUTATION_RATE,
    GENE_POOL,
    TARGET_PHRASE
  );

  renderPopulation(currentPopulation, ticker);
  solutionFound = printIfSuccessful(
    findSuccessfulOrganism(currentPopulation, TARGET_PHRASE)
  );

  ticker++;
}
