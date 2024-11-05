export function lzwEncode(input: string): string {
  // Initialize the dictionary
  const dictionary = new Map<string, i32>();
  let dictSize = 256;
  for (let i = 0; i < 256; i++) {
    dictionary.set(String.fromCharCode(i), i);
  }

  let currentStr = "";
  const output = new Array<i32>();

  // Iterate through input string
  for (let i = 0; i < input.length; i++) {
    const currentChar = input[i];
    const combinedStr = currentStr + currentChar;

    if (dictionary.has(combinedStr)) {
      currentStr = combinedStr;
    } else {
      output.push(dictionary.get(currentStr)!);
      dictionary.set(combinedStr, dictSize++);
      currentStr = currentChar;
    }
  }

  if (currentStr !== "") {
    output.push(dictionary.get(currentStr)!);
  }

  return output.map<string>(code => String.fromCharCode(code)).join("");
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

// Typ enumeracyjny reprezentujący typ zmiany
enum EditOperation {
  Insert,
  Delete,
  Substitute
}

// Struktura zmian
class Edit {
  operation: EditOperation;
  char: string;
  position: i32;

  constructor(operation: EditOperation, char: string, position: i32) {
    this.operation = operation;
    this.char = char;
    this.position = position;
  }

  toString(): string {
    let operation: string;
    switch (this.operation) {
      case EditOperation.Insert:
        operation = "add";
        break;
      case EditOperation.Delete:
        operation = "del";
        break;
      case EditOperation.Substitute:
        operation = "sub";
        break;
      default:
        operation = "unk";
        break;
    }
    return `{"op": "${operation}", "char": "${this.char}", "pos": ${this.position.toString()}}`;
  }
}

// Funkcja pomocnicza do obliczenia ostatniego wiersza tablicy LCS
function computeLastLine(a: string, b: string): Int32Array {
  const m = a.length;
  const n = b.length;
  let prev = new Int32Array(n + 1);
  let curr = new Int32Array(n + 1);

  for (let j = 0; j <= n; j++) {
    prev[j] = j;
  }

  for (let i = 1; i <= m; i++) {
    curr[0] = i;
    for (let j = 1; j <= n; j++) {
      if (a.charAt(i - 1) == b.charAt(j - 1)) {
        curr[j] = prev[j - 1];
      } else {
        curr[j] = i32(Math.min(Math.min(prev[j], curr[j - 1]), prev[j - 1]) + 1);
      }
    }
    let temp = prev;
    prev = curr;
    curr = temp;
  }
  return prev;
}

// Funkcja główna algorytmu Hirschberga
function hirschberg(a: string, b: string, i: i32, j: i32, changes: Array<Edit>): void {
  const m = j - i;
  const n = b.length;

  if (m == 0) {
    for (let k = 0; k < n; k++) {
      changes.push(new Edit(EditOperation.Insert, b.charAt(k), i + k));
    }
  } else if (n == 0) {
    for (let k = 0; k < m; k++) {
      changes.push(new Edit(EditOperation.Delete, a.charAt(i + k), i + k));
    }
  } else if (m == 1 || n == 1) {
    // Podstawowy przypadek: korzystamy z algorytmu Levenshteina
    simpleLevenshtein(a, b, i, j, changes);
  } else {
    // Dzielenie problemu na dwie części
    const mid = m / 2;
    const aLeft = a.slice(0, mid);
    const aRight = a.slice(mid);

    const scoreL = computeLastLine(aLeft, b);
    const scoreR = computeLastLine(aRight.split("").reverse().join(""), b.split("").reverse().join(""));

    let q = 0;
    let minCost = scoreL[0] + scoreR[n];

    for (let k = 1; k <= n; k++) {
      const cost = scoreL[k] + scoreR[n - k];
      if (cost < minCost) {
        minCost = cost;
        q = k;
      }
    }

    hirschberg(aLeft, b.slice(0, q), i, i + mid, changes);
    hirschberg(aRight, b.slice(q), i + mid, j, changes);
  }
}

// Funkcja pomocnicza do znalezienia najkrótszej sekwencji zmian między dwoma krótkimi ciągami (Levenshtein)
function simpleLevenshtein(a: string, b: string, i: i32, j: i32, changes: Array<Edit>): void {
  const m = a.length;
  const n = b.length;
  let dp = new Array<Int32Array>(m + 1);

  // Inicjalizujemy 2D Int32Array
  for (let x = 0; x <= m; x++) {
    dp[x] = new Int32Array(n + 1);
    dp[x][0] = x;
  }
  for (let y = 0; y <= n; y++) {
    dp[0][y] = y;
  }

  for (let x = 1; x <= m; x++) {
    for (let y = 1; y <= n; y++) {
      if (a.charAt(x - 1) == b.charAt(y - 1)) {
        dp[x][y] = dp[x - 1][y - 1];
      } else {
        dp[x][y] = i32(Math.min(Math.min(dp[x - 1][y], dp[x][y - 1]), dp[x - 1][y - 1]) + 1);
      }
    }
  }

  let x = m, y = n;
  while (x > 0 || y > 0) {
    if (x > 0 && dp[x][y] == dp[x - 1][y] + 1) {
      changes.push(new Edit(EditOperation.Delete, a.charAt(x - 1), i + x - 1));
      x--;
    } else if (y > 0 && dp[x][y] == dp[x][y - 1] + 1) {
      changes.push(new Edit(EditOperation.Insert, b.charAt(y - 1), i + x));
      y--;
    } else {
      if (dp[x][y] == dp[x - 1][y - 1] + 1) {
        changes.push(new Edit(EditOperation.Substitute, b.charAt(y - 1), i + x - 1));
      }
      x--;
      y--;
    }
  }
}

// Funkcja inicjalizująca, wywołująca algorytm Hirschberga
export function getChanges(a: string, b: string): Array<string> {
  const changes: Array<Edit> = [];
  hirschberg(a, b, 0, a.length, changes);
  return changes.map<string>(edit => edit.toString());
}