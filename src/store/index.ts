import create, { State } from 'zustand';
import { File } from './types';

export interface SlicerState {
  files: File[];
  selectedFile: File | null;
}

export interface AppState extends State {
  slicer: SlicerState;
  update: (partial: Partial<AppState>) => void;
}

export const useStore = create<AppState>(set => ({
  slicer: {
    files: [],
    selectedFile: null
  },
  //@ts-ignore
  update: (partial: Partial<AppState>) => set(partial)
}));
