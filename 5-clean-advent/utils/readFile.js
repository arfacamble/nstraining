import { readFileSync } from "fs";

const fileToString = (filePath) => readFileSync(filePath).toString();
const stringIntoArrayOfLines = (string) => string.split("\n");
const commaSeparatedStringIntoArrayOfInts = (string) => string.split(",").map(char => parseInt(char, 10));

export { fileToString, stringIntoArrayOfLines, commaSeparatedStringIntoArrayOfInts }