import { Cores } from './cores';
import { Words } from './words';

export namespace Syllables {
  export const fromWord = (word: string) => {
    const cores = Cores.fromWord(word);
    let mutatedWord = word;

    if (cores.length > 1) {
      const syllables: string[] = [];
      cores.forEach((syl, sylIndex) => {
        // end of word
        if (sylIndex === cores.length - 1) {
          syllables.push(mutatedWord.trim());
          return;
        }

        const index = mutatedWord.indexOf(syl.toString());
        let syllable = mutatedWord.slice(0, index + syl.length);

        if (index === 0) {
          // vocal is start of word, then one letter after vocal
          syllable = mutatedWord.slice(0, index + syl.length + 1);
        }

        mutatedWord = mutatedWord.replace(syllable, '');
        syllables.push(syllable.trim());
      });
      return syllables;
    }

    return [word];
  };

  export const fromLine = (line: string): string[] => {
    const syllables: string[] = [];
    const words = Words.fromLine(line);

    words.forEach(word => {
      syllables.push(...Syllables.fromWord(word));
    });

    return syllables;
  };
}
