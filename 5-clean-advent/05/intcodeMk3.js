import { fileToString, commaSeparatedStringIntoArrayOfInts } from "../utils/readFile.js";

class Runner {
  constructor(intsArray) {
    this.intsArray = intsArray;
    this.opCodePosition = 0;
    this.input = 1;
  }

  parseOpcode = () => {
    const int = this.intsArray[this.opCodePosition];
    let opcode = int % 100;
    const parameterModes =
      Math.floor(int / 100)
      .toString()
      .split("")
      .reverse()
      .map(char => parseInt(char, 10));
    return {
      opcode: opcode,
      parameterModes: parameterModes
    }
  }
 
  getParameters = (parameterModes = []) => {
    const possibleParameterOne = intsArray[opCodePosition + 1];
    const parameterOne = parameterModes[0] === 1 ? possibleParameterOne : intsArray[parameterOne];
    const possibleParameterTwo = intsArray[opCodePosition + 2];
    const parameterTwo = parameterModes[1] === 1 ? possibleParameterTwo : intsArray[parameterTwo];
    return [parameterOne, parameterTwo];
  }

  run = () => {
    let running = true;
    while (running) {
      const {opcode, parameterModes} = this.parseOpcode();
      let parameters, result, insertPosition;
      switch (opCode) {
        case 99:
          running = false;
          break;
        case 1: case 2:
          parameters = this.getParameters(parameterModes);
          result = opCode === 1 ? parameters.reduce((a,b) => a + b) : parameters.reduce((a,b) => a * b);
          insertPosition = this.intsArray[opCodePosition + 3];
          this.intsArray[insertPosition] = result;
          opCodePosition += 4;
          break;
        case 3:
          insertPosition = this.intsArray[opCodePosition + 1];
          this.intsArray[insertPosition] = this.input;
          opCodePosition += 2;
          break;
        case 4:
          const parameter = this.intsArray[opCodePosition + 1];
          const output = parameterModes[0] === 1 ? parameter : this.intsArray[parameter];
          console.log(output);
          opCodePosition += 2;
          break;
        case 5:
          parameters = this.getParameters(parameterModes);
          if (parameters[0] !== 0) {
            this.opCodePosition = parameters[1];
          } else {
            this.opCodePosition += 3;
          }
          break;
        case 6:
          parameters = this.getParameters(parameterModes);
          if (parameters[0] === 0) {
            this.opCodePosition = parameters[1];
          } else {
            this.opCodePosition += 3;
          }
          break;
        case 7:
          parameters = this.getParameters(parameterModes);
          insertPosition = this.intsArray[this.opCodePosition + 3];
          this.intsArray[insertPosition] = (parameters[0] < parameters[1]) ? 1 : 0;
          break;
        case 8:
          parameters = this.getParameters(parameterModes);
          insertPosition = this.intsArray[this.opCodePosition + 3];
          this.intsArray[insertPosition] = (parameters[0] === parameters[1]) ? 1 : 0;
          break;
      }
    }
  }
}

const intsString = fileToString("./data.txt");
const ints = commaSeparatedStringIntoArrayOfInts(intsString);

const runner = new Runner(ints);
runner.run();
