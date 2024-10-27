export function add(a: i32, b: i32): i32 {
  return a + b;
}

export function lzwEncode(input: string): string {
  const dictionary: Map<string, i32> = new Map<string, i32>();
  let dictSize: i32 = 256;
  for (let i = 0; i < 256; i++) {
    dictionary.set(String.fromCharCode(i), i);
  }

  let w: string = "";
  const result: i32[] = [];

  for (let i = 0; i < input.length; i++) {
    const c: string = input.charAt(i);
    const wc: string = w + c;
    if (dictionary.has(wc)) {
      w = wc;
    } else {
      const wCode = dictionary.get(w);
      if (wCode !== null) {
        result.push(wCode);
      }
      dictionary.set(wc, dictSize++);
      w = c;
    }
  }

  if (w !== "") {
    const wCode = dictionary.get(w);
    if (wCode !== null) {
      result.push(wCode);
    }
  }

  return result.map<string>(code => String.fromCharCode(code)).join("");
}

export function lzwDecode(input: string): string {
  const dictionary: Map<i32, string> = new Map<i32, string>();
  let dictSize: i32 = 256;
  for (let i = 0; i < 256; i++) {
    dictionary.set(i, String.fromCharCode(i));
  }

  const codes: i32[] = input.split("").map<i32>(char => char.charCodeAt(0));
  let w: string = String.fromCharCode(codes[0]);
  let result: string = w;

  for (let i = 1; i < codes.length; i++) {
    const k: i32 = codes[i];
    let entry: string;
    if (dictionary.has(k)) {
      entry = dictionary.get(k);
    } else if (k === dictSize) {
      entry = w + w.charAt(0);
    } else {
      throw new Error("Invalid LZW code.");
    }

    result += entry;

    dictionary.set(dictSize++, w + entry.charAt(0));
    w = entry;
  }

  return result;
}