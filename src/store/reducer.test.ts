import { useStore } from './index';
import { addSlicerFilesRecipe, slicerFileLoadedRecipe } from './reducer';

import { getMockStore } from '../mock/store';
import { getAudioFileMock } from '../mock/types';
import { getChannelDataMock } from '../mock/audio';

jest.mock('tone');

describe('reducer', () => {
  describe('addSlicerFilesRecipe', () => {
    beforeEach(() => {
      useStore.setState(getMockStore());
    });

    test('should add new files to stored slicer files', () => {
      const files = [getAudioFileMock({ name: 'newFile' })];
      const fileCount = useStore.getState().slicer.files.length;

      addSlicerFilesRecipe(null, { files });

      expect(useStore.getState().slicer.files.length).toEqual(fileCount + files.length);
    });

    test('should not add already loaded files to stored slicer files', () => {
      const files = useStore.getState().slicer.files;
      const fileCount = useStore.getState().slicer.files.length;

      addSlicerFilesRecipe(null, { files });

      expect(useStore.getState().slicer.files.length).toEqual(fileCount);
    });
  });

  describe('slicerFileLoadedRecipe', () => {
    beforeEach(() => {
      useStore.setState(getMockStore());
    });

    test('should update store on non null audio file with audio data', () => {
      const audioFileMock = getAudioFileMock({});
      const channelMock = getChannelDataMock(100);
      slicerFileLoadedRecipe(null, {
        file: audioFileMock,
        channelData: [channelMock, channelMock]
      });

      expect(useStore.getState().slicer.file?.name).toEqual(audioFileMock.name);
    });

    test('should update store on non null audio file with error', () => {
      const audioFileMock = getAudioFileMock({});
      slicerFileLoadedRecipe(null, {
        file: getAudioFileMock({}),
        channelData: [new Float32Array(), new Float32Array()],
        error: 'An Error occurred'
      });

      expect(useStore.getState().slicer.file?.name).toEqual(audioFileMock.name);
    });
  });
});
