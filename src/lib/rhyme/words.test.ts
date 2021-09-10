import { Words } from './words';

describe('Words', () => {
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

  describe('getWordsFor', () => {
    test('should return words from line', () => {
      const expectedWords = [
        ['pinocchio', 'sagt', 'ich', 'sei', 'wack'],
        ['und', 'seine', 'nase', 'sie', 'wächst'],
        ['bei', 'smash', 'bros', 'wird', 'jeder', 'angriff', 'getecht'],
        ['ich', 'find', 'mich', 'cool', 'und', 'ich', 'hab', 'immer', 'recht'],
        ['ich', 'war', 'nie', 'ein', 'g', 'doch', 'ich', 'bin', 'ein', 'genie'],
        ['erfüll', 'mir', 'meine', 'wünsche', 'wie', 'ein', 'dschinni'],
        ['du', 'arbeitest', 'mit', 'pfeifen', 'wie', 'ein', 'schiri'],
        ['und', 'ich', 'work', 'work', 'work', 'so', 'wie', 'riri']
      ];

      lines.forEach((line, index) => {
        const words = Words.fromLine(line);
        expect(words).toEqual(expectedWords[index]);
      });
    });
  });
});
