import { ACTION } from './action-types';
import { AddSlicerFilesPayload, SlicerAudioFileLoadedPayload } from './types';
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

export const slicerFileLoadedRecipe = (_: any, { file, error }: SlicerAudioFileLoadedPayload) => {
  const { update, slicer } = useStore.getState();

  // TODO: Use Tone to handle Audio Data

  if (error) console.error(error);

  update({
    slicer: {
      ...slicer,
      selectedFile: file
    }
  });
};

// ==============================================================
on(ACTION.addSlicerFiles, addSlicerFilesRecipe);
on(ACTION.slicerFileLoaded, slicerFileLoadedRecipe);
