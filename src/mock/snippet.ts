import { SnippetState, useSnippet } from '../store/snippet';
import { Snippet } from '../store/snippet/types';
import { getRhymeMock } from './phraser';

export const getSnippetMock = (snippet?: Partial<Snippet>): Snippet => getRhymeMock(snippet);

export const getSnippetsMock = (snippetState?: Partial<SnippetState>): SnippetState => ({
  snippets: [getSnippetMock()],
  update: useSnippet.getState().update,
  ...snippetState
});
