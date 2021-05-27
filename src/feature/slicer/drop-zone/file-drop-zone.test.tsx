import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { useStore } from '../../../store';
import { addSlicerFilesRecipe } from '../../../store/reducer';
import { removeAudioFileTypeFromName } from '../../../audio';

import DropZone from './index';

import { getMockStore } from '../../../mock/store';
import { mockElectronDispatch, mockElectronTrigger } from '../../../mock/electron';
import { getFileMock } from '../../../mock/types';
import { AppMock } from '../../../mock/components';
import { mockReactDropZone } from '../../../mock/modules';

describe('FileDropZone', () => {
  const DropZoneInApp = (
    <AppMock>
      <DropZone />
    </AppMock>
  );

  beforeEach(() => {
    useStore.setState(getMockStore());
  });

  test('should render loaded audio', async () => {
    const { files } = useStore.getState().slicer;
    render(DropZoneInApp);

    files.forEach(file =>
      expect(screen.getByText(removeAudioFileTypeFromName(file.name))).toBeInTheDocument()
    );
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
    const loadSlicerFileMock = jest.fn();
    mockElectronDispatch(loadSlicerFileMock);
    render(DropZoneInApp);

    fireEvent.click(screen.getByText('react'));

    expect(loadSlicerFileMock).toHaveBeenCalled();
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
