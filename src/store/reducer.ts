import { ACTION } from './action-types';
import { AddSlicerFilesPayload, SelectSlicerFilePayload } from './types';
import { useStore } from './index';
import { getElectron } from '../util';

const { on, isDev } = getElectron();

if (isDev) {
  useStore.subscribe(state => console.log('[STATE] Update', state));
}

// ==============================================================
const addSlicerFilesRecipe = (_: any, { files }: AddSlicerFilesPayload) => {
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

const selectSlicerFileRecipe = (_: any, { file }: SelectSlicerFilePayload) => {
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
