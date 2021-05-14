import { useStore } from './index';
import { getMockStore } from '../mock/store';
import { addSlicerFilesRecipe, slicerFileLoadedRecipe } from './reducer';
import { getAudioFileMock } from '../mock/file';

describe('reducer', () => {
  describe('addSlicerFilesRecipe', () => {
    beforeEach(() => {
      useStore.setState(getMockStore());
    });

    test('should add new files to stored slicer files', () => {
      const files = [getAudioFileMock()];
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
      const audioFileMock = getAudioFileMock();
      slicerFileLoadedRecipe(null, {
        file: audioFileMock,
        channelData: []
      });

      expect(useStore.getState().slicer.selectedFile?.name).toEqual(audioFileMock.name);
    });

    test('should update store on non null audio file with error', () => {
      const audioFileMock = getAudioFileMock();
      slicerFileLoadedRecipe(null, {
        file: getAudioFileMock(),
        error: 'An Error occurred'
      });

      expect(useStore.getState().slicer.selectedFile?.name).toEqual(audioFileMock.name);
    });
  });
});
