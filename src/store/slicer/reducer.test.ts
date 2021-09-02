import { INITIAL_SELECTION, useSlicer } from './index';
import {
  addSlicerFilesRecipe,
  exportSlicerFileRecipe,
  loadSlicerFileRecipe,
  removeSlicerFileRecipe,
  slicerFileExportCancelledRecipe,
  slicerFileExportedRecipe,
  slicerFileLoadedRecipe,
  updateSlicerIsPlayingRecipe,
  updateSlicerProgressionRecipe,
  updateSlicerSelectionRecipe
} from './reducer';
import { Notification } from '../notification/types';

import { getSlicerStoreMock } from '../../mock/slicer';
import { getAudioFileMock } from '../../mock/types';
import { getChannelDataMock } from '../../mock/audio';
import { mockElectronTrigger } from '../../mock/electron';

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

  describe('loadSlicerFileRecipe', () => {
    beforeEach(() => {
      useSlicer.setState(getSlicerStoreMock());
    });

    test('should set progress to 1 when not being 1 before', () => {
      loadSlicerFileRecipe(null);

      expect(useSlicer.getState().progress).toBe(1);
    });

    test('should not update progress when being 1', () => {
      useSlicer.setState(getSlicerStoreMock({ progress: 1 }));

      loadSlicerFileRecipe(null);

      expect(useSlicer.getState().progress).toBe(1);
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

    test('should reset progress to 0 on non null audio file regardless of error', () => {
      useSlicer.setState({ progress: 100 });

      slicerFileLoadedRecipe(null, {
        file: getAudioFileMock({}),
        channelData: [new Float32Array(), new Float32Array()],
        error: 'An Error occurred'
      });

      expect(useSlicer.getState().progress).toEqual(0);
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

  describe('updateSlicerProgressionRecipe', () => {
    beforeEach(() => {
      useSlicer.setState(getSlicerStoreMock());
    });

    test('should update progression if differs', () => {
      const progress = 100;

      updateSlicerProgressionRecipe(null, { progress });

      expect(useSlicer.getState().progress).toEqual(progress);
    });

    test('should not update progression if same value', () => {
      const progress = 50;
      expect(useSlicer.setState({ progress }));

      updateSlicerProgressionRecipe(null, { progress });

      expect(useSlicer.getState().progress).toEqual(progress);
    });
  });

  describe('exportSlicerFileRecipe', () => {
    beforeEach(() => {
      useSlicer.setState(getSlicerStoreMock());
    });

    test('should set isExporting to true when not being true before', () => {
      exportSlicerFileRecipe(null);

      expect(useSlicer.getState().isExporting).toBeTruthy();
    });

    test('should not update progress when being true', () => {
      useSlicer.setState(getSlicerStoreMock({ isExporting: true }));

      exportSlicerFileRecipe(null);

      expect(useSlicer.getState().isExporting).toBeTruthy();
    });
  });

  describe('slicerFileExportedRecipe', () => {
    beforeEach(() => {
      useSlicer.setState(getSlicerStoreMock({ isExporting: true }));
    });

    test('should set isExporting to false when being true and send notification', () => {
      const addNotificationSpy = jest.fn();
      const notification: Notification = { type: 'info', content: '' };
      mockElectronTrigger(addNotificationSpy);

      slicerFileExportedRecipe(null, { notification });

      expect(addNotificationSpy).toHaveBeenCalledWith(null, { notification });
      expect(useSlicer.getState().isExporting).toBeFalsy();
    });

    test('should ignore isExporting update when isExporting is false', () => {
      const addNotificationSpy = jest.fn();
      const notification: Notification = { type: 'info', content: '' };

      mockElectronTrigger(addNotificationSpy);
      useSlicer.setState(getSlicerStoreMock({ isExporting: false }));

      slicerFileExportedRecipe(null, { notification });

      expect(addNotificationSpy).not.toHaveBeenCalledWith(null, { notification });
    });
  });

  describe('updateSlicerIsPlayingRecipe', () => {
    test('should update isPlaying when update is not equal to current Value', () => {
      updateSlicerIsPlayingRecipe(null, { isPlaying: true });

      expect(useSlicer.getState().isPlaying).toBeTruthy();
    });

    test('should update isPlaying when update is not equal to current Value', () => {
      const updateMock = jest.fn();
      useSlicer.setState(getSlicerStoreMock({ update: updateMock, isPlaying: true }));

      updateSlicerIsPlayingRecipe(null, { isPlaying: true });

      expect(useSlicer.getState().isPlaying).toBeTruthy();
    });
  });

  describe('slicerFileExportCancelledRecipe', () => {
    beforeEach(() => {
      useSlicer.setState(getSlicerStoreMock());
    });

    test('should reset isExporting and add notification when export is cancelled', async () => {
      const addNotificationMock = jest.fn(),
        updateMock = jest.fn();
      mockElectronTrigger(addNotificationMock);

      const notification: Notification = { type: 'info', content: 'reset' };
      useSlicer.setState(getSlicerStoreMock({ update: updateMock, isExporting: true }));

      slicerFileExportCancelledRecipe(null, { notification });

      expect(updateMock).toHaveBeenCalledWith({ isExporting: false });
      expect(addNotificationMock).toHaveBeenCalledWith(null, { notification });
    });

    test('should not reset isExporting when not exporting to begin with', () => {
      const addNotificationMock = jest.fn(),
        updateMock = jest.fn();
      mockElectronTrigger(addNotificationMock);

      const notification: Notification = { type: 'info', content: 'no reset' };
      useSlicer.setState(getSlicerStoreMock({ update: updateMock, isExporting: false }));

      slicerFileExportCancelledRecipe(null, { notification });

      expect(updateMock).not.toHaveBeenCalled();
      expect(addNotificationMock).not.toHaveBeenCalled();
    });
  });
});
