import { fileToString, commaSeparatedStringIntoArrayOfInts } from "../utils/readFile.js";

const parseOpcode = (int) => {
  const asChars = int.toString().split("");
  const length = asChars.length;
  let opcode = parseInt(asChars.slice(-2).join(""), 10);
  const parameterModes = asChars.slice(0, length - 2).reverse().map(c => parseInt(c, 10));
  return {
    "opcode": opcode,
    "parameter modes": parameterModes
  }
}

const getNumbers = (ints, opCodePosition, parameterModes = []) => {
  const parameterOne = ints[opCodePosition + 1];
  const numOne = parameterModes[0] === 1 ? parameterOne : ints[parameterOne];
  const parameterTwo = ints[opCodePosition + 2];
  const numTwo = parameterModes[1] === 1 ? parameterTwo : ints[parameterTwo];
  return [numOne, numTwo];
}

const runIntCode = (ints) => {
  let opCodePosition = 0;
  let running = true;
  let lastOutput = 1; // change?
  while (running) {
    const opCodeDetails = parseOpcode(ints[opCodePosition]);
    const opCode = opCodeDetails["opcode"]; // return two values
    const parameterModes = opCodeDetails["parameter modes"];
    if (opCode === 99) {
      running = false;
      break;
    }
    let numbers, result, insertPosition;
    switch (opCode) {
      case 1: case 2:
        numbers = getNumbers(ints, opCodePosition, parameterModes);
        result = opCode === 1 ? numbers.reduce((a,b) => a + b) : numbers.reduce((a,b) => a * b);
        insertPosition = ints[opCodePosition + 3];
        ints[insertPosition] = result;
        opCodePosition += 4;
        break;
      case 3:
        insertPosition = ints[opCodePosition + 1];
        ints[insertPosition] = lastOutput;
        opCodePosition += 2;
        break;
      case 4:
        const parameter = ints[opCodePosition + 1];
        const output = parameterModes[0] === 1 ? parameter : ints[parameter];
        console.log(output);
        lastOutput = output;
        opCodePosition += 2;
        break;
    }
  }
}

const intsString = fileToString("./data.txt");
const ints = commaSeparatedStringIntoArrayOfInts(intsString);

var output = runIntCode(ints)