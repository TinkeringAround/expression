import { Cores } from './cores';

describe('Cores', () => {
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

  describe('fromWord', () => {
    test('should extract cores from words', () => {
      const words = ['g', 'wack', 'getecht', 'Notizbuch', 'Maiskolben', 'Pinocchio'];
      const expectedCores = [
        [],
        ['a'],
        ['e', 'e'],
        ['o', 'i', 'u'],
        ['ai', 'o', 'e'],
        ['i', 'o', 'io']
      ];

      words.forEach((word, index) => {
        const cores = Cores.fromWord(word);
        expect(cores).toEqual(expectedCores[index]);
      });
    });
  });

  describe('fromLine', () => {
    test('should extract cores for line', () => {
      const expectedCores = [
        [['i', 'o', 'io'], ['a'], ['i'], ['ei'], ['a']],
        [['u'], ['ei', 'e'], ['a', 'e'], ['ie'], ['ä']],
        [['ei'], ['a'], ['o'], ['i'], ['e', 'e'], ['a', 'i'], ['e', 'e']],
        [['i'], ['i'], ['i'], ['oo'], ['u'], ['i'], ['a'], ['i', 'e'], ['e']],
        [['i'], ['a'], ['ie'], ['ei'], [], ['o'], ['i'], ['i'], ['ei'], ['e', 'ie']],
        [['e', 'ü'], ['i'], ['ei', 'e'], ['ü', 'e'], ['ie'], ['ei'], ['i', 'i']],
        [['u'], ['a', 'ei', 'e'], ['i'], ['ei', 'e'], ['ie'], ['ei'], ['i', 'i']],
        [['u'], ['i'], ['o'], ['o'], ['o'], ['o'], ['ie'], ['i', 'i']]
      ];

      lines.forEach((line, index) => {
        const coresForLine = Cores.fromLine(line);
        expect(coresForLine).toEqual(expectedCores[index]);
      });
    });
  });

  describe('isMatching', () => {
    test('should return true when valid core and matching core are provided', () => {
      const testCores = [
        [['a'], ['a', 'ä']],
        [['e'], ['e']],
        [['o'], ['o']],
        [['u'], ['u']],
        [['i'], ['i', 'ie']],
        [['ei'], ['ei', 'ai']],
        [['ie'], ['ie', 'i']],
        [['ü'], ['ü']],
        [['ä'], ['ä', 'a', 'e']],
        [['ö'], ['ö']]
      ];

      testCores.forEach(testCore => {
        const core = testCore[0][0];
        testCore[1].forEach(compareCore => {
          expect(Cores.isMatching(core, compareCore)).toBeTruthy();
        });
      });
    });

    test('should return false when non matching core combination is provided', () => {
      expect(Cores.isMatching('a', 'ie')).toBeFalsy();
    });

    test('should return false when non core is provided', () => {
      expect(Cores.isMatching('z', 'ie')).toBeFalsy();
    });
  });

  describe('findMatchesIn', () => {
    test('should find no matches in single line', () => {
      const matches = Cores.findMatchesIn([lines[0]]);
      expect(matches.length).toBe(1);
      expect(matches[0]).toBe(0);
    });

    test('should find correct matches', () => {
      const testLines = [
        [lines[0], lines[1]],
        [lines[2], lines[3]],
        [lines[4], lines[5]],
        [lines[6], lines[7]],
        [lines[0], lines[1], lines[2], lines[3]],
        [lines[4], lines[5], lines[6], lines[7]],
        lines
      ];

      const expectedMatches = [
        [1, 1],
        [4, 4],
        [1, 1],
        [2, 2],
        [1, 1, 4, 4],
        [1, 5, 5, 2],
        [1, 1, 4, 4, 1, 5, 5, 2]
      ];

      testLines.forEach((line, index) => {
        const matches = Cores.findMatchesIn(line);
        expect(matches).toEqual(expectedMatches[index]);
      });
    });
  });
});
