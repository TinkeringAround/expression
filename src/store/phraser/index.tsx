import create, { State } from 'zustand';

import { EditableSong, MusicCollection } from './types';

export interface PhraserState extends State {
  readonly collections: MusicCollection[];
  readonly selectedSong: EditableSong | null;
  readonly update: (partial: Partial<PhraserState>) => void;
}

export const usePhraser = create<PhraserState>(set => ({
  collections: [],
  selectedSong: null,
  //@ts-ignore
  update: (partial: Partial<PhraserState>) => set(partial)
}));
