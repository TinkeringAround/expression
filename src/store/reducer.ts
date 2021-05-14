import { ToneAudioBuffer } from 'tone';

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

export const slicerFileLoadedRecipe = (
  _: any,
  { file, error, channelData }: SlicerAudioFileLoadedPayload
) => {
  const { update, slicer } = useStore.getState();
  let newFile = file;

  if (error) console.error(error);

  if (channelData) {
    newFile = {
      ...file,
      audio: {
        channelData,
        buffer: ToneAudioBuffer.fromArray(channelData)
      }
    };
  }

  update({
    slicer: {
      ...slicer,
      selectedFile: newFile
    }
  });
};

// ==============================================================
on(ACTION.addSlicerFiles, addSlicerFilesRecipe);
on(ACTION.slicerFileLoaded, slicerFileLoadedRecipe);
