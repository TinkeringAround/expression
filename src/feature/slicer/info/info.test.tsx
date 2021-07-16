import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { useSlicer } from '../../../store/slicer';
import { removeAudioFileTypeFromName } from '../../../lib/audio';
import { toMB } from '../../../lib/util';
import { useNotification } from '../../../store/notification';
import { addNotificationRecipe } from '../../../store/notification/reducer';

import Info from './index';

import { mockClipBoard } from '../../../mock/window';
import { mockElectronTrigger } from '../../../mock/electron';

describe('Info', () => {
  beforeEach(() => {
    mockElectronTrigger(addNotificationRecipe);
  });

  test('should display audio file info when audio file is not null', () => {
    const { file } = useSlicer.getState();
    render(<Info />);

    if (file) {
      const fileNameWithoutType = removeAudioFileTypeFromName(file.name);
      const convertedSize = toMB(file.size);
      // name is twice in dom -> in drop zone and info
      expect(screen.getAllByText(fileNameWithoutType).length).toBe(2);
      expect(screen.getByText(convertedSize)).toBeInTheDocument();
    }
  });

  test('should copy path to clipboard successfully when clipboard is available', async () => {
    mockClipBoard();
    render(<Info />);

    const heading = screen.getByRole('heading');
    expect(heading.parentNode).toBeInTheDocument();

    if (heading.parentNode) {
      fireEvent.click(heading.parentNode);

      await waitFor(() => {
        const { notifications } = useNotification.getState();
        return expect(notifications.length).toEqual(1);
      });
    }

    expect(useNotification.getState().notifications.pop()?.type).toEqual('info');
  });

  test('should not copy path to clipboard when clipboard is not available', async () => {
    mockClipBoard(false);

    render(<Info />);

    const heading = screen.getByRole('heading');
    expect(heading.parentNode).toBeInTheDocument();

    if (heading.parentNode) {
      fireEvent.click(heading.parentNode);

      await waitFor(() => {
        const { notifications } = useNotification.getState();
        return expect(notifications.length).toEqual(1);
      });

      expect(useNotification.getState().notifications.pop()?.type).toEqual('error');
    }
  });
});
