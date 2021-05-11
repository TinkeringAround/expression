import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import FileDropZone from './index';
import { useStore } from '../../store';
import { getMockStore } from '../../mock/store';
import { bytesToMegaBytes } from '../../util';
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
    mockElectronTrigger(addSlicerFilesRecipe);
    const { getByText, getByRole } = render(<FileDropZone />);

    const fileDropZone = getByRole('dropzone');
    Object.defineProperty(fileDropZone, 'files', {
      value: [
        new File(['TestTestTest'], 'test2.wav', {
          type: 'audio/wav'
        })
      ]
    });

    fireEvent.drop(fileDropZone);

    await waitFor(() => expect(getByText('test2.wav')).toBeInTheDocument());
  });

  test('should update selected audio file on click on audio file in file drop zone', async () => {
    mockElectronTrigger(selectSlicerFileRecipe);
    const audioFile = useStore.getState().slicer.files[0];
    const { getByText } = render(<FileDropZone />);

    const audioFileNode = getByText(audioFile.name);

    fireEvent.click(audioFileNode);

    await waitFor(() =>
      expect(audioFileNode.parentElement?.classList.contains('selected')).toBeTruthy()
    );
  });
});
