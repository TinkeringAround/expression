import { ACTION } from '../action-types';
import { AudioFile, UpdateSlicerSelectionPayload } from './types';

const { trigger, dispatch } = window.electron;

export const addSlicerFiles = (files: AudioFile[]) => trigger(ACTION.addSlicerFiles, { files });
export const loadSlicerFile = (file: AudioFile) => dispatch(ACTION.loadSlicerFile, { file });
export const updateSlicerSelection = ({ zoom, start, end, offset }: UpdateSlicerSelectionPayload) =>
  trigger(ACTION.updateSlicerSelection, { zoom, start, end, offset });
