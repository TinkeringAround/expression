import { useSnippet } from './index';
import { updateSnippets } from './actions';

import { mockElectronDispatch } from '../../mock/electron';

describe('Snippet Action', () => {
  const INITIAL_SNIPPET_STATE = useSnippet.getState();

  describe('loadSnippets', () => {
    test('should dispatch load action', () => {
      const loadSnippetsMock = jest.fn();
      mockElectronDispatch(loadSnippetsMock);

      loadSnippetsMock();

      expect(loadSnippetsMock).toHaveBeenCalledWith();
    });
  });

  describe('updateSnippets', () => {
    test('should update snippets', () => {
      const updateSnippetsMock = jest.fn();
      mockElectronDispatch(updateSnippetsMock);

      updateSnippets();

      expect(updateSnippetsMock).toHaveBeenCalledWith(null, {
        snippets: INITIAL_SNIPPET_STATE.snippets
      });
    });
  });
});
