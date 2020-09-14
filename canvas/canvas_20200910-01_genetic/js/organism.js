const getRandomDelta = (deltaMax) =>
  Math.floor(Math.random() * (deltaMax * 2 + 1) - deltaMax);

const createPoint = (deltaMax) =>
  Object({
    deltaX: getRandomDelta(deltaMax),
    deltaY: getRandomDelta(deltaMax),
  });

const createRawDNA = (numberOfPoints, deltaMax) => {
  const rawDNA = [];
  for (let i = 0; i < numberOfPoints; i++) {
    rawDNA.push(createPoint(deltaMax));
  }
  return rawDNA;
};

const createOrganismFromDNA = (rawDNA, originPoint) => {
  const organism = [
    { pointX: originPoint.x, pointY: originPoint.y, deltaX: 0, deltaY: 0 },
  ];

  for (let i = 1; i < rawDNA.length; i++) {
    organism.push({
      pointX: rawDNA[i].deltaX + organism[i - 1].pointX,
      pointY: rawDNA[i].deltaY + organism[i - 1].pointY,
      ...rawDNA[i],
    });
  }

  return organism;
};

export const updateDNA = (rawDNA) => {
  const organism = [];
  organism.push(rawDNA[0]);
  console.log("here");
  for (let i = 1; i < rawDNA.length - 2; i++) {
    organism.push({
      pointX: rawDNA[i].deltaX + organism[i - 1].pointX,
      pointY: rawDNA[i].deltaY + organism[i - 1].pointY,
      ...rawDNA[i],
    });
  }
  organism.push(organism[rawDNA.length - 1]);
  return organism;
};

export const initOrganism = (numberOfPoints, originPoint, deltaMax) => {
  return createOrganismFromDNA(
    createRawDNA(numberOfPoints, deltaMax),
    originPoint
  );
};

export const renderOrganism = (CTX, organism) => {
  for (let i = 1; i < organism.length; i++) {
    CTX.lineTo(organism[i].pointX, organism[i].pointY);
  }

  CTX.closePath();
  CTX.stroke();
};
