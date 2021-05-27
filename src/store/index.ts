import create, { State } from 'zustand';
import { AudioFile, SlicerAudioFile, SlicerSelection } from './types';

export interface SlicerState {
  files: AudioFile[];
  file: SlicerAudioFile | null;
  selection: SlicerSelection;
}

export interface AppState extends State {
  slicer: SlicerState;
  readonly update: (partial: Partial<AppState>) => void;
}

export const useStore = create<AppState>(set => ({
  slicer: {
    files: [],
    file: null,
    selection: {
      start: 0,
      end: 0,
      zoom: 1,
      offset: 0
    }
  },
  //@ts-ignore
  update: (partial: Partial<AppState>) => set(partial)
}));
