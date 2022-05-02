class Runner {
  constructor(intsArray, input) {
    this.intsArray = intsArray;
    this.opCodePosition = 0;
    this.input = input;
  }

  run = () => {
    let running = true;
    while (running) {
      const [opcode, parameterModes] = this.parseOpcode();
      let parameters, result, insertPosition;
      switch (opcode) {
        case 99:
          running = false;
          break;
          case 1:
            parameters = this.getParameters(parameterModes);
            result = parameters.reduce((a, b) => a + b);
            insertPosition = this.intsArray[this.opCodePosition + 3];
          this.intsArray[insertPosition] = result;
          this.opCodePosition += 4;
          break;
        case 2:
          parameters = this.getParameters(parameterModes);
          result = parameters.reduce((a, b) => a * b);
          insertPosition = this.intsArray[this.opCodePosition + 3];
          this.intsArray[insertPosition] = result;
          this.opCodePosition += 4;
          break;
        case 3:
          insertPosition = this.intsArray[this.opCodePosition + 1];
          this.intsArray[insertPosition] = this.input;
          this.opCodePosition += 2;
          break;
        case 4:
          const parameter = this.intsArray[this.opCodePosition + 1];
          const output = parameterModes[0] === 1 ? parameter : this.intsArray[parameter];
          console.log(output);
          this.opCodePosition += 2;
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
          this.opCodePosition += 4;
          break;
        case 8:
          parameters = this.getParameters(parameterModes);
          insertPosition = this.intsArray[this.opCodePosition + 3];
          this.intsArray[insertPosition] = (parameters[0] === parameters[1]) ? 1 : 0;
          this.opCodePosition += 4;
          break;
      }
    }
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
