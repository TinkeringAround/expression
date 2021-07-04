import { INITIAL_SELECTION, useSlicer } from './index';
import {
  addSlicerFilesRecipe,
  removeSlicerFileRecipe,
  slicerFileLoadedRecipe,
  updateSlicerSelectionRecipe
} from './reducer';

import { getSlicerStoreMock } from '../../mock/store';
import { getAudioFileMock } from '../../mock/types';
import { getChannelDataMock } from '../../mock/audio';

jest.mock('tone');

describe('slicer reducer', () => {
  describe('addSlicerFilesRecipe', () => {
    beforeEach(() => {
      useSlicer.setState(getSlicerStoreMock());
    });

    test('should add new files to stored slicer files', () => {
      const files = [getAudioFileMock({ name: 'newFile' })];
      const fileCount = useSlicer.getState().files.length;

      addSlicerFilesRecipe(null, { files });

      expect(useSlicer.getState().files.length).toEqual(fileCount + files.length);
    });

    test('should not add already loaded files to stored slicer files', () => {
      const { files } = useSlicer.getState();

      addSlicerFilesRecipe(null, { files });

      expect(useSlicer.getState().files.length).toEqual(files.length);
    });
  });

  describe('removeSlicerFileRecipe', () => {
    beforeEach(() => {
      useSlicer.setState(getSlicerStoreMock());
    });

    test('should remove file', () => {
      const { files } = useSlicer.getState();

      removeSlicerFileRecipe(null, { file: files[0] });

      expect(useSlicer.getState().files.includes(files[0])).toBeFalsy();
    });

    test('should reset selection when selected file is', () => {
      useSlicer.setState(
        getSlicerStoreMock({
          selection: {
            start: 1,
            end: 2,
            zoom: 4,
            offset: 1
          }
        })
      );
      const { file } = useSlicer.getState();
      expect(file).not.toBeNull();

      if (file) {
        removeSlicerFileRecipe(null, { file });

        expect(useSlicer.getState().selection).toEqual(INITIAL_SELECTION);
      }
    });
  });

  describe('slicerFileLoadedRecipe', () => {
    beforeEach(() => {
      useSlicer.setState(getSlicerStoreMock());
    });

    test('should update store when file with audio data is non null', () => {
      const audioFileMock = getAudioFileMock({});
      const channelMock = getChannelDataMock(100);

      slicerFileLoadedRecipe(null, {
        file: audioFileMock,
        channelData: [channelMock, channelMock]
      });

      expect(useSlicer.getState().file?.name).toEqual(audioFileMock.name);
    });

    test('should update store on non null audio file with error', () => {
      const audioFileMock = getAudioFileMock({});

      slicerFileLoadedRecipe(null, {
        file: getAudioFileMock({}),
        channelData: [new Float32Array(), new Float32Array()],
        error: 'An Error occurred'
      });

      expect(useSlicer.getState().file?.name).toEqual(audioFileMock.name);
    });
  });

  describe('updateSlicerSelectionRecipe', () => {
    beforeEach(() => {
      useSlicer.setState(getSlicerStoreMock());
    });

    test('should update store selection when selection partials are provided', () => {
      const selection = {
        start: 1,
        end: 10,
        offset: 5,
        zoom: 2
      };

      updateSlicerSelectionRecipe(null, selection);

      const { selection: updatedSelection } = useSlicer.getState();
      expect(updatedSelection).toEqual(selection);
    });

    test('should update store selection end when end differs', () => {
      const { selection: initialSelection } = useSlicer.getState();

      updateSlicerSelectionRecipe(null, { end: 2 });

      const { selection: updatedSelection } = useSlicer.getState();
      expect(initialSelection).not.toEqual(updatedSelection);
    });

    test('should not update store selection end when end does not differ', () => {
      const { selection: initialSelection } = useSlicer.getState();

      updateSlicerSelectionRecipe(null, { end: initialSelection.end });

      const { selection: updatedSelection } = useSlicer.getState();
      expect(initialSelection).toEqual(updatedSelection);
    });

    test('should update store selection start when start differs', () => {
      const { selection: initialSelection } = useSlicer.getState();

      updateSlicerSelectionRecipe(null, { start: 10 });

      const { selection: updatedSelection } = useSlicer.getState();
      expect(initialSelection).not.toEqual(updatedSelection);
    });

    test('should not update store selection start when start does not differ', () => {
      const { selection: initialSelection } = useSlicer.getState();

      updateSlicerSelectionRecipe(null, { start: initialSelection.start });

      const { selection: updatedSelection } = useSlicer.getState();
      expect(initialSelection).toEqual(updatedSelection);
    });

    test('should update store selection zoom when zoom differs', () => {
      const { selection: initialSelection } = useSlicer.getState();

      updateSlicerSelectionRecipe(null, { zoom: 6 });

      const { selection: updatedSelection } = useSlicer.getState();
      expect(initialSelection).not.toEqual(updatedSelection);
    });

    test('should not update store selection zoom when zoom does not differ', () => {
      const { selection: initialSelection } = useSlicer.getState();

      updateSlicerSelectionRecipe(null, { zoom: initialSelection.zoom });

      const { selection: updatedSelection } = useSlicer.getState();
      expect(initialSelection).toEqual(updatedSelection);
    });

    test('should update store selection offset when offset differs', () => {
      const { selection: initialSelection } = useSlicer.getState();

      updateSlicerSelectionRecipe(null, { end: 2 });

      const { selection: updatedSelection } = useSlicer.getState();
      expect(initialSelection).not.toEqual(updatedSelection);
    });

    test('should not update store selection offset when offset does not differ', () => {
      const { selection: initialSelection } = useSlicer.getState();

      updateSlicerSelectionRecipe(null, { offset: initialSelection.offset });

      const { selection: updatedSelection } = useSlicer.getState();
      expect(initialSelection).toEqual(updatedSelection);
    });
  });
});
