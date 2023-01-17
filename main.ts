import { ProcessedList, WordOption, WordSegments } from "./types/types";
import { processFile, writeToFile } from "./file.service";
import { combineAllArrays } from "./combine.arrays.service";
// This wil be moved to a config file
const MAX_WORD_LENGTH = 6;
const MAX_WORD_SEGMENTS = 2;
const INPUT_FILE_NAME = "input.txt";
const OUTPUT_FILE_NAME = "output.txt";
const WORD_SEPERATION = "\r\n";

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

function buildAllSegmentCombinations(
  maxWordLength: number,
  maxWordSegment: number
) {
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
): string[][] {
  const segmentWordCombinations = buildWordOptionsForAllSegments(
    wordSegments,
    segmentNumberCombinations
  );
  return segmentWordCombinations;
}

function buildWordOptionsForAllSegments(
  wordSegments: WordSegments,
  segmentCombinations: number[][]
): string[][] {
  const options: string[][] = [];
  for (let segment of segmentCombinations) {
    const segmentOptions = buildWordOptionsForSegment(wordSegments, segment);
    segmentOptions.forEach((option) => options.push(option));
  }
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

async function main() {
  const words = await processFile(INPUT_FILE_NAME, WORD_SEPERATION);

  const processedList = splitListOnMaxLength(words, MAX_WORD_LENGTH);
  const allPossibleResults = processedList.wordResults;

  const allSegmentCombinations = buildAllSegmentCombinations(
    MAX_WORD_LENGTH,
    MAX_WORD_SEGMENTS
  );
  const allOptions = buildAllWordOptions(processedList, allSegmentCombinations);

  const results: WordOption[] = [];
  allOptions.forEach((options) => {
    const sortedByLenght = options.slice().sort((a, b) => b.length - a.length);

    var filteredResultsWhichContainOptions = sortedByLenght.reduce((acc, val) => {
      return acc.filter((res) => res.includes(val));
    }, allPossibleResults);

    // hier moet nog een check gebeuren of de combinatie van de optie het woord vormen of niet
    filteredResultsWhichContainOptions.forEach((filteredResult) => {

      var isEmpty = sortedByLenght.reduce((acc, val) => {
        return acc.replace(val, "#");
      }, filteredResult);

      const t = Array(options.length).fill('#').join('')
      if (isEmpty === t) {
        results.push({ result: filteredResult, components: options });
      }
    });
  });

  await writeToFile(results, OUTPUT_FILE_NAME, WORD_SEPERATION);
}

main();
