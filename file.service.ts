import * as fs from "fs";
import { WordOption } from "./types/types";

export const printLine = (wordOption: WordOption): string =>
  wordOption.components.join("+") + "=" + wordOption.result;

export async function processFile(
  fileName: string,
  seperation: string
): Promise<string[]> {
  const file = await fs.promises.readFile(fileName, "utf-8");
  return file.split(seperation);
}

export async function writeToFile(
  results: WordOption[],
  fileName: string,
  seperation: string
) {
  try {
    const output = results.map((r) => printLine(r)).join(seperation);
    await fs.promises.writeFile(fileName, output);
    console.log("The file has been saved!");
  } catch (err) {
    console.error(err);
  }
}
