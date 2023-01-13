const words = ['test', 'ge', 'adgf', 'test20', '20', 'ad', 'adgfad', '20test', '2'];
const MAX_WORD_LENGTH = 6;
const MAX_WORD_SEGMENTS = 2;

type wordSegments = { [n: number]: string[] }
type processedList = {
    wordResults: string[],
    [n: number]: string[]
}
type wordOption = { result: string, components: string[] }

const splitListOnMaxLength = (wordList: string[], maxWordLength: number): processedList => {
    const result: processedList = { wordResults: [] };

    return wordList.reduce((acc, val) => {
        const wordLenght = val.length;
        if (wordLenght === maxWordLength) acc.wordResults.push(val);
        else if (wordLenght > maxWordLength) return acc; // als er een te lang woord zou tussen zitten
        else result[wordLenght] ? result[wordLenght].push(val) : result[wordLenght] = [val]
        return acc
    }, result)
}

const createPrintLine = (wordOption: wordOption): string => wordOption.components.join('+') + '=' + wordOption.result;
const checkIfWordExistInResultList = (word: string, wordResults: string[]): boolean => wordResults.includes(word)
const checkIfWordOptionsExistInResultList = (wordOptions: string[], wordResults: string[]): string[] => wordOptions.filter(word => wordResults.includes(word))

const buildAllWordOptions = (wordSegments: wordSegments, maxAllowedSegements: number): wordOption[] => {
    const options: wordOption[] = [];
    // do some magic
    return options
}

const main = () => {
    const processedList = splitListOnMaxLength(words, MAX_WORD_LENGTH);
    const possibleResults = processedList.wordResults;
    const allOptions = buildAllWordOptions(processedList, MAX_WORD_SEGMENTS);

    const outcome = allOptions
        .filter(option => possibleResults.includes(option.result))
        .map(result => createPrintLine(result));
}