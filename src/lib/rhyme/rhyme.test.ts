import { Pattern } from '../../store/phraser/types';
import { highlightVocals, toName } from './index';

describe('rhyme', () => {
  describe('patternToName', () => {
    it('should map pattern to names', () => {
      const pattern: Pattern[] = [Pattern.NONE, Pattern.PAAR, Pattern.KREUZ];
      const expectedValues = ['No Pattern', 'Coupling (aabb)', 'Cross (abab)'];

      pattern.forEach((p, index) => {
        expect(toName(p)).toBe(expectedValues[index]);
      });
    });
  });

  describe('highlightVocals', () => {
    it('should split line correctly when line only contains vocals', () => {
      const line = 'AeOuiÄüÖ';

      highlightVocals(line).every(({ text, color }, index) => {
        expect(text).toBe(line.charAt(index));
        expect(color).toBe('green');
      });
    });

    it('should leave line as it is when line does not contain vocals', () => {
      const line = 'ZWVX';

      highlightVocals(line).every(({ text, color }, index) => {
        expect(text).toBe(line.charAt(index));
        expect(color).toBeUndefined();
      });
    });
  });
});
