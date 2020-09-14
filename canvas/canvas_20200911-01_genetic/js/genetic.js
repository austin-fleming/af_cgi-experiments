const getRandomExon = (scale) => Math.random() * scale;

const getRandomGene = (maxLengthOfStep) => {
  return {
    dX: getRandomExon(maxLengthOfStep),
    dY: getRandomExon(maxLengthOfStep),
  };
};

const getRandomChromosome = (numberOfSteps, maxLengthOfStep) => {
  let genome = [];
  for (let i = 0; i < numberOfSteps; i++) {
    genome.push(getRandomGene(maxLengthOfStep));
  }
  return genome;
};

const getPopulationOfRandomChromosomes = (
  populationSize,
  numberOfSteps,
  maxLengthOfStep
) => {
  const population = [];
  for (let i = 0; i < populationSize; i++) {
    population.push(getRandomChromosome(numberOfSteps, maxLengthOfStep));
  }
  return population;
};

/* console.log(getRandomExon(10));
console.log(getRandomGene(10));
console.log(getRandomChromosome(4, 10));
console.log(getPopulationOfRandomChromosomes(3, 4, 10)); */
