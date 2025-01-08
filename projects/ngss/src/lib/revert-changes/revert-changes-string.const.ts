import { RevertChangesStringStateOperations, RevertChangesStringStateOperationsType } from "projects/ngss/src/lib/revert-changes/revert-changes-string-state-operations.interface";

enum EditOperation {
  Insert,
  Delete,
  Substitute
}

class Edit {
  operation: EditOperation;
  char: string;
  position: number;

  constructor(operation: EditOperation, char: string, position: number) {
    this.operation = operation;
    this.char = char;
    this.position = position;
  }
}
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
      if (a.charAt(i - 1) === b.charAt(j - 1)) {
        curr[j] = prev[j - 1];
      } else {
        curr[j] = Math.min(prev[j], curr[j - 1], prev[j - 1]) + 1;
      }
    }
    [prev, curr] = [curr, prev];
  }
  return prev;
}

function pushInsert(changes: Edit[], char: string, pos: number): void {
  if (changes.length === 0) {
    changes.push(new Edit(EditOperation.Insert, char, pos));
    return;
  }
  const last = changes[changes.length - 1];
  if (last.operation === EditOperation.Insert && last.position === pos) {
    last.char = char + last.char;
  } else {
    changes.push(new Edit(EditOperation.Insert, char, pos));
  }
}

function pushEdit(changes: Edit[], char: string, pos: number): void {
  if (changes.length === 0) {
    changes.push(new Edit(EditOperation.Substitute, char, pos));
    return;
  }
  const last = changes[changes.length - 1];
  if (last.operation === EditOperation.Substitute && (last.position + last.char.length) === pos) {
    last.char = last.char + char;
  } else {
    changes.push(new Edit(EditOperation.Substitute, char, pos));
  }
}

function pushDelete(changes: Edit[], char: string, pos: number): void {
  if (changes.length === 0) {
    changes.push(new Edit(EditOperation.Delete, " ", pos));
    return;
  }
  const last = changes[changes.length - 1];
  if (last.operation === EditOperation.Delete && (last.position + last.char.length) === pos) {
    last.char = last.char + " ";
  } else if (last.operation === EditOperation.Delete && (last.position - 1) === pos) {
    last.char = " " + last.char;
    last.position = pos;
  } else {
    changes.push(new Edit(EditOperation.Delete, " ", pos));
  }
}

// Main Hirschberg's algorithm
function hirschberg(a: string, b: string, i: number, j: number, changes: Edit[]): void {
  const m = j - i;
  const n = b.length;

  if (m === 0) {
    for (let k = 0; k < n; k++) {
      pushInsert(changes, b.charAt(k), i + k);
    }
  } else if (n === 0) {
    for (let k = 0; k < m; k++) {
      pushDelete(changes, a.charAt(i + k), i + k);
    }
  } else if (m === 1 || n === 1) {
    simpleLevenshtein(a, b, i, j, changes);
  } else {
    const mid = Math.floor(m / 2);
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

// Helper function to handle small cases using Levenshtein
function simpleLevenshtein(a: string, b: string, i: number, j: number, changes: Edit[]): void {
  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Int32Array(n + 1));

  for (let x = 0; x <= m; x++) {
    dp[x][0] = x;
  }
  for (let y = 0; y <= n; y++) {
    dp[0][y] = y;
  }

  for (let x = 1; x <= m; x++) {
    for (let y = 1; y <= n; y++) {
      if (a.charAt(x - 1) === b.charAt(y - 1)) {
        dp[x][y] = dp[x - 1][y - 1];
      } else {
        dp[x][y] = Math.min(dp[x - 1][y], dp[x][y - 1], dp[x - 1][y - 1]) + 1;
      }
    }
  }

  let x = m, y = n;
  while (x > 0 || y > 0) {
    if (x > 0 && dp[x][y] === dp[x - 1][y] + 1) {
      pushDelete(changes, a.charAt(x - 1), i + x - 1);
      x--;
    } else if (y > 0 && dp[x][y] === dp[x][y - 1] + 1) {
      pushInsert(changes, b.charAt(y - 1), i + x);
      y--;
    } else {
      if (dp[x][y] === dp[x - 1][y - 1] + 1) {
        pushEdit(changes, b.charAt(y - 1), i + x - 1);
      }
      x--;
      y--;
    }
  }
}

// Initialization function to invoke Hirschberg's algorithm
export function getStringChanges(a: unknown, b: unknown): RevertChangesStringStateOperations[] {
  const changes: Edit[] = [];
  const aStr = JSON.stringify(a);
  const bStr = JSON.stringify(b);
  hirschberg(aStr, bStr, 0, aStr.length, changes);
  return mapToRevertChangesStringStateOperations(changes);
}

function mapToRevertChangesStringStateOperations(edit: Edit[]): RevertChangesStringStateOperations[] {
  return edit.map((e) => ({
    op: toRevertChangesStringStateOperationsType(e.operation),
    pos: e.position,
    char: e.char,
  }));
}

function toRevertChangesStringStateOperationsType(op: EditOperation): RevertChangesStringStateOperationsType {
  switch (op) {
    case EditOperation.Insert:
      return 'add';
    case EditOperation.Delete:
      return 'del';
    case EditOperation.Substitute:
      return 'sub';
  }
}