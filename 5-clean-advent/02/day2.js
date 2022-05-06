import { fileToString, commaSeparatedStringToArrayOfInts } from "../utils/readFile.js";
import { Runner } from "../intcodeRunner/intcodeRunner.js";

const intsString = fileToString("./data.txt");

// Part 1

let ints = commaSeparatedStringToArrayOfInts(intsString);

const changeNounAndVerb = (ints, noun, verb) => {
  ints.splice(1, 2, noun, verb);
  return ints;
}

ints = changeNounAndVerb(ints, 12, 2);

const runner = new Runner(ints);
runner.run();
console.log(runner.firstInSeries());

// Part 2

const findNounAndVerb = (targetResult) => {
  const intsOriginal = commaSeparatedStringToArrayOfInts(intsString);
  for (let noun = 0; noun < 99; noun += 1) {
    for (let verb = 0; verb < 99; verb += 1) {
      const intsCopy = [...intsOriginal];
      changeNounAndVerb(intsCopy, noun, verb);
      const runner = new Runner(intsCopy);
      runner.run();
      const result = runner.firstInSeries();
      if (result === targetResult) {
        return noun * 100 + verb
      }
    }
  }
}

console.log(findNounAndVerb(19690720));
