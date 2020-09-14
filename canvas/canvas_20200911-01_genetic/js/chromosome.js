export class Chromosome {
  constructor(numberOfSteps, maxLengthOfStep, originPoint) {
    this._origin = originPoint;
    this._genome = this._createRandomGenome(numberOfSteps, maxLengthOfStep);
    this._expressedGenome = this._transcribeExpressedGenome();
    this._fitness;
  }

  _transcribeExpressedGenome = () => {
    const expressedGenome = [];
    expressedGenome.push({
      x: this._genome[0].dX + this._origin.x,
      y: this._genome[0].dY + this._origin.y,
    });
    for (let i = 1; i < this._genome.length; i++) {
      expressedGenome.push({
        x: this._genome[i].dX + expressedGenome[i - 1].x,
        y: this._genome[i].dY + expressedGenome[i - 1].y,
      });
    }
    return expressedGenome;
  };

  _createRandomGenome = (numberOfSteps, maxLengthOfStep) => {
    let genome = [];
    for (let i = 0; i < numberOfSteps; i++) {
      genome.push(this._createRandomGene(maxLengthOfStep));
    }
    return genome;
  };

  _createRandomGene = (maxLengthOfStep) =>
    Object({
      dX: this._createRandomExon(maxLengthOfStep),
      dY: this._createRandomExon(maxLengthOfStep),
    });

  _createRandomExon = (deltaMax) =>
    Math.floor(Math.random() * (deltaMax * 2 + 1) - deltaMax);

  _mutate = () => {
    this._genome[2].x *= 5;
  };

  update = () => {
    this._mutate();
    this._expressedGenome = this._transcribeExpressedGenome();
  };
  scoreFitness = (target) => {
    const travelDistance = Object({
      x: Math.abs(this._expressedGenome[0].x - target.x),
      y: Math.abs(this._expressedGenome[0].y - target.y),
    });

    const finalDistance = Object({
      x: Math.abs(
        this._expressedGenome[this._expressedGenome.length - 1].x - target.x
      ),
      y: Math.abs(
        this._expressedGenome[this._expressedGenome.length - 1].y - target.y
      ),
    });

    const roughScore = Object({
      x: travelDistance.x - (travelDistance.x - finalDistance.x),
      y: travelDistance.y - (travelDistance.y - finalDistance.y),
    });

    this._fitness = (roughScore.x + roughScore.y) / 2;
    return this._fitness;
  };

  render = (CTX) => {
    CTX.beginPath();
    CTX.moveTo(this._expressedGenome[0].x, this._expressedGenome[0].y);
    for (let i = 1; i < this._expressedGenome.length; i++) {
      CTX.lineTo(this._expressedGenome[i].x, this._expressedGenome[i].y);
    }
    CTX.stroke();
  };
}

/* const ORIGIN = { x: 100, y: 100 };
const TARGET = { x: 500, y: 500 };

const TestChromosome = new Chromosome(4, 10, ORIGIN);
console.log(TestChromosome._genome);
console.log(TestChromosome._expressedGenome);
console.log(TestChromosome.scoreFitness(TARGET)); */
