import { changeNounAndVerb, runIntCode, findNounAndVerb } from "../02/intcode.js";

console.log("=====================================================")
console.log("\n         --- Testing Day 2 ---")
console.log("\n           ~~ runIntCode ~~")

const cases = {
  1: {
    "input": [1, 0, 0, 0, 99],
    "output": [2, 0, 0, 0, 99]
  },
  2: {
    "input": [2, 3, 0, 3, 99],
    "output": [2, 3, 0, 6, 99]
  },
  3: {
    "input": [2, 4, 4, 5, 99, 0],
    "output": [2, 4, 4, 5, 99, 9801]
  },
  4: {
    "input": [1, 1, 1, 4, 99, 5, 6, 0, 99],
    "output": [30, 1, 1, 4, 2, 5, 6, 0, 99]
  },
  5: {
    "input": [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50],
    "output": [3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50]
  }
}

Object.entries(cases).forEach(element => {
  const [ count, values ] = element;
  console.log(`\n |-|-|  Test case ${count}  |-|-|`);
  console.log(`   input : ${values["input"]}`)
  const result = runIntCode(values["input"]);
  console.log(`   Result: ${result === values["output"][0] ? "PASS" : "FAIL" }`)
});

console.log("\n\n__________________________________________________\n")
console.log("|-|-|  ~~ runIntCode large case with swap ~~ |-|-|")
const data = [1, 0, 0, 3, 1, 1, 2, 3, 1, 3, 4, 3, 1, 5, 0, 3, 2, 1, 9, 19, 1, 19, 5, 23, 2, 23, 13, 27, 1, 10, 27, 31, 2, 31, 6, 35, 1, 5, 35, 39, 1, 39, 10, 43, 2, 9, 43, 47, 1, 47, 5, 51, 2, 51, 9, 55, 1, 13, 55, 59, 1, 13, 59, 63, 1, 6, 63, 67, 2, 13, 67, 71, 1, 10, 71, 75, 2, 13, 75, 79, 1, 5, 79, 83, 2, 83, 9, 87, 2, 87, 13, 91, 1, 91, 5, 95, 2, 9, 95, 99, 1, 99, 5, 103, 1, 2, 103, 107, 1, 10, 107, 0, 99, 2, 14, 0, 0];
const input = changeNounAndVerb(data, 12, 2);
let result = runIntCode(input);
console.log(`\n           Result: ${result === 3895705 ? "PASS" : "FAIL"}\n__________________________________________________`)

console.log("\n\n           ~~ findNounAndVerb ~~")
console.log(`\n |-|-|     Test case     |-|-|`);
console.log(`   input : 19690720`)
result = findNounAndVerb(19690720)
console.log(`   result : ${result}`)
console.log(`\n           Result: ${result === 6417 ? "PASS" : "FAIL"}\n__________________________________________________`)
console.log("\n=====================================================\n")
