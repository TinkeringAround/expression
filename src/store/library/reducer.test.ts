import { useLibrary } from './index';
import { addSuggestionRecipe } from './reducer';

describe('Library Reducer', () => {
  const INITIAL_LIBRARY_STATE = useLibrary.getState();
  const word = 'test';
  const suggestions = {
    en: ['test'],
    de: ['Test']
  };

  describe('addSuggestionRecipe', () => {
    beforeEach(() => {
      useLibrary.setState(INITIAL_LIBRARY_STATE);
    });

    test('should fill suggestions for a word in library', () => {
      addSuggestionRecipe(null, {
        word,
        suggestions
      });

      expect(useLibrary.getState().library[word]).toEqual(suggestions);
    });
  });
});
