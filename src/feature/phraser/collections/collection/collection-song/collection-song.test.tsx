import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Song } from '../../../../../store/phraser/types';
import { selectPhraserSongRecipe } from '../../../../../store/phraser/reducer';
import { usePhraser } from '../../../../../store/phraser';

import CollectionSong from './index';

import { AppMock, DragDropDroppableWrapper } from '../../../../../mock/components';
import { getSongMock } from '../../../../../mock/collection';
import { mockElectronTrigger } from '../../../../../mock/electron';
import { getPhraserMock } from '../../../../../mock/store';

describe('CollectionSong', () => {
  const song = getSongMock({ id: '1', title: 'song', parts: [] });
  const CollectionSongInApp = (song: Song, index: number = 0) => (
    <AppMock>
      <DragDropDroppableWrapper>
        <CollectionSong song={song} index={index} />
      </DragDropDroppableWrapper>
    </AppMock>
  );

  it('should display song title and render in drag drop context', () => {
    render(CollectionSongInApp(song));

    expect(screen.getByText(song.title)).toBeInTheDocument();
  });

  it('should display song title', () => {
    mockElectronTrigger(selectPhraserSongRecipe);
    usePhraser.setState(getPhraserMock());

    render(CollectionSongInApp(song));

    act(() => {
      fireEvent.click(screen.getByText(song.title));
    });

    const { selectedSong } = usePhraser.getState();
    expect(selectedSong).not.toBeNull();
    expect(selectedSong?.id).toBe(song.id);
  });
});
