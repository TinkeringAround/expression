import { Pattern } from '../../store/phraser/types';

export const toName = (pattern: Pattern): string => {
  switch (pattern) {
    case Pattern.NONE:
      return 'No Pattern';
    case Pattern.PAAR:
      return 'Coupling (aabb)';
    case Pattern.KREUZ:
      return 'Cross (abab)';
  }
};

export const highlightVocals = (line: string) => {
  const vocals = ['a', 'e', 'o', 'u', 'i', 'ä', 'ü', 'ö'];
  const vocalsDict = Object.assign({}, ...vocals.map(c => ({ [c]: c })));

  return line.split('').map(char => {
    if (vocalsDict[char.toLocaleLowerCase()]) {
      return { text: char, color: 'green' };
    }

    return { text: char };
  });
};
