import { Chromosome } from "./chromosome.js";

export class Population {
  constructor(config, previousGeneration) {
    this._populationSize = config.populationSize;
    this._maxDelta = config.maxDelta;
    this._geneQuantity = config.geneQuantity;
    this._origin = config.origin;
    this._target = config.target;
    this._currentPopulation;
    if (!previousGeneration) {
      this._currentPopulation = this._createRandomGeneration();
    }
  }

  updatePopulation() {
    this._currentPopulation.forEach((chromosome) => {
      chromosome.update();
    });
  }

  render(CTX) {
    this._currentPopulation.forEach((Chromosome) => Chromosome.render(CTX));
  }

  getCurrentPopulation() {
    return this._currentPopulation;
  }

  _createRandomGeneration() {
    const newPopulation = [];
    for (let i = 0; i < this._populationSize; i++) {
      newPopulation.push(
        new Chromosome(this._geneQuantity, this._maxDelta, this._origin)
      );
      newPopulation[i].scoreFitness(this._target);
    }

    return newPopulation;
  }
}
