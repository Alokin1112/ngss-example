export function hashStringToNumber(str: string): number {
  // Use the DJB2 algorithm to hash the string
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }

  return hash >>> 0;
}