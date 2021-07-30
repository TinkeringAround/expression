import { Pattern, Template } from '../../store/phraser/types';
import { createRhymesByTemplate, highlightVocals, toName, toTemplate } from './index';

describe('rhyme', () => {
  describe('toName', () => {
    it('should map pattern to names', () => {
      const pattern: Pattern[] = [Pattern.NONE, Pattern.PAAR, Pattern.KREUZ];
      const expectedValues = ['No Pattern', 'Coupling (aabb)', 'Cross (abab)'];

      pattern.forEach((p, index) => {
        expect(toName(p)).toBe(expectedValues[index]);
      });
    });
  });

  describe('toTemplate', () => {
    it('should map all template keys correctly', () => {
      const keys = ['SINGLE', 'DOUBLE', 'QUADROUPLE', 'SEXTUPLE', 'OCTUPLE'];

      keys.every((key, index) => {
        expect(toTemplate(key)).toBe(Object.values(Template)[index]);
      });
    });
  });

  describe('createRhymesByTemplate', () => {
    it('should create rhymes according to provided template', () => {
      const expectedLengths = [1, 2, 4, 6, 8];

      Object.values(Template).forEach((template, index) => {
        expect(createRhymesByTemplate(template).length).toBe(expectedLengths[index]);
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
