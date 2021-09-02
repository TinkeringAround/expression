import create, { State } from 'zustand';

import { Snippet } from './types';

export interface SnippetState extends State {
  readonly snippets: Snippet[];
  readonly update: (partial: Partial<SnippetState>) => void;
}

export const useSnippet = create<SnippetState>(set => ({
  snippets: [],
  //@ts-ignore
  update: (partial: Partial<SnippetState>) => set(partial)
}));
