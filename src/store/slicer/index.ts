import create, { State } from 'zustand';

import { AudioFile, HasProgress, SlicerAudioFile, SlicerSelection } from './types';

export interface SlicerState extends State, HasProgress {
  readonly files: AudioFile[];
  readonly file: SlicerAudioFile | null;
  readonly selection: SlicerSelection;
  readonly samples: number;
  readonly isExporting: boolean;
  readonly update: (partial: Partial<SlicerState>) => void;
}

export const INITIAL_SELECTION = {
  start: 0,
  end: 0,
  zoom: 1,
  offset: 0
};

export const useSlicer = create<SlicerState>(set => ({
  files: [],
  file: null,
  selection: INITIAL_SELECTION,
  samples: 5000,
  progress: 0,
  isExporting: false,
  //@ts-ignore
  update: (partial: Partial<SlicerState>) => set(partial)
}));
