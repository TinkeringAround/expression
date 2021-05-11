import { ACTION } from './action-types';
import { AddSlicerFilesPayload, SelectSlicerFilePayload } from './types';
import { useStore } from './index';

const { on } = window.electron;

// ==============================================================
export const addSlicerFilesRecipe = (_: any, { files }: AddSlicerFilesPayload) => {
  const { update, slicer } = useStore.getState();
  const currentFileNames = slicer.files.map(file => file.name);
  const newFiles = files.filter(file => !currentFileNames.includes(file.name));

  update({
    slicer: {
      ...slicer,
      files: [...slicer.files, ...newFiles]
    }
  });
};

export const selectSlicerFileRecipe = (_: any, { file }: SelectSlicerFilePayload) => {
  const { update, slicer } = useStore.getState();

  update({
    slicer: {
      ...slicer,
      selectedFile: file
    }
  });
};

// ==============================================================
on(ACTION.addSlicerFiles, addSlicerFilesRecipe);
on(ACTION.selectSlicerFile, selectSlicerFileRecipe);
