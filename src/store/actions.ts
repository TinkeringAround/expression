import { ACTION } from './action-types';
import { AudioFile } from './types';

const { trigger, dispatch } = window.electron;

export const addSlicerScripts = (files: AudioFile[]) => trigger(ACTION.addSlicerFiles, { files });
export const loadSlicerFile = (file: AudioFile) => dispatch(ACTION.loadSlicerFile, { file });
