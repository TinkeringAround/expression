import { getElectron } from '../util';
import { ACTION } from './action-types';
import { File } from './types';

const { trigger } = getElectron();

export const addSlicerScripts = (files: File[]) => trigger(ACTION.addSlicerFiles, { files });
export const selectSlicerFile = (file: File | null) => trigger(ACTION.selectSlicerFile, { file });
