export function combineAllArrays(arrays: string[][]): string[][] {
  let result: string[][] = combineTwoArrays(arrays[0], arrays[1]);
  for (let i = 2; i < arrays.length; i++) {
    result = combineListWithArray(result, arrays[i]);
  }
  return result;
}

export function combineTwoArrays(arr1: string[], arr2: string[]): string[][] {
  var result: string[][] = [];
  arr1.forEach((word1) => arr2.forEach((word2) => result.push([word1, word2])));
  return result;
}

export function combineListWithArray(
  list: string[][],
  arr2: string[]
): string[][] {
  var result: string[][] = [];
  list.forEach((l) => arr2.forEach((word2) => result.push([...l, word2])));
  return result;
}
