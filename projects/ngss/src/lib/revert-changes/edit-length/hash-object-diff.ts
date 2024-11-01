import { hashStringToNumber } from "projects/ngss/src/lib/utils/hash/djb2-hash.const";


type HashWithValue<T> = {
  hash: number;
  value: T extends Array<infer U> ? HashWithValue<U>[] : (T extends object ? HashWithValue<HashObject<T>> : T);
}

type HashObject<T> = {
  [K in keyof T]: HashWithValue<T[K]>
}



// export const getDifferences(prev: HashDiff<unknown>, modified: HashDiff<unknown>, prefixKey: string) {
//   const prevHashes = prev.hashes;
//   const modifiedHashes = modified.hashes;

//   let differences: Record<string, unknown> = {};

//   for (const key in prevHashes) {
//     const prevKeyHash = prevHashes[key];
//     const modifiedKeyHash = modifiedHashes[key];
//     if (prevHashes !=)
//   }


//   return differences;
// }

export const calculateHash = <T>(property: T): HashWithValue<T> => {
  const hash: HashWithValue<T> = {} as HashWithValue<T>;

  if (property instanceof Array) {

  } else if (property instanceof Object) {
    const value = Object.keys(property)?.reduce((acc, key) => {
      acc[key] = calculateHash(property[key]);
      return acc;
    }, {});

  } else {
    hash.hash = hashStringToNumber(JSON.stringify(property));
    hash.value = property;
  }

  return hash;
}

function getNestedValue(object: unknown, path: string): unknown {
  return path.split('.').reduce((acc, key) => {
    if (acc instanceof Array) {
      return acc?.[parseInt(key)];
    } else {
      return acc?.[key] || null;
    }
  }, object)
}