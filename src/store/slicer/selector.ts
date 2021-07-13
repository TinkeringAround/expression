import { SlicerState } from './index';
import { SlicerAudioFile, SlicerSelection } from './types';

export const selectSlicerFile = (state: SlicerState): SlicerAudioFile =>
  state.file ??
  ({
    name: '',
    type: '',
    size: 0,
    path: '',
    buffer: {
      get duration() {
        return 0;
      }
    },
    channelData: [new Float32Array(), new Float32Array()]
  } as SlicerAudioFile);

export const selectSlicerSelection = (state: SlicerState): SlicerSelection => state.selection;

export const selectSlicerIsProcessing = (state: SlicerState): boolean =>
  state.progress > 0 && state.progress < 100;
