const getRandomBinary = () => (Math.random() > 0.5 ? 1 : 0);

const getRandomBinaryArray = (size) =>
  [...Array(size)].map((cell) => getRandomBinary());

const getSierpinskiArray = (size) => {
  const startIndex = Math.ceil(size / 2);
  return [...Array(size)].map((cell, cellIndex) => {
    return cellIndex === startIndex ? 1 : 0;
  });
};

const sierpinskiFilter = (a, b, c) => {
  const inputs = [a, b, c].join("");
  switch (inputs) {
    case "000":
      return 0;
    case "001":
      return 1;
    case "010":
      return 0;
    case "100":
      return 1;
    case "011":
      return 1;
    case "101":
      return 0;
    case "110":
      return 1;
    case "111":
      return 0;
  }
};

const getNextSierpinskiWrapped = (lastGeneration) => {
  const arrLength = lastGeneration.length;
  let newGeneration = [];
  for (let index = 0; index < lastGeneration.length; index++) {
    if (index === 0) {
      newGeneration.push(
        sierpinskiFilter(
          lastGeneration[arrLength - 1],
          lastGeneration[index],
          lastGeneration[index + 1]
        )
      );
    } else if (index === arrLength - 1) {
      newGeneration.push(
        sierpinskiFilter(
          lastGeneration[index - 1],
          lastGeneration[index],
          lastGeneration[0]
        )
      );
    } else {
      newGeneration.push(
        sierpinskiFilter(
          lastGeneration[index - 1],
          lastGeneration[index],
          lastGeneration[index + 1]
        )
      );
    }
  }
  return newGeneration;
};

const renderGeneration = (generation) => {
  const rendered = generation.map((cell) => (cell === 1 ? "@" : "."));
  console.log(...rendered);
};

const testSierpinski = (width, height) => {
  let generation = getSierpinskiArray(width);
  renderGeneration(generation);
  for (let round = 0; round < height - 1; round++) {
    generation = getNextSierpinskiWrapped(generation);
    renderGeneration(generation);
  }
};

testSierpinski(60, 80);
