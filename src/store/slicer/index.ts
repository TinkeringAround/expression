import create, { State } from 'zustand';
import { AudioFile, SlicerAudioFile, SlicerSelection } from './types';

export interface SlicerState extends State {
  files: AudioFile[];
  file: SlicerAudioFile | null;
  selection: SlicerSelection;
  samples: number;
  readonly update: (partial: Partial<SlicerState>) => void;
}

export const useSlicer = create<SlicerState>(set => ({
  files: [],
  file: null,
  selection: {
    start: 0,
    end: 0,
    zoom: 1,
    offset: 0
  },
  samples: 5000,
  //@ts-ignore
  update: (partial: Partial<SlicerState>) => set(partial)
}));
