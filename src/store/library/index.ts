import create, { State } from 'zustand';

import { Dict } from '../../lib/util';
import { WordSuggestions } from './types';

export interface LibraryState extends State {
  readonly library: Dict<WordSuggestions>;
  readonly update: (partial: Partial<LibraryState>) => void;
}

export const useLibrary = create<LibraryState>(set => ({
  library: {},
  //@ts-ignore
  update: (partial: Partial<LibraryState>) => set(partial)
}));
