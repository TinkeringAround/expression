import { flatten } from '../util';
import { Cores } from './cores';
import { Syllables } from './syllables';
import { HighlightedLineBlock, HighlightingType } from './types';

export namespace Highlighting {
  const VOCALS = ['a', 'e', 'o', 'u', 'i', 'ä', 'ü', 'ö'];
  const VOCALS_DICT = Object.assign({}, ...VOCALS.map(c => ({ [c]: c })));
  const SPACE: HighlightedLineBlock = { text: ' ' };
  export const WITH_COLOR = { color: 'yellow' };

  /**
   * Highlights provided lines
   * @param lines
   * @param highlighting
   */
  export const apply = (
    lines: string[],
    highlighting: HighlightingType | null
  ): Array<HighlightedLineBlock[]> => {
    if (!highlighting) {
      return lines.map(line => {
        return line.split('').map(char => ({ text: char }));
      });
    }

    switch (highlighting) {
      case HighlightingType.VOCALS:
        return forVocals(lines);
      case HighlightingType.GROUPS:
        return forGroups(lines);
    }
  };

  export const forGroups = (lines: string[]): Array<HighlightedLineBlock[]> => {
    const matches = Cores.findMatchesIn(lines);

    return lines.map((line, lineIndex) => {
      const words = line.split(' ').reverse();

      return flatten(
        words
          .map((word, wordIndex) => {
            const cores = Cores.fromWord(word);
            const syllables = Syllables.fromWord(word).reverse();
            const chars = word.split('');

            if (cores.length === 0) {
              return [...chars.map(c => ({ text: c })), SPACE];
            }

            const tmp = flatten(
              syllables
                .map(syl => {
                  const sylChars = syl.split('');
                  if (matches[lineIndex] > 0) {
                    matches[lineIndex] -= 1;
                    return [...sylChars.map(c => ({ text: c, ...WITH_COLOR }))];
                  }

                  return [...sylChars.map(c => ({ text: c }))];
                })
                .reverse()
            );

            return wordIndex === 0 ? [...tmp] : [...tmp, SPACE];
          })
          .reverse()
      );
    });
  };

  /**
   * Highlighting Transformer to highlight all vocals in a line
   * @param lines the lines the highlighter to transform
   * @returns {HighlightedLineBlock[]}
   */
  export const forVocals = (lines: string[]): Array<HighlightedLineBlock[]> => {
    return lines.map(line =>
      line.split('').map(char => {
        if (VOCALS_DICT[char.toLocaleLowerCase()]) {
          return { text: char, ...WITH_COLOR };
        }

        return { text: char };
      })
    );
  };
}
