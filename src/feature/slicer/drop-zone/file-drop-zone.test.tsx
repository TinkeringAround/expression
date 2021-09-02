import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { useSlicer } from '../../../store/slicer';
import { AudioFile } from '../../../store/slicer/types';
import { addSlicerFilesRecipe, removeSlicerFileRecipe } from '../../../store/slicer/reducer';
import { removeAudioFileTypeFromName } from '../../../lib/audio';

import DropZone from './index';

import { getSlicerStoreMock } from '../../../mock/slicer';
import { mockElectronDispatch, mockElectronTrigger } from '../../../mock/electron';
import { getFileMock } from '../../../mock/types';
import { AppMock } from '../../../mock/components';
import { mockReactDropZone } from '../../../mock/hook';

describe('FileDropZone', () => {
  const DropZoneInApp = (
    <AppMock>
      <DropZone />
    </AppMock>
  );

  beforeEach(() => {
    useSlicer.setState(getSlicerStoreMock());
  });

  test('should render loaded audio', async () => {
    const { files } = useSlicer.getState();
    render(DropZoneInApp);

    files.forEach((file: AudioFile) =>
      expect(screen.getByText(removeAudioFileTypeFromName(file.name))).toBeInTheDocument()
    );
  });

  test('should render a trash bin for each file', () => {
    render(DropZoneInApp);

    const trashBins = document.querySelectorAll('.icon-trash');

    expect(trashBins.length).toBe(useSlicer.getState().files.length);
  });

  test('should update store and display new audio file on new audio file drop', async () => {
    mockElectronTrigger(addSlicerFilesRecipe);
    render(DropZoneInApp);

    const fileDropZone = screen.getByRole('dropzone');
    Object.defineProperty(fileDropZone, 'files', {
      value: [getFileMock()]
    });

    fireEvent.drop(fileDropZone);

    await waitFor(() =>
      expect(screen.getByText(removeAudioFileTypeFromName(getFileMock().name))).toBeInTheDocument()
    );
  });

  test('should reject non audio file on file drop to drop zone', async () => {
    render(DropZoneInApp);

    const fileDropZone = screen.getByRole('dropzone');
    Object.defineProperty(fileDropZone, 'files', {
      value: [getFileMock('test3.png', 'image/png')]
    });

    fireEvent.drop(fileDropZone);

    await waitFor(() => expect(screen.queryByText('test2.wav')).not.toBeInTheDocument());
  });

  test('should dispatch loadSlicerFile on click non selected file', () => {
    const loadSlicerFileTriggerMock = jest.fn();
    const loadSlicerFileDispatchMock = jest.fn();
    mockElectronTrigger(loadSlicerFileTriggerMock);
    mockElectronDispatch(loadSlicerFileDispatchMock);
    render(DropZoneInApp);

    fireEvent.click(screen.getByText('react'));

    expect(loadSlicerFileTriggerMock).toHaveBeenCalled();
    expect(loadSlicerFileDispatchMock).toHaveBeenCalled();
  });

  test('should render a trash bin for each file', () => {
    const { files } = useSlicer.getState();
    mockElectronTrigger(removeSlicerFileRecipe);
    render(DropZoneInApp);

    const trashBin = document.querySelector('div > .icon-trash');

    if (trashBin) {
      fireEvent.click(trashBin);

      expect(useSlicer.getState().files.length).toBe(files.length - 1);
    }
  });

  describe('with mocked react-dropzone module', () => {
    beforeEach(() => {
      mockReactDropZone();
    });

    test('should display overlay when dragging file into drop zone', () => {
      render(DropZoneInApp);

      expect(screen.getByRole('overlay')).toBeInTheDocument();
    });
  });
});
