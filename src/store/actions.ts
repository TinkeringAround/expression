import { ACTION } from './action-types';
import { AudioFile } from './types';

const { trigger } = window.electron;

export const addSlicerScripts = (files: AudioFile[]) => trigger(ACTION.addSlicerFiles, { files });
export const selectSlicerFile = (file: AudioFile | null) =>
  trigger(ACTION.selectSlicerFile, { file });
