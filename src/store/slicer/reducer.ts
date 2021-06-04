import { ToneAudioBuffer } from 'tone';
import { ACTION } from '../action-types';
import { useSlicer } from './index';
import {
  AddSlicerFilesPayload,
  SlicerAudioFile,
  SlicerAudioFileLoadedPayload,
  UpdateSlicerSelectionPayload
} from './types';

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

  if (error) console.error(error);

  update({
    file: loadedSlicerAudioFile,
    selection: {
      start: 0,
      end: 0,
      offset: 0,
      zoom: 1
    }
  });
};

export const updateSlicerSelectionRecipe = (
  _: null,
  { end, offset, zoom, start }: UpdateSlicerSelectionPayload
) => {
  const { update, selection } = useSlicer.getState();
  const isDirty =
    (end && end !== selection.end) ||
    (offset && offset !== selection.offset) ||
    (start && start !== selection.start) ||
    (zoom && zoom !== selection.zoom);

  if (isDirty) {
    update({
      selection: {
        start: start ?? selection.start,
        end: end ?? selection.end,
        offset: offset ?? selection.offset,
        zoom: zoom ?? selection.zoom
      }
    });
  }
};

// ==============================================================
on(ACTION.addSlicerFiles, addSlicerFilesRecipe);
on(ACTION.slicerFileLoaded, slicerFileLoadedRecipe);
on(ACTION.updateSlicerSelection, updateSlicerSelectionRecipe);
