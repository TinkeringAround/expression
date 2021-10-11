import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { usePhraser } from '../../../store/phraser';

import Karaoke from './index';

import { AppMock } from '../../../mock/components';
import { getSongMock } from '../../../mock/phraser';
import { mockElectronTrigger } from '../../../mock/electron';

describe('Karaoke', () => {
  const KaraokeInApp = (
    <AppMock>
      <Karaoke />
    </AppMock>
  );

  test('should render cross only when selected song is null', () => {
    usePhraser.setState({ selectedSong: null });
    render(KaraokeInApp);

    const crossIcon = document.querySelector('.icon-cross');
    expect(crossIcon).toBeInTheDocument();

    const spans = document.querySelectorAll('span');
    expect(spans.length).toBe(1);
  });

  test('should render overlay with lines when selected song is not null', () => {
    const song = getSongMock();
    const lines = song.parts.reduce(
      (prev, { rhymes }) =>
        prev + rhymes.map(({ lines }) => lines.length).reduce((pv, cv) => pv + cv, 0),
      0
    );
    usePhraser.setState({ selectedSong: getSongMock() });
    render(KaraokeInApp);

    const spans = document.querySelectorAll('span');
    expect(spans.length).toBe(lines + 1);
  });

  test('should exit karaoke mode when click on cross icon', () => {
    const setKaraokeModeMock = jest.fn();
    mockElectronTrigger(setKaraokeModeMock);
    usePhraser.setState({ selectedSong: getSongMock() });
    render(KaraokeInApp);

    const crossIcon = document.querySelector('.icon-cross');
    if (crossIcon) {
      fireEvent.click(crossIcon);
    }

    expect(setKaraokeModeMock).toHaveBeenCalledWith(null, { mode: false });
  });
});
