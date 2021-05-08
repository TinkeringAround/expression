import { ACTION } from './action-types';
import { AddSlicerFilesPayload } from './types';
import { useStore } from './index';

const { on, isDev } = window.electron;

if (isDev) {
  useStore.subscribe(state => console.log('[STATE] Update', state));
}

const addSlicerFilesRecipe = (_: any, { files }: AddSlicerFilesPayload) => {
  const { update, slicer } = useStore.getState();

  const currentFileNames = slicer.files.map(file => file.name);
  const newFiles = files.filter(file => !currentFileNames.includes(file.name));

  update({
    slicer: {
      files: [...slicer.files, ...newFiles]
    }
  });
};

on(ACTION.addSlicerFiles, addSlicerFilesRecipe);
