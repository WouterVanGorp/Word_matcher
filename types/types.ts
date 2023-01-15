export type WordSegments = { [n: number]: string[] };

export type ProcessedList = {
  wordResults: string[];
} & WordSegments;

export type WordOption = { result: string; components: string[] };