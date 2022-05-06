class Runner {
  constructor(intsArray, inputs) {
    this.intsArray = intsArray;
    this.opCodePosition = 0;
    this.inputs = inputs;
  }

  run = () => {
    let running = true;
    while (running) {
      const [opcode, parameterModes] = this.parseOpcode();
      switch (opcode) {
        case 99:
          running = false;
          break;
        case 1:
          this.performAddition(parameterModes);
          break;
        case 2:
          this.performMultiplication(parameterModes);
          break;
        case 3:
          this.insertInput();
          break;
        case 4:
          const output = this.getOutput(parameterModes);
          if (output !== 0) return output;
          break;
        case 5:
          this.jumpIfTrue(parameterModes);
          break;
        case 6:
          this.jumpIfFalse(parameterModes);
          break;
        case 7:
          this.insertOneIfLessThan(parameterModes);
          break;
        case 8:
          this.insertOneIfEqual(parameterModes);
          break;
      }
    }
  }

  performAddition = (parameterModes) => {
    const parameters = this.getParameters(parameterModes);
    const result = parameters.reduce((a, b) => a + b);
    const insertPosition = this.intsArray[this.opCodePosition + 3];
    this.intsArray[insertPosition] = result;
    this.opCodePosition += 4;
  }

  performMultiplication = (parameterModes) => {
    const parameters = this.getParameters(parameterModes);
    const result = parameters.reduce((a, b) => a * b);
    const insertPosition = this.intsArray[this.opCodePosition + 3];
    this.intsArray[insertPosition] = result;
    this.opCodePosition += 4;
  }

  insertInput = () => {
    const insertPosition = this.intsArray[this.opCodePosition + 1];
    this.intsArray[insertPosition] = this.inputs.shift();
    this.opCodePosition += 2;
  }

  getOutput = (parameterModes) => {
    const parameter = this.intsArray[this.opCodePosition + 1];
    const output = parameterModes[0] === 1 ? parameter : this.intsArray[parameter];
    this.opCodePosition += 2;
    return output;
  }

  jumpIfTrue = (parameterModes) => {
    const parameters = this.getParameters(parameterModes);
    if (parameters[0] !== 0) {
      this.opCodePosition = parameters[1];
    } else {
      this.opCodePosition += 3;
    }
  }

  jumpIfFalse = (parameterModes) => {
    const parameters = this.getParameters(parameterModes);
    if (parameters[0] === 0) {
      this.opCodePosition = parameters[1];
    } else {
      this.opCodePosition += 3;
    }
  }

  insertOneIfLessThan = (parameterModes) => {
    const parameters = this.getParameters(parameterModes);
    const insertPosition = this.intsArray[this.opCodePosition + 3];
    this.intsArray[insertPosition] = (parameters[0] < parameters[1]) ? 1 : 0;
    this.opCodePosition += 4;
  }
  
  insertOneIfEqual = (parameterModes) => {
    const parameters = this.getParameters(parameterModes);
    const insertPosition = this.intsArray[this.opCodePosition + 3];
    this.intsArray[insertPosition] = (parameters[0] === parameters[1]) ? 1 : 0;
    this.opCodePosition += 4;    
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
    return [opcode, parameterModes];
  }

  getParameters = (parameterModes = []) => {
    const possibleParameterOne = this.intsArray[this.opCodePosition + 1];
    const parameterOne = parameterModes[0] === 1 ? possibleParameterOne : this.intsArray[possibleParameterOne];
    const possibleParameterTwo = this.intsArray[this.opCodePosition + 2];
    const parameterTwo = parameterModes[1] === 1 ? possibleParameterTwo : this.intsArray[possibleParameterTwo];
    return [parameterOne, parameterTwo];
  }

  firstInSeries = () => {
    return this.intsArray[0];
  }
}

export { Runner };
