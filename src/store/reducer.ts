import { ToneAudioBuffer } from 'tone';

import { ACTION } from './action-types';
import {
  AddSlicerFilesPayload,
  SlicerAudioFile,
  SlicerAudioFileLoadedPayload,
  UpdateSlicerSelectionPayload
} from './types';
import { useStore } from './index';

const { on } = window.electron;

// ==============================================================
export const addSlicerFilesRecipe = (_: null, { files }: AddSlicerFilesPayload) => {
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

export const slicerFileLoadedRecipe = (
  _: null,
  { file, error, channelData }: SlicerAudioFileLoadedPayload
) => {
  const { update, slicer } = useStore.getState();
  const loadedSlicerAudioFile: SlicerAudioFile = {
    ...file,
    channelData: channelData,
    buffer: ToneAudioBuffer.fromArray(channelData)
  };

  if (error) console.error(error);

  update({
    slicer: {
      ...slicer,
      file: loadedSlicerAudioFile
    }
  });
};

export const updateSlicerSelectionRecipe = (
  _: null,
  { selection }: UpdateSlicerSelectionPayload
) => {
  const { update, slicer } = useStore.getState();

  update({
    slicer: {
      ...slicer,
      selection
    }
  });
};

// ==============================================================
on(ACTION.addSlicerFiles, addSlicerFilesRecipe);
on(ACTION.slicerFileLoaded, slicerFileLoadedRecipe);
on(ACTION.updateSlicerSelection, updateSlicerSelectionRecipe);
