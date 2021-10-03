import { Words } from './words';
import { flatten } from '../util';

export namespace Cores {
  const MATCHES: { [key: string]: string[] } = {
    a: ['a', 'ä'],
    e: ['e'],
    o: ['o', 'oo'],
    oo: ['oo', 'o'],
    u: ['u'],
    i: ['i', 'ie', 'ea'],
    ei: ['ei', 'ai'],
    ea: ['ea', 'i', 'ie'],
    ie: ['ie', 'i', 'ea'],
    ü: ['ü'],
    ä: ['ä', 'a', 'e'],
    ö: ['ö']
  };

  export const fromWord = (word: string): string[] => {
    const cores = word.toLowerCase().match(/[aeiouöäü]{1,2}/g);

    if (cores) {
      return cores.map(syl => syl.toString());
    }

    return [];
  };

  export const fromLine = (line: string): Array<string[]> => {
    const syllableCores: Array<string[]> = [];
    const words = Words.fromLine(line);

    words.forEach(word => {
      const wordCores = fromWord(word);
      syllableCores.push(wordCores);
    });

    return syllableCores;
  };

  export const isMatching = (core: string, compareCore: string): boolean => {
    return MATCHES[core]?.includes(compareCore);
  };

  export const findMatchesIn = (lines: string[]): number[] => {
    const matches = Array(lines.length).fill(0);

    // compare last line to no other
    for (let lineIndex = 0; lineIndex < lines.length - 1; lineIndex += 1) {
      const reversedCores = flatten(fromLine(lines[lineIndex])).reverse();

      for (
        let compareLineIndex = lineIndex + 1;
        compareLineIndex < lines.length;
        compareLineIndex += 1
      ) {
        const reversedCompareCores = flatten(fromLine(lines[compareLineIndex])).reverse();

        reversedCores.some((core, index) => {
          const coreCompare = reversedCompareCores[index];

          if (isMatching(core, coreCompare)) {
            matches[lineIndex] = Math.max(matches[lineIndex], index + 1);
            matches[compareLineIndex] = Math.max(matches[compareLineIndex], index + 1);
            return false;
          } else {
            return true;
          }
        });
      }
    }

    return matches;
  };
}
