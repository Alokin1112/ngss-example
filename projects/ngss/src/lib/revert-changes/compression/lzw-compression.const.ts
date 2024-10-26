export const lzw_encode = (value: unknown): string => {
  if (!value) return "";
  const s = JSON.stringify(value);
  const dict = new Map<string, number>();
  const data = (s + "").split("");
  const numberOut: number[] = [];
  let currChar: string;
  let phrase = data[0];
  let code = 256;
  for (let i = 1; i < data.length; i++) {
    currChar = data[i];
    if (dict.has(phrase + currChar)) {
      phrase += currChar;
    } else {
      numberOut.push(phrase.length > 1 ? dict.get(phrase) : phrase.charCodeAt(0));
      dict.set(phrase + currChar, code);
      code++;
      phrase = currChar;
    }
  }
  numberOut.push(phrase.length > 1 ? dict.get(phrase) : phrase.charCodeAt(0));
  const out = numberOut.map((num) => String.fromCharCode(num));
  return out.join("");
};

export const lzw_decode = <T>(s: string): T => {
  const dict = new Map<number, string>();
  const data = (s + "").split("");
  let currChar = data[0];
  let oldPhrase = currChar;
  const out = [currChar];
  let code = 256;
  let phrase: string;
  for (let i = 1; i < data.length; i++) {
    const currCode = data[i].charCodeAt(0);
    if (currCode < 256) {
      phrase = data[i];
    } else {
      phrase = dict.has(currCode) ? dict.get(currCode) : (oldPhrase + currChar);
    }
    out.push(phrase);
    currChar = phrase.charAt(0);
    dict.set(code, oldPhrase + currChar);
    code++;
    oldPhrase = phrase;
  }
  return JSON.parse(out.join("")) as T;
};