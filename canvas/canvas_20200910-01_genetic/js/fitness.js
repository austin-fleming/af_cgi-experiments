import { shuffle } from "./shuffle.js";
import { updateDNA } from "./organism.js";

const getFitnessScoreOfOrganism = (organism, target) => {
  const travelDistance = Object({
    x: Math.abs(organism[0].pointX - target.x),
    y: Math.abs(organism[0].pointY - target.y),
  });

  const finalDistance = Object({
    x: Math.abs(organism[organism.length - 1].pointX - target.x),
    y: Math.abs(organism[organism.length - 1].pointY - target.y),
  });

  const roughScore = Object({
    x: travelDistance.x - (travelDistance.x - finalDistance.x),
    y: travelDistance.y - (travelDistance.y - finalDistance.y),
  });

  const finalScore = (roughScore.x + roughScore.y) / 2;
  return [...organism, { score: finalScore }];
};

export const getFitnessScoresForGeneration = (generation, target) => {
  return generation.map((organism) => {
    return getFitnessScoreOfOrganism(organism, target);
  });
};

const getHighestScoringOrganism = (scoredGeneration) => {
  let highestScoringIndex = 0;
  for (let index = 0; index < scoredGeneration.length - 1; index++) {
    highestScoringIndex = !!(
      scoredGeneration[index].score >
      scoredGeneration[highestScoringIndex].score
    )
      ? index
      : highestScoringIndex;
  }

  return scoredGeneration[highestScoringIndex];
};

const mutate = (organism) => {
  const mutatedOrganism = organism;
  mutatedOrganism[5].deltaX = mutatedOrganism[5].deltaY;
  return mutatedOrganism;
};

export const crossoverPair = (parentA, parentB) => {
  const crossoverPoint = Math.floor(parentA.length / 2);
  const child = [
    parentA.slice(0, crossoverPoint),
    parentB.slice(crossoverPoint),
  ];

  return child;
};

export const createNewGeneration = (generation) => {
  let newGeneration = [];

  let organism = [];
  console.log(`length: ${generation.length}`);

  for (let index = 1; index < generation.length - 2; index++) {
    organism = updateDNA(
      crossoverPair(generation[index - 1], generation[index])
    );

    newGeneration.push(organism);
  }
  newGeneration.push(organism[0]);
  newGeneration.push(generation[generation.length - 1]);

  return [...newGeneration];
};
