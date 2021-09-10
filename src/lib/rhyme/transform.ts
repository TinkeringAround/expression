import { Pattern, Rhyme, Template } from '../../store/phraser/types';
import { generateId } from '../util';

export namespace RhymeTransform {
  /**
   * Transforms a pattern to a printable string
   * @param pattern the pattern to transform
   * @returns {string}
   */
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

  /**
   * Transforms a template key to the Template enum value
   * @param value the template key
   * @returns {Template}
   */
  export const toTemplate = (value: string): Template => {
    const templateIndex = Object.keys(Template).findIndex(templateKey => templateKey === value);
    return Object.values(Template)[templateIndex];
  };

  /**
   * Rhyme Creation Helper based on different templates
   * @param template the template
   * @returns {Rhyme[]}
   */
  export const toRhymes = (template: Template): Rhyme[] => {
    const createRhyme = () => ({
      id: generateId(),
      lines: []
    });

    switch (template) {
      case Template.SINGLE:
        return Array(1).fill(createRhyme());
      case Template.DOUBLE:
        return Array(2).fill(createRhyme());
      case Template.QUADROUPLE:
        return Array(4).fill(createRhyme());
      case Template.SEXTUPLE:
        return Array(6).fill(createRhyme());
      case Template.OCTUPLE:
        return Array(8).fill(createRhyme());
    }
  };
}
