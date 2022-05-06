import { Runner } from "../intcodeRunner/intcodeRunner.js";
import { fileToString, commaSeparatedStringToArrayOfInts } from "../utils/readFile.js";
import { permutator } from "../utils/permutator.js";

const phaseSettingPermutations = permutator([0,1,2,3,4]);

const intsString = fileToString("./data.txt");
let ints = commaSeparatedStringToArrayOfInts(intsString);

let maxThrusterSignal = 0;

phaseSettingPermutations.forEach(phaseSettingPermutation => {
  let lastOutput = 0;
  phaseSettingPermutation.forEach(phaseSetting => {
    const intsCopy = [...ints];
    const runner = new Runner(intsCopy, [phaseSetting, lastOutput])
    lastOutput = runner.run()
  })
  maxThrusterSignal = Math.max(lastOutput, maxThrusterSignal);
})

console.log(maxThrusterSignal);