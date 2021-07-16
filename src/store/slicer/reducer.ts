import { ToneAudioBuffer } from 'tone';

import { ACTION } from '../action-types';
import { INITIAL_SELECTION, useSlicer } from './index';
import {
  AddSlicerFilesPayload,
  HasProgress,
  RemoveSlicerFilePayload,
  SlicerAudioFile,
  SlicerAudioFileLoadedPayload,
  UpdateSlicerSelectionPayload
} from './types';
import { addNotification } from '../notification/actions';
import { floatsDiffer, toValidFloat } from '../../lib/util';
import { AddNotificationPayload } from '../notification/types';

const { on } = window.electron;

// ==============================================================
export const addSlicerFilesRecipe = (_: null, { files }: AddSlicerFilesPayload) => {
  const { update, files: slicerFiles } = useSlicer.getState();
  const currentFileNames = slicerFiles.map(file => file.name);
  const newFiles = files.filter(file => !currentFileNames.includes(file.name));

  update({
    files: [...slicerFiles, ...newFiles]
  });
};

export const removeSlicerFileRecipe = (_: null, { file }: RemoveSlicerFilePayload) => {
  const { update, files: currentFiles, file: selectedFile } = useSlicer.getState();

  const files = currentFiles.filter(f => f.name !== file.name);
  const fileIsSelection = selectedFile && selectedFile.name === file.name;

  const optionalUpdate = fileIsSelection ? { file: null, selection: INITIAL_SELECTION } : {};

  update({ files, ...optionalUpdate });
};

export const loadSlicerFileRecipe = (_: null) => {
  const { update, progress } = useSlicer.getState();

  if (progress !== 1) {
    update({ progress: 1 });
  }
};

export const slicerFileLoadedRecipe = (
  _: null,
  { file, error, channelData }: SlicerAudioFileLoadedPayload
) => {
  const { update } = useSlicer.getState();
  const loadedSlicerAudioFile: SlicerAudioFile = {
    ...file,
    channelData: channelData,
    buffer: ToneAudioBuffer.fromArray(channelData)
  };

  if (error) addNotification({ content: error, type: 'error', show: true });

  update({
    file: loadedSlicerAudioFile,
    selection: {
      start: 0,
      end: 0,
      offset: 0,
      zoom: 1
    },
    progress: 0
  });
};

export const updateSlicerSelectionRecipe = (
  _: null,
  { end, offset, zoom, start }: UpdateSlicerSelectionPayload
) => {
  const { update, selection } = useSlicer.getState();
  const isDirty =
    (!!end && floatsDiffer(end, selection.end)) ||
    (!!offset && floatsDiffer(offset, selection.offset)) ||
    (!!start && floatsDiffer(start, selection.start)) ||
    (!!zoom && zoom !== selection.zoom);

  if (isDirty) {
    update({
      selection: {
        start: toValidFloat(start ?? selection.start),
        end: toValidFloat(end ?? selection.end),
        offset: toValidFloat(offset ?? selection.offset),
        zoom: zoom ?? selection.zoom
      }
    });
  }
};

export const updateSlicerProgressionRecipe = (_: null, { progress }: HasProgress) => {
  const { update, progress: currentProgress } = useSlicer.getState();

  if (progress !== currentProgress) {
    update({ progress });
  }
};

export const exportSlicerFileRecipe = (_: null) => {
  const { update, isExporting } = useSlicer.getState();

  if (!isExporting) {
    update({ isExporting: true });
  }
};

export const slicerFileExportedRecipe = (_: null, { notification }: AddNotificationPayload) => {
  const { update, isExporting } = useSlicer.getState();

  if (isExporting) {
    update({ isExporting: false });
    addNotification(notification);
  }
};

// ==============================================================
on(ACTION.addSlicerFiles, addSlicerFilesRecipe);
on(ACTION.removeSlicerFile, removeSlicerFileRecipe);
on(ACTION.loadSlicerFile, loadSlicerFileRecipe);
on(ACTION.slicerFileLoaded, slicerFileLoadedRecipe);
on(ACTION.updateSlicerSelection, updateSlicerSelectionRecipe);
on(ACTION.updateSlicerProgression, updateSlicerProgressionRecipe);
on(ACTION.exportSlicerFile, exportSlicerFileRecipe);
on(ACTION.slicerFileExported, slicerFileExportedRecipe);
