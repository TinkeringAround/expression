import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import PhraserControls from './index';

import { AppMock } from '../../../mock/components';
import { mockElectronTrigger } from '../../../mock/electron';
import { usePhraser } from '../../../store/phraser';
import { getSongMock } from '../../../mock/phraser';

describe('PhraserControls', () => {
  const PhraserControlsInApp = (
    <AppMock>
      <PhraserControls />
    </AppMock>
  );

  test('should render all phraser controls', () => {
    render(PhraserControlsInApp);

    const karaokeIcon = screen.getByRole('button');
    expect(karaokeIcon).not.toBeNull();
    expect(karaokeIcon).toBeInTheDocument();
  });

  test('should not enter karaoke mode when click on karaoke control and selectedSong is null', () => {
    const setKaraokeModeMock = jest.fn();
    mockElectronTrigger(setKaraokeModeMock);

    render(PhraserControlsInApp);

    fireEvent.click(screen.getByRole('button'));

    expect(setKaraokeModeMock).not.toHaveBeenCalledWith(null, { mode: true });
  });

  test('should enter karaoke mode when click on karaoke control and selectedSong is not null', () => {
    const setKaraokeModeMock = jest.fn();
    mockElectronTrigger(setKaraokeModeMock);
    usePhraser.setState({ selectedSong: getSongMock() });

    render(PhraserControlsInApp);

    fireEvent.click(screen.getByRole('button'));

    expect(setKaraokeModeMock).toHaveBeenCalledWith(null, { mode: true });
  });
});
