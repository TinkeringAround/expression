import { Pattern, Template } from '../../store/phraser/types';
import { RhymeTransform } from './transform';

describe('RhymeTransform', () => {
  describe('toName', () => {
    it('should map pattern to names', () => {
      const pattern: Pattern[] = [Pattern.NONE, Pattern.PAAR, Pattern.KREUZ];
      const expectedValues = ['No Pattern', 'Coupling (aabb)', 'Cross (abab)'];

      pattern.forEach((p, index) => {
        expect(RhymeTransform.toName(p)).toBe(expectedValues[index]);
      });
    });
  });

  describe('toTemplate', () => {
    it('should map all template keys correctly', () => {
      const keys = ['SINGLE', 'DOUBLE', 'QUADROUPLE', 'SEXTUPLE', 'OCTUPLE'];

      keys.every((key, index) => {
        expect(RhymeTransform.toTemplate(key)).toBe(Object.values(Template)[index]);
      });
    });
  });

  describe('createRhymesByTemplate', () => {
    it('should create rhymes according to provided template', () => {
      const expectedLengths = [1, 2, 4, 6, 8];

      Object.values(Template).forEach((template, index) => {
        expect(RhymeTransform.toRhymes(template).length).toBe(expectedLengths[index]);
      });
    });
  });
});
