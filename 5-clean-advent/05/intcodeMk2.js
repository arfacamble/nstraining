const parseOpcode = (int) => {
  const asChars = int.toString().split("");
  const length = asChars.length;
  let opcode = parseInt(asChars.slice(length - 2).join(""), 10);
  const parameterModes = asChars.slice(0, length - 2).reverse().map(c => parseInt(c, 10));
  return {
    "opcode": opcode,
    "parameter modes": parameterModes
  }
}


console.log(parseOpcode(1002))
console.log(parseOpcode(11003))
console.log(parseOpcode(78099))