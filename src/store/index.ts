import create, { State } from 'zustand';
import { AudioFile } from './types';

export interface SlicerState {
  files: AudioFile[];
  selectedFile: AudioFile | null;
}

export interface AppState extends State {
  slicer: SlicerState;
  readonly update: (partial: Partial<AppState>) => void;
}

export const useStore = create<AppState>(set => ({
  slicer: {
    files: [],
    selectedFile: null
  },
  //@ts-ignore
  update: (partial: Partial<AppState>) => set(partial)
}));
