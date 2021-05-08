import { ACTION } from './action-types';
import { File } from './types';

const { trigger } = window.electron;

export const addSlicerScripts = (files: File[]) => trigger(ACTION.addSlicerFiles, { files });
