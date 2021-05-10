import React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import FileDropZone, { FileDropZoneTestId } from './index';
import { useStore } from '../../store';
import { getMockStore } from '../../mock/store';
import { bytesToMegaBytes } from '../../util';
import { ACTION } from '../../store/action-types';
import { addSlicerFilesRecipe, selectSlicerFileRecipe } from '../../store/reducer';
import { mockElectronTrigger } from '../../mock/electron';

describe('FileDropZone', () => {
  beforeAll(() => {
    useStore.setState(getMockStore());
  });

  test('should render loaded audio', () => {
    const { files } = useStore.getState().slicer;
    const { getByText } = render(<FileDropZone />);

    expect(getByText(files[0].name)).toBeTruthy();
    expect(getByText(bytesToMegaBytes(files[0].size))).toBeTruthy();
  });

  test('should update store and display new audio file on new audio file drop on file drop zone', async () => {
    const triggerSpy = mockElectronTrigger(addSlicerFilesRecipe);
    const file = new File(['TestTestTest'], 'test2.wav', {
      type: 'audio/wav'
    });

    const { getByTestId, getByText } = render(<FileDropZone />);
    const fileDropZone = getByTestId(FileDropZoneTestId);
    Object.defineProperty(fileDropZone, 'files', {
      value: [file]
    });

    act(() => {
      fireEvent.drop(fileDropZone);
    });

    await waitFor(() =>
      expect(triggerSpy).toHaveBeenCalledWith(ACTION.addSlicerFiles, {
        files: [
          {
            name: 'test2.wav',
            type: 'audio/wav',
            path: 'test2.wav',
            size: 12
          }
        ]
      })
    );
    await waitFor(() => expect(getByText('test2.wav')).toBeInTheDocument());

    await act(() => Promise.resolve());
  });

  test('should update selected audio file on click on audio file in file drop zone', async () => {
    const triggerSpy = mockElectronTrigger(selectSlicerFileRecipe);
    const audioFile = useStore.getState().slicer.files[0];

    const { getByTestId } = render(<FileDropZone />);
    const audioFileNode = getByTestId(audioFile.name);

    act(() => {
      fireEvent.click(audioFileNode);
    });

    await waitFor(() =>
      expect(triggerSpy).toHaveBeenCalledWith(ACTION.selectSlicerFile, {
        file: audioFile
      })
    );

    expect(audioFileNode.classList.contains('selected')).toBeTruthy();

    await act(() => Promise.resolve());
  });

  test('should adjust width on width resize of file drop zone', () => {
    render(<FileDropZone />);

    // TODO
  });
});
