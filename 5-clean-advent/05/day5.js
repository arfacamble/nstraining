import { fileToString, commaSeparatedStringToArrayOfInts } from "../utils/readFile.js";
import { Runner } from "../intcodeRunner/intcodeRunner.js";

const intsString = fileToString("./data.txt");

// part 1

console.log("Part 1:")

const intsPartOne = commaSeparatedStringToArrayOfInts(intsString);
const runnerPartOne = new Runner(intsPartOne, 1);
runnerPartOne.run();

// part 2

console.log("Part 2:")

const intsPartTwo = commaSeparatedStringToArrayOfInts(intsString);
const runnerPartTwo = new Runner(intsPartTwo, 5);
runnerPartTwo.run();
