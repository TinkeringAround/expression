import { Syllables } from './syllables';

describe('Syllables', () => {
  const lines = [
    'Pinocchio sagt, ich sei wack.',
    'Und seine Nase, sie wächst',
    'Bei Smash Bros. wird jeder Angriff getecht',
    "Ich find' mich cool und ich hab' immer recht",
    'Ich war nie ein G, doch ich bin ein Genie',
    "Erfüll' mir meine Wünsche wie ein Dschinni",
    'Du arbeitest mit Pfeifen wie ein Schiri',
    "Und ich work', work', work', so wie RiRi"
  ];

  describe('fromLine', () => {
    test('should extract syllables for lines of words', () => {
      const expectedSyllables = [
        ['pi', 'no', 'cchio', 'sagt', 'ich', 'sei', 'wack'],
        ['und', 'sei', 'ne', 'na', 'se', 'sie', 'wächst'],
        ['bei', 'smash', 'bros', 'wird', 'je', 'der', 'an', 'griff', 'ge', 'techt'],
        ['ich', 'find', 'mich', 'cool', 'und', 'ich', 'hab', 'im', 'mer', 'recht'],
        ['ich', 'war', 'nie', 'ein', 'g', 'doch', 'ich', 'bin', 'ein', 'ge', 'nie'],
        ['er', 'füll', 'mir', 'mei', 'ne', 'wü', 'nsche', 'wie', 'ein', 'dschi', 'nni'],
        ['du', 'ar', 'bei', 'test', 'mit', 'pfei', 'fen', 'wie', 'ein', 'schi', 'ri'],
        ['und', 'ich', 'work', 'work', 'work', 'so', 'wie', 'ri', 'ri']
      ];

      lines.forEach((line, index) => {
        const syllables = Syllables.fromLine(line);
        expect(syllables).toEqual(expectedSyllables[index]);
      });
    });
  });
});
