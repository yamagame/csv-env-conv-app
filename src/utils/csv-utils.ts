const alphaToNumber = (str: string) => {
  const c = str.charCodeAt(0);
  const code_A = "A".charCodeAt(0);
  const code_Z = "Z".charCodeAt(0);
  if (c >= code_A && c <= code_Z) {
    return `${c - code_A}`;
  }
  const code_a = "a".charCodeAt(0);
  const code_z = "z".charCodeAt(0);
  if (c >= code_a && c <= code_z) {
    return `${c - code_a}`;
  }
  return str;
};

const strToPos = (pos: string) => {
  const [startLine, name, value] = pos.split(":").map((v) => v.trim());
  const ret = {
    startLine: parseInt(startLine), // 行
    name: parseInt(alphaToNumber(name)), // 列(名)
    value: parseInt(alphaToNumber(value)), // 列(値)
  };
  return ret;
};

export const csvToEnv = (csv: string, pos: string) => {
  const csvArray = csv.split("\n").map((line) => {
    return line.split("\t").map((v) => ({ value: v }));
  });
  const p = strToPos(pos);
  const sum = csvArray.reduce((sum, row, rowInd) => {
    if (rowInd >= p.startLine) {
      const name = row[p.name]?.value || "";
      const value = row[p.value]?.value || "";
      const line = `${name}=${value}`;
      const RE_INI_KEY_VAL = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/;
      if (line.match(RE_INI_KEY_VAL)) sum.push(line);
    }
    return sum;
  }, [] as string[]);
  console.log(sum);
  return sum.join("\n");
};
