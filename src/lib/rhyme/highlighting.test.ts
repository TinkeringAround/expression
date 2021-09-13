import { HighlightingType } from './types';
import { Highlighting } from './highlighting';

describe('highlighting', () => {
  describe('applyHighlighting', () => {
    test('should ignore highlighting when no highlighting provided', () => {
      const highlightedLines = Highlighting.apply(['Hi'], null);
      expect(highlightedLines).toEqual([[{ text: 'H' }, { text: 'i' }]]);
    });

    test('should apply vocal highlighting when highlighting is vocals', () => {
      const highlightedLines = Highlighting.apply(['Hi'], HighlightingType.VOCALS);
      expect(highlightedLines).toBeTruthy();
    });

    test('should apply group highlighting when highlighting is group', () => {
      const highlightedLines = Highlighting.apply(['Hi', 'Team'], HighlightingType.GROUPS);
      expect(highlightedLines).toEqual([
        [
          { text: 'H', ...Highlighting.WITH_COLOR },
          { text: 'i', ...Highlighting.WITH_COLOR }
        ],
        [
          { text: 'T', ...Highlighting.WITH_COLOR },
          { text: 'e', ...Highlighting.WITH_COLOR },
          { text: 'a', ...Highlighting.WITH_COLOR },
          { text: 'm', ...Highlighting.WITH_COLOR }
        ]
      ]);
    });
  });

  describe('applyVocalHighlighting', () => {
    it('should split line correctly when line only contains vocals', () => {
      const line = 'AeOuiÄüÖ';

      Highlighting.forVocals([line]).forEach(l => {
        l.forEach(({ text, color }, index) => {
          expect(text).toBe(line.charAt(index));
          expect(color).toBe('yellow');
        });
      });
    });

    it('should leave line as it is when line does not contain vocals', () => {
      const line = 'ZWVX';

      Highlighting.forVocals([line]).forEach(l => {
        l.forEach(({ text, color }, index) => {
          expect(text).toBe(line.charAt(index));
          expect(color).toBeUndefined();
        });
      });
    });
  });

  describe('applyGroupsHighlighting', () => {
    test('should highlight nothing when no syllables match', () => {
      const highlightedLines = Highlighting.forGroups(['Hallo!', 'Tschüss.']);
      const highlightedLineTexts = [
        ['H', 'a', 'l', 'l', 'o', '!'],
        ['T', 's', 'c', 'h', 'ü', 's', 's', '.']
      ];

      highlightedLines.map((line, lineIndex) => {
        line.map((block, blockIndex) => {
          expect(block.text).toBe(highlightedLineTexts[lineIndex][blockIndex]);
          expect(block.color).toBeUndefined();
        });
      });
    });

    test('should ignore special character', () => {
      const highlightedLines = Highlighting.forGroups(['Eins , Zwei', 'Vier , Drei']);
      const highlightedLineTexts = [
        ['E', 'i', 'n', 's', ' ', ',', ' ', 'Z', 'w', 'e', 'i'],
        ['V', 'i', 'e', 'r', ' ', ',', ' ', 'D', 'r', 'e', 'i']
      ];

      highlightedLines.map((line, lineIndex) => {
        line.map((block, blockIndex) => {
          expect(block.text).toBe(highlightedLineTexts[lineIndex][blockIndex]);
        });
      });
    });

    test('should highlight one syllable when one core matches', () => {
      const highlightedLines = Highlighting.forGroups(['Hallo Welt!', 'Tschüss Welt.']);
      const highlightedLineTexts = [
        ['H', 'a', 'l', 'l', 'o', ' ', 'W', 'e', 'l', 't', '!'],
        ['T', 's', 'c', 'h', 'ü', 's', 's', ' ', 'W', 'e', 'l', 't', '.']
      ];

      highlightedLines.map((line, lineIndex) => {
        line.map((block, blockIndex) => {
          expect(block.text).toBe(highlightedLineTexts[lineIndex][blockIndex]);
        });
      });
    });
  });
});
