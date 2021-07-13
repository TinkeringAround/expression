import { getSlicerStoreMock } from '../../mock/store';

import { selectSlicerFile, selectSlicerIsProcessing, selectSlicerSelection } from './selector';

describe('slicer selector', () => {
  describe('selectSlicerFile', () => {
    test('should return selected file from state', () => {
      const state = getSlicerStoreMock();

      const selectedFile = selectSlicerFile(state);

      expect(selectedFile).toEqual(state.file);
    });

    test('should return non null file', () => {
      const state = { ...getSlicerStoreMock(), file: null };

      const selectedFile = selectSlicerFile(state);

      expect(selectedFile).not.toBeNull();
      expect(selectedFile.buffer.duration).toBe(0);
    });
  });

  describe('selectSlicerSelection', () => {
    test('should extract selection from store', () => {
      const state = getSlicerStoreMock();

      const selection = selectSlicerSelection(state);

      expect(selection).toEqual(state.selection);
    });
  });

  describe('selectSlicerIsProcessing', () => {
    test('should return true when progress between 0 and 100', () => {
      const state = { ...getSlicerStoreMock(), progress: 50 };

      const selection = selectSlicerIsProcessing(state);

      expect(selection).toBeTruthy();
    });

    test('should return false when progress is lower than 0', () => {
      const state = { ...getSlicerStoreMock(), progress: -10 };

      const selection = selectSlicerIsProcessing(state);

      expect(selection).toBeFalsy();
    });

    test('should return false when progress is equal to 100', () => {
      const state = { ...getSlicerStoreMock(), progress: 100 };

      const selection = selectSlicerIsProcessing(state);

      expect(selection).toBeFalsy();
    });
  });
});
