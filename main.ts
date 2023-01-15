import { ProcessedList, WordOption, WordSegments } from "./types/types";

// This will change to the actual list
const words = [
  "test",
  "ge",
  "adgf",
  "test20",
  "20",
  "ad",
  "adgfad",
  "20test",
  "2",
];

// This wil be moved to a config file
const MAX_WORD_LENGTH = 6;
const MAX_WORD_SEGMENTS = 3;

export const printLine = (wordOption: WordOption): string =>
  wordOption.components.join("+") + "=" + wordOption.result;

function splitListOnMaxLength(
  wordList: string[],
  maxWordLength: number
): ProcessedList {
  const result: ProcessedList = { wordResults: [] };

  return wordList.reduce((acc, val) => {
    const wordLenght = val.length;
    if (wordLenght === maxWordLength) acc.wordResults.push(val);
    else if (wordLenght > maxWordLength) return acc;
    else
      result[wordLenght]
        ? result[wordLenght].push(val)
        : (result[wordLenght] = [val]);
    return acc;
  }, result);
}

function buildAllSegmentCombinations(maxWordLength: number, maxWordSegment: number) {
  const subsets: number[][] = [];
  const nums = [...Array(maxWordLength).keys()].slice(1);
  buildAllSubsets(nums, maxWordLength, 0, [], subsets, maxWordSegment);
  return subsets;
}
function buildAllSubsets(
  nums: number[],
  target: number,
  start: number,
  subset: number[],
  subsets: number[][],
  maxSize: number
) {
  if (target === 0) {
    subsets.push(subset.slice());
    return;
  }

  if (subset.length === maxSize) return;

  for (let i = start; i < nums.length; i++) {
    if (nums[i] > target) {
      continue;
    }
    subset.push(nums[i]);
    buildAllSubsets(nums, target - nums[i], i, subset, subsets, maxSize);
    subset.pop();
  }
}

function buildAllWordOptions(
  wordSegments: WordSegments,
  segmentNumberCombinations: number[][]
): WordOption[] {
  const segmentWordCombinations = buildWordOptionsForAllSegments(
    wordSegments,
    segmentNumberCombinations
  );
  return buildAllCombinations(segmentWordCombinations);
}
function buildWordOptionsForAllSegments(
  wordSegments: WordSegments,
  segmentCombinations: number[][]
): string[][] {
  const options: string[][] = [];
  segmentCombinations.forEach((segmentCombination) =>
    options.push(
      ...buildWordOptionsForSegment(wordSegments, segmentCombination)
    )
  );
  return options;
}
function buildWordOptionsForSegment(
  wordSegments: WordSegments,
  segmentCombination: number[]
): string[][] {
  const wordCombinations = segmentCombination.map(
    (sc) => wordSegments[sc] ?? []
  );
  return combineAllArrays(wordCombinations);
}
function buildAllCombinations(
  segmentWordCombinations: string[][]
): WordOption[] {
  const result: WordOption[] = [];
  segmentWordCombinations.forEach((wordSegment) => {});
  return result;
}

function combineAllArrays(arrays: string[][]): string[][] {
  let result: string[][] = combineTwoArrays(arrays[0], arrays[1]);
  for (let i = 2; i < arrays.length; i++) {
    result = combineListWithArray(result, arrays[i]);
  }
  return result;
}
function combineTwoArrays(arr1: string[], arr2: string[]): string[][] {
  var result: string[][] = [];
  arr1.forEach((word1) => arr2.forEach((word2) => result.push([word1, word2])));
  return result;
}
function combineListWithArray(list: string[][], arr2: string[]): string[][] {
  var result: string[][] = [];
  list.forEach((l) => arr2.forEach((word2) => result.push([...l, word2])));
  return result;
}

function main() {
  // first read in the input file

  const processedList = splitListOnMaxLength(words, MAX_WORD_LENGTH);
  const possibleResults = processedList.wordResults;

  const allSegmentCombinations = buildAllSegmentCombinations(
    MAX_WORD_LENGTH,
    MAX_WORD_SEGMENTS
  );
  const allOptions = buildAllWordOptions(processedList, allSegmentCombinations);

  console.log(allOptions);
}

main();
