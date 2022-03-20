import { readFileSync } from "fs";

const fileToString = (filePath) => readFileSync(filePath).toString();
const stringIntoArrayOfLines = (string) => string.split("\n");

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

let ints = fileToString("./data.txt");
ints = ints.split(",").map(char => parseInt(char, 10));
console.log(ints);

export { changeNounAndVerb, runIntCode };
