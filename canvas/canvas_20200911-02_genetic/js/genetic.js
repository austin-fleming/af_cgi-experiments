const createRandomExon = () => Math.random() * 2 - 1;

const createRandomGene = () =>
  Object({
    dX: createRandomExon(),
    dY: createRandomExon(),
    realX: 0,
    realY: 0,
  });

const createRandomChromosome = (geneQuantity) =>
  [...Array(geneQuantity)].map((x) => createRandomGene());

export const createRandomPopulation = (populationSize, geneQuantity) =>
  [...Array(populationSize)].map((chromosome) =>
    createRandomChromosome(geneQuantity)
  );

const crossover = (chromoA, chromoB) => {
  const crossoverPoint = Math.floor(chromoA.length / 2);
  return [
    ...chromoA.slice(0, crossoverPoint),
    ...chromoB.slice(crossoverPoint),
  ];
};

const crossoverPopulationAtRandom = (population) => {
  const populationLength = population.length - 1;
  const randIndexA = Math.floor(Math.random() * populationLength);
  const randIndexB = Math.floor(Math.random() * populationLength);
  const crossed = [
    ...crossover(population[randIndexA], population[randIndexB]),
  ];
  console.log("crossed", crossed);
  return crossed;
};

const mutateChromosome = (chromosome, indexA, indexB) => {
  const tempGene = chromosome[indexA];
  const mutatedChromo = [...chromosome];
  mutatedChromo[indexA] = mutatedChromo[indexB];
  mutatedChromo[indexB] = tempGene;
  return mutatedChromo;
};

const add = (a, b) => a + b;

const translateChromosome = (chromosome, segmentSize, origin) => {
  let translatedChromosome = [];
  translatedChromosome.push(
    Object({
      ...chromosome[0],
      realX: origin.x,
      realY: origin.y,
    })
  );
  console.log("test", translatedChromosome[0]);
  for (let i = 1; i < chromosome.length; i++) {
    translatedChromosome.push(
      Object({
        ...chromosome[i],
        realX:
          chromosome[i].dX * segmentSize + translatedChromosome[i - 1].realX,
        realY:
          chromosome[i].dY * segmentSize + translatedChromosome[i - 1].realY,
      })
    );
  }
  console.log(translatedChromosome);
  return [...translatedChromosome];
};

const translatePopulation = (population, segmentSize, origin) =>
  population.map((chromosome) =>
    translateChromosome(chromosome, segmentSize, origin)
  );

export const createNewPopulation = (priorPopulation, segmentSize, origin) => {
  let crossedPopulation = [];
  for (let i = 0; i < priorPopulation.length; i++) {
    crossedPopulation.push(
      //crossover(priorPopulation[i], priorPopulation[i + 1])
      crossoverPopulationAtRandom([...priorPopulation])
    );
    /* if (Math.random() > 0.9) {
      mutateChromosome(crossedPopulation[i], 0, 1);
    } */
  }

  return translatePopulation(crossedPopulation, segmentSize, origin);
};

export const renderChromosome = (CTX, chromosome) => {
  CTX.beginPath();
  CTX.moveTo(chromosome[0].realX, chromosome[0].realY);
  for (let i = 1; i < chromosome.length; i++) {
    CTX.lineTo(chromosome[i].realX, chromosome[i].realY);
  }
  CTX.closePath();
  CTX.stroke();
};

export const renderPopulation = (CTX, population) => {
  population.forEach((chromosome) => {
    renderChromosome(CTX, chromosome);
  });
};
