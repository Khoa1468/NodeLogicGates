export function BUFFER(val1: boolean) {
  return Boolean(val1);
}

export function AND(val1: boolean, val2: boolean) {
  return val1 && val2;
}

export function NOT(val1: boolean) {
  return !val1;
}

export function NAND(val1: boolean, val2: boolean) {
  return NOT(AND(val1, val2));
}

export function OR(val1: boolean, val2: boolean) {
  return NAND(NOT(val1), NOT(val2));
}

export function NOR(val1: boolean, val2: boolean) {
  return NOT(OR(val1, val2));
}

export function XOR(val1: boolean, val2: boolean) {
  return AND(OR(val1, val2), NAND(val1, val2));
}

export function XNOR(val1: boolean, val2: boolean) {
  return NOT(XOR(val1, val2));
}

export function HALF_ADDER(x1: boolean, y1: boolean) {
  const XOR1 = XOR(x1, y1);
  const AND1 = AND(x1, y1);
  return [XOR1, AND1];
}

export function ADDER(val1: boolean, val2: boolean, carry: boolean) {
  const [S1, C1] = HALF_ADDER(val1, val2);
  const [S2, C2] = HALF_ADDER(S1, carry);
  return [S2, OR(C1, C2)];
}

export function FOUR_BIT_ADDER(
  x1: boolean,
  x2: boolean,
  x3: boolean,
  x4: boolean,
  y1: boolean,
  y2: boolean,
  y3: boolean,
  y4: boolean,
  carry: boolean
): [[boolean, boolean, boolean, boolean], boolean] {
  const [S1, C1] = ADDER(x4, y4, carry);
  const [S2, C2] = ADDER(x3, y3, C1);
  const [S3, C3] = ADDER(x2, y2, C2);
  const [S4, C4] = ADDER(x1, y1, C3);
  return [[S4, S3, S2, S1], C4];
}

export function FOUR_BIT_ADDER_SUBTRACTOR(
  x1: boolean,
  x2: boolean,
  x3: boolean,
  x4: boolean,
  y1: boolean,
  y2: boolean,
  y3: boolean,
  y4: boolean,
  subtract: boolean
): [[boolean, boolean, boolean, boolean], boolean, boolean, boolean] {
  const XOR1 = XOR(y1, subtract);
  const XOR2 = XOR(y2, subtract);
  const XOR3 = XOR(y3, subtract);
  const XOR4 = XOR(y4, subtract);
  const fourBit = FOUR_BIT_ADDER(
    x1,
    x2,
    x3,
    x4,
    XOR1,
    XOR2,
    XOR3,
    XOR4,
    subtract
  );
  const [S1, S2, S3, S4] = fourBit[0];
  const NOT1 = NOT(S1);
  const NOT2 = NOT(S2);
  const NOT3 = NOT(S3);
  const NOT4 = NOT(S4);
  const AND1 = AND(NOT1, NOT2);
  const AND2 = AND(AND1, NOT3);
  const AND3 = AND(AND2, NOT4);

  return [fourBit[0], fourBit[1], S1, AND3];
}

export function HALF_SUBTRACTOR(x1: boolean, y1: boolean) {
  const XOR1 = XOR(x1, y1);
  const AND1 = AND(NOT(x1), y1);
  return [XOR1, AND1];
}

export function SUBTRACTOR(val1: boolean, val2: boolean, bIn: boolean) {
  const [S1, C1] = HALF_SUBTRACTOR(val1, val2);
  const [S2, C2] = HALF_SUBTRACTOR(S1, bIn);
  return [S2, OR(C1, C2)];
}

export function FOUR_BIT_SUBTRACTOR(
  x1: boolean,
  x2: boolean,
  x3: boolean,
  x4: boolean,
  y1: boolean,
  y2: boolean,
  y3: boolean,
  y4: boolean,
  bIn: boolean
): [[boolean, boolean, boolean, boolean], boolean] {
  const [S1, C1] = SUBTRACTOR(x4, y4, bIn);
  const [S2, C2] = SUBTRACTOR(x3, y3, C1);
  const [S3, C3] = SUBTRACTOR(x2, y2, C2);
  const [S4, C4] = SUBTRACTOR(x1, y1, C3);
  return [[S4, S3, S2, S1], C4];
}

export function toNumber(val: boolean) {
  return val ? 1 : 0;
}

export function toStrNumber(val: boolean) {
  return toNumber(val).toString();
}

export function binaryToDecimal(bstr: string) {
  return parseInt((bstr + "").replace(/[^01]/gi, ""), 2);
}

// console.log(convertString);

// console.log(
//   FOUR_BIT_ADDER(true, false, false, true, true, false, true, false, false)
// );

// console.log(NAND(true, true))

// console.log(OR(true, true))

// console.log(NOR(true, true))

// console.log(XOR(true, true))

// console.log(XNOR(true, true))

// console.log(...ADDER(false, true, true));

// console.log(...SUBTRACTOR(false, true, false));

// console.log(
//   FOUR_BIT_SUBTRACTOR(
//     true,
//     true,
//     false,
//     false,
//     false,
//     false,
//     true,
//     false,
//     false
//   )[0]
// );

// console.log(
//   FOUR_BIT_ADDER_SUBTRACTOR(
//     true,
//     true,
//     false,
//     false,
//     false,
//     false,
//     true,
//     false,
//     true
//   )[0]
// );
