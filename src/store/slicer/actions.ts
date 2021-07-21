import { ACTION } from '../action-types';
import { AudioFile, SlicerAudioFile, SlicerSelection, UpdateSlicerSelectionPayload } from './types';
import { getAudioType } from '../../lib/audio';

const { trigger, dispatch } = window.electron;

export const addSlicerFiles = (files: AudioFile[]) => trigger(ACTION.addSlicerFiles, { files });

export const removeSlicerFile = (file: AudioFile) => trigger(ACTION.removeSlicerFile, { file });

export const loadSlicerFile = (file: AudioFile) => {
  trigger(ACTION.loadSlicerFile);
  dispatch(ACTION.loadSlicerFile, {
    file,
    audioType: getAudioType(file.type)
  });
};

export const updateSlicerSelection = ({ zoom, start, end, offset }: UpdateSlicerSelectionPayload) =>
  trigger(ACTION.updateSlicerSelection, { zoom, start, end, offset });

export const exportSlicerFile = (
  { channelData, buffer: { sampleRate, duration } }: SlicerAudioFile,
  { start, end, offset }: SlicerSelection
) => {
  trigger(ACTION.exportSlicerFile);
  dispatch(ACTION.exportSlicerFile, { channelData, start, end, offset, sampleRate, duration });
};

export const updateSlicerIsPlaying = (isPlaying: boolean) =>
  trigger(ACTION.updateSlicerIsPlaying, { isPlaying });
