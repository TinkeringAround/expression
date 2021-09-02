import { useSnippet } from './index';
import { addSnippetRecipe, deleteSnippetRecipe, snippetsLoadedRecipe } from './reducer';
import { useNotification } from '../notification';

import { getSnippetMock, getSnippetsMock } from '../../mock/snippet';

describe('snippets reducer', () => {
  const initialSnippetState = useSnippet.getState();

  beforeEach(() => {
    useSnippet.setState(initialSnippetState);
  });

  describe('snippetsLoadedRecipe', () => {
    test('should set snippets when loading was successful', () => {
      const { snippets } = getSnippetsMock();

      snippetsLoadedRecipe(null, { snippets });

      expect(useSnippet.getState().snippets).toEqual(snippets);
    });

    test('should set snippets when loading failed', () => {
      const updateMock = jest.fn();
      useNotification.setState({ update: updateMock });

      snippetsLoadedRecipe(null, { snippets: [], error: 'error' });

      expect(updateMock).toHaveBeenCalledWith({
        notifications: [{ type: 'error', content: 'error' }]
      });
    });
  });

  describe('addSnippetRecipe', () => {
    test('should add snippet', () => {
      const lines = ['1', '2'];

      addSnippetRecipe(null, { lines });

      expect(useSnippet.getState().snippets[0].lines).toEqual(lines);
    });
  });

  describe('deleteSnippetRecipe', () => {
    test('should delete snippet', () => {
      const snippetMock = getSnippetMock();
      useSnippet.setState({ snippets: [snippetMock] });

      deleteSnippetRecipe(null, { id: snippetMock.id });

      expect(useSnippet.getState().snippets.length).toBe(0);
    });
  });
});
