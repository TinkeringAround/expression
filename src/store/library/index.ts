import create, { State } from 'zustand';

import { Dict } from '../../lib/util';

export interface LibraryState extends State {
  readonly library: Dict<string[]>;
  readonly update: (partial: Partial<LibraryState>) => void;
}

export const useLibrary = create<LibraryState>(set => ({
  library: {},
  //@ts-ignore
  update: (partial: Partial<LibraryState>) => set(partial)
}));
