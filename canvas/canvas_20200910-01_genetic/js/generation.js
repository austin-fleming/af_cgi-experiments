import { initOrganism, renderOrganism } from "./organism.js";

export const initFirstGeneration = (
  populationSize,
  numberOfPoints,
  originPoint,
  deltaMax
) => {
  const population = [];
  for (let i = 0; i < populationSize; i++) {
    population.push(initOrganism(numberOfPoints, originPoint, deltaMax));
  }
  return population;
};

export const renderGeneration = (CTX, generation) => {
  for (let i = 0; i < generation.length - 1; i++) {
    renderOrganism(CTX, generation[i]);
  }
};
