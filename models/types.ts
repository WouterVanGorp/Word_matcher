export type wordSegments = { [n: number]: string[] };

export type processedList = {
  wordResults: string[];
} & wordSegments;

export type wordOption = { result: string; components: string[] };