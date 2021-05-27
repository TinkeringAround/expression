import { ACTION } from './action-types';
import { AudioFile, SlicerSelection } from './types';

const { trigger, dispatch } = window.electron;

export const addSlicerFiles = (files: AudioFile[]) => trigger(ACTION.addSlicerFiles, { files });
export const loadSlicerFile = (file: AudioFile) => dispatch(ACTION.loadSlicerFile, { file });
export const updateSlicerSelection = (selection: SlicerSelection) =>
  trigger(ACTION.updateSlicerSelection, { selection });
