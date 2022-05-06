import { fileToString, commaSeparatedStringToArrayOfInts } from "../utils/readFile.js";
import { Runner } from "../intcodeRunner/intcodeRunner.js";

// day 2
console.log("\n\n____________________________")
console.log("     - - - day 2 - - -")
console.log("============================")

let intsString = fileToString("./02/data.txt");

// Part 1
console.log("\n          part 1")
console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~")

let ints = commaSeparatedStringToArrayOfInts(intsString);

const changeNounAndVerb = (ints, noun, verb) => {
  ints.splice(1, 2, noun, verb);
  return ints;
}

ints = changeNounAndVerb(ints, 12, 2);

const runner = new Runner(ints);
runner.run();
let result = runner.firstInSeries();
console.log(`\n ${result} should be 3895705`);
console.log((result === 3895705) ? "   ---  SUCCEEEEESS  ---" : "      :(  broken  :(")

// Part 2
console.log("\n          part 2")
console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~")

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

const nounAndVerb = findNounAndVerb(19690720);
console.log(`\n    ${nounAndVerb} should be 6417`);
console.log((nounAndVerb === 6417) ? "   ---  SUCCEEEEESS  ---" : "      :(  broken  :(")




// day 5
console.log("\n\n____________________________")
console.log("     - - - day 5 - - -")
console.log("============================")

intsString = fileToString("05/data.txt");

// Part 1
console.log("\n          part 1")
console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~")

const intsPartOne = commaSeparatedStringToArrayOfInts(intsString);
const runnerPartOne = new Runner(intsPartOne, [1]);
result = runnerPartOne.run()
console.log(`\n${result} should be 16225258`);
console.log((result === 16225258) ? "   ---  SUCCEEEEESS  ---" : "      :(  broken  :(")

// Part 2
console.log("\n          part 2")
console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~")

const intsPartTwo = commaSeparatedStringToArrayOfInts(intsString);
const runnerPartTwo = new Runner(intsPartTwo, [5]);
result = runnerPartTwo.run()
console.log(`\n ${result} should be 2808771`);
console.log((result === 2808771) ? "   ---  SUCCEEEEESS  ---" : "      :(  broken  :(")
