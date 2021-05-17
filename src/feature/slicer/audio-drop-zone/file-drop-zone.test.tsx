import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import * as hooks from 'react-dropzone';

import AudioDropZone from './index';
import { useStore } from '../../../store';
import { getMockStore } from '../../../mock/store';
import { bytesToMegaBytes } from '../../../util';
import { addSlicerFilesRecipe } from '../../../store/reducer';
import { mockElectronDispatch, mockElectronTrigger } from '../../../mock/electron';
import { getFileMock } from '../../../mock/file';

describe('FileDropZone', () => {
  beforeEach(() => {
    useStore.setState(getMockStore());
  });

  test('should render loaded audio', () => {
    const { files } = useStore.getState().slicer;
    const { getByText } = render(<AudioDropZone />);

    expect(getByText(files[0].name)).toBeTruthy();
    expect(getByText(bytesToMegaBytes(files[0].size))).toBeTruthy();
  });

  test('should update store and display new audio file on new audio file drop', async () => {
    mockElectronTrigger(addSlicerFilesRecipe);
    const { getByText, getByRole } = render(<AudioDropZone />);

    const fileDropZone = getByRole('dropzone');
    Object.defineProperty(fileDropZone, 'files', {
      value: [getFileMock()]
    });

    fireEvent.drop(fileDropZone);

    await waitFor(() => expect(getByText('test2.wav')).toBeInTheDocument());
  });

  test('should reject non audio file on file drop to drop zone', async () => {
    const { getByRole, queryByText } = render(<AudioDropZone />);

    const fileDropZone = getByRole('dropzone');
    Object.defineProperty(fileDropZone, 'files', {
      value: [getFileMock('test3.png', 'image/png')]
    });

    fireEvent.drop(fileDropZone);

    await waitFor(() => expect(queryByText('test2.wav')).not.toBeInTheDocument());
  });

  test('should dispatch loadSlicerFile on click non selected file', () => {
    const loadSlicerFileMock = jest.fn();
    mockElectronDispatch(loadSlicerFileMock);
    const { getByText } = render(<AudioDropZone />);

    fireEvent.click(getByText('react.wav'));

    expect(loadSlicerFileMock).toHaveBeenCalled();
  });

  describe('with mocked react-dropzone module', () => {
    afterEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    test('should display overlay when dragging file into drop zone', () => {
      jest.createMockFromModule('react-dropzone');
      // @ts-ignore
      jest.spyOn(hooks, 'useDropzone').mockImplementationOnce(() => ({
        getRootProps: jest.fn(),
        getInputProps: jest.fn(),
        isDragActive: true,
        open: jest.fn()
      }));

      const { getByRole } = render(<AudioDropZone />);

      expect(getByRole('overlay')).toBeInTheDocument();
    });
  });
});
