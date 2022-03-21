import { fileToString, commaSeparatedStringIntoArrayOfInts } from "../utils/readFile.js";

const getNumbers = (ints, opCodePosition) => {
  const posOne = ints[opCodePosition + 1];
  const numOne = ints[posOne];
  const posTwo = ints[opCodePosition + 2];
  const numTwo = ints[posTwo];
  return [numOne, numTwo];
}

const changeNounAndVerb = (ints, noun, verb) => {
  ints.splice(1, 2, noun, verb);
  return ints;
}

const runIntCode = (ints) => {
  let opCodePosition = 0;
  let running = true;
  while (running) {
    const opCode = ints[opCodePosition];
    if (opCode === 99) {
      running = false;
      break;
    }
    const numbers = getNumbers(ints, opCodePosition);
    let result;
    switch (opCode) {
      case 1:
        result = numbers.reduce((a,b) => a + b);
        break;
      case 2:
        result = numbers.reduce((a,b) => a * b);
        break;
    }
    const insertPosition = ints[opCodePosition + 3];
    ints.splice(insertPosition, 1, result);
    opCodePosition += 4;
  }
  return ints[0];
}

const findNounAndVerb = (targetResult) => {
  const intsString = fileToString("./data.txt");
  const intsOriginal = intsString.split(",").map(char => parseInt(char, 10))
  for (let noun = 0 ; noun < 99 ; noun += 1)
  {
    for (let verb = 0 ; verb < 99 ; verb += 1)
    {
      const intsCopy = [...intsOriginal];
      const ints = changeNounAndVerb(intsCopy, noun, verb);
      const result = runIntCode(ints)
      if (result === targetResult)
      {
        return noun * 100 + verb
      }
    }
  }
}

// const intsString = fileToString("./data.txt");
// const ints = commaSeparatedStringIntoArrayOfInts(intsString);

// console.log(runIntCode(changeNounAndVerb(ints, 12, 2)))

// console.log(findNounAndVerb(19690720));

export { changeNounAndVerb, runIntCode, findNounAndVerb };
