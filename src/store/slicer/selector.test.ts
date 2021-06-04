import { getSlicerStoreMock } from '../../mock/store';

import { selectSlicerFile, selectSlicerSelection } from './selector';

describe('slicer selector', () => {
  describe('selectSlicerFile', () => {
    test('should return selected file from state', () => {
      const state = getSlicerStoreMock();

      const selectedFile = selectSlicerFile(state);

      expect(selectedFile).toEqual(state.file);
    });

    test('should return non null file', () => {
      const state = getSlicerStoreMock();
      state.file = null;

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
});
