import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { usePhraser } from '../../../store/phraser';

import Parts from './index';

import { AppMock } from '../../../mock/components';
import { getPhraserMock } from '../../../mock/store';
import { getSongMock } from '../../../mock/collection';
import { mockElectronTrigger } from '../../../mock/electron';
import {
  addPhraserSongPartRecipe,
  updatePhraserSongTitleRecipe
} from '../../../store/phraser/reducer';

describe('Parts', () => {
  const PartsInApp = (
    <AppMock>
      <DragDropContext onDragEnd={() => {}}>
        <Parts />
      </DragDropContext>
    </AppMock>
  );

  beforeEach(() => {
    usePhraser.setState(getPhraserMock());
  });

  it('should render only footer when selected song is null', () => {
    render(PartsInApp);

    expect(screen.getByText('Add Part')).toBeInTheDocument();
  });

  it('should render song title and add part footer', () => {
    const song = getSongMock();
    usePhraser.setState(getPhraserMock({ selectedSong: { ...song, changes: [] } }));

    render(PartsInApp);

    expect(screen.getByTitle(song.title)).toBeInTheDocument();
    expect(screen.getByText('Add Part')).toBeInTheDocument();

    song.parts.forEach(part => {
      expect(screen.getByTitle(part.name)).toBeInTheDocument();
    });
  });

  it('should add song part when clicked on add part button', () => {
    const song = getSongMock({ parts: [] });

    mockElectronTrigger(addPhraserSongPartRecipe);
    usePhraser.setState(getPhraserMock({ selectedSong: { ...song, changes: [] } }));

    render(PartsInApp);

    act(() => {
      fireEvent.click(screen.getByText('Add Part'));
    });

    expect(screen.getByTitle('UNTITLED')).toBeInTheDocument();
  });

  it('should change song title when song title is changed', async () => {
    const newTitle = 'new-title';
    const song = getSongMock({ title: 'title' });

    mockElectronTrigger(updatePhraserSongTitleRecipe);
    usePhraser.setState(getPhraserMock({ selectedSong: { ...song, changes: [] } }));

    render(PartsInApp);

    act(() => {
      fireEvent.change(screen.getByTitle(song.title), { target: { value: newTitle } });
    });

    await waitFor(() => {
      expect(screen.getByTitle(newTitle)).toBeInTheDocument();
    });

    act(() => {
      fireEvent.blur(screen.getByTitle(newTitle));
    });
  });

  it('should not change song title when song title is unchanged changed', async () => {
    const title = 'title';
    const updatePhraseSongTitleMock = jest.fn();
    const song = getSongMock({ title });

    mockElectronTrigger(updatePhraserSongTitleRecipe);
    usePhraser.setState(
      getPhraserMock({ selectedSong: { ...song, changes: [] }, update: updatePhraseSongTitleMock })
    );

    render(PartsInApp);

    act(() => {
      fireEvent.blur(screen.getByTitle(title));
    });

    expect(updatePhraseSongTitleMock).not.toHaveBeenCalled();
  });
});
